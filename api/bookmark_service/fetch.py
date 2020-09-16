import json
import os
import uuid
import boto3
import jwt
import jsonify

dynamodb = boto3.resource('dynamodb')

def decodeAuthToken(token):
    try:
        payload = jwt.decode(token, 'super-secret-key', algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Login please'
    except jwt.InvalidTokenError:
        return 'Nice try, invalid token. Login please'

def fetch(event, context):

    auth_header = event['headers']['Authorization'] 
    if auth_header:
        token = auth_header.split(" ")[1]
    else:
        token = ''

    result = {}
    if token:
        decoded = decodeAuthToken(token)
        if isinstance(decoded, str):
            result['message'] = decoded
        else:
            userid = decoded['sub']
            table = dynamodb.Table(os.environ['BOOKMARKS_TABLE'])
            response = table.get_item(Key={'userid': userid})
            if 'Item' not in response:
                initial = {
                    'userid': userid,
                    'bookmarks': {
                        'id' : 'root',
                        'name': 'Bookmarks',
                        'children': []
                    }
                }
                table.put_item(Item = initial)
                result['bookmarks'] = initial['bookmarks']
            else:
                result['bookmarks'] = response['Item']['bookmarks']
            result['message'] = 'Success'
    else:
        result['message'] = 'Authorization string empty'
    
    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(result)
    }
    return response