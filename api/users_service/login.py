import json
import logging
import os
import time
import uuid
import boto3
import jwt
import jsonify
import datetime

from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')

def encodeAuthToken(user_id):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=2),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id
    }
    token = jwt.encode(payload, 'super-secret-key', algorithm='HS256')
    return token

def login(event, context):
    data = json.loads(event['body'])
    if 'email' not in data or 'password' not in data:
        raise Exception("Login failed!")
    
    table = dynamodb.Table(os.environ['USER_TABLE'])

    response = table.get_item(Key={'email': data['email']})

    if 'Item' not in response:
        result = data
        result['status'] = "False"
        result['message'] =  "User doesn't exist. Register to continue."
    
    else:
        result = response['Item']
        
        if result['password'] == data['password']:
            token = encodeAuthToken(result['id'])
            result['auth_token'] = token.decode('utf-8')
            result['status'] = "True"
            result['message'] = "Logged In Successfully."
        else:
            result['status'] = "False"
            result['message'] = "Username and Password doesn't match"

    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(result)
    }

    return response
