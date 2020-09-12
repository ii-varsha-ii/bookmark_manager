import json
import logging
import os
import time
import uuid
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')

def login(event, context):
    data = json.loads(event['body'])
    if 'email' not in data or 'password' not in data:
        raise Exception("Registeration failed!")
    
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    response = table.query(
        IndexName="email-index",
        KeyConditionExpression = Key('email').eq(data['email'])
    )

    if len(response['Items']) == 0:
        result = data
        result['status'] = "False"
        result['message'] =  "User doesn't exist. Register to continue."
    
    else:
        result = response['Items'][0]
        
        if result['password'] == data['password']:
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
