import json
import logging
import os
import time
import uuid

import boto3
dynamodb = boto3.resource('dynamodb')

def register(event, context):
    data = json.loads(event['body'])
    if 'firstname' not in data or 'lastname' not in data or 'email' not in data or 'password' not in data:
        raise Exception("Registeration failed!")
    
    timestamp = str(time.time())

    table = dynamodb.Table(os.environ['USER_TABLE'])

    item = {
        'id': str(uuid.uuid1()),
        'firstname': data['firstname'],
        'lastname': data['lastname'],
        'email': data['email'],
        'password': data['password'],
        'createdAt': timestamp,
        'updatedAt': timestamp,
    }

    table.put_item(Item=item)

    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(item)
    }
    return response
