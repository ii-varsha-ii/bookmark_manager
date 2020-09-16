import json
import boto3
import uuid
import os
import jwt
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')

def decodeAuthToken(token):
    try:
        payload = jwt.decode(token, 'super-secret-key', algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Login please'
    except jwt.InvalidTokenError:
        return 'Nice try, invalid token. Login please'

def recursive_delete(bookmarks, itemId):
    for i, key in enumerate(bookmarks):
        if key['id'] == itemId:
            bookmarks.remove(key)
        elif 'children' in key:
            key['children'] = recursive_delete(key['children'],itemId)
    return bookmarks
    
def delete(event, context):
    auth_header = event['headers']['Authorization']
    data = event['pathParameters']
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

            itemId = data['nodeid']
            
            bookmarks = response['Item']['bookmarks']
            bookmarks['children'] = recursive_delete(bookmarks['children'], itemId)
            
            response = table.update_item(
                Key={
                    'userid': userid
                },
                UpdateExpression="set bookmarks = :b",
                ExpressionAttributeValues={
                    ':b': bookmarks
                },
                ReturnValues="UPDATED_NEW"
            )
            result['bookmarks'] = response['Attributes']['bookmarks']
            result['message'] = 'Success'
    else:
        result['message'] = 'Authorization string empty'


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
