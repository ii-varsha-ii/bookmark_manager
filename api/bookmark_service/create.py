import json
import os
import uuid
import boto3
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

def recursive_insert(bookmarks, parent, item):
    for i, key in enumerate(bookmarks):
        if 'children' in key and key['id'] == parent:
            key['children'].append(item)
        elif 'children' in key:
            key['children'] = recursive_insert(key['children'], parent, item)
        else:
            print(key)
    return bookmarks

def create(event, context):
    auth_header = event['headers']['Authorization']
    data = json.loads(event['body'])
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
            if data['child'] is None:
                item = {
                    'id':  str(uuid.uuid1()),
                    'name': data['name'],
                    'url': data['url']
                }
            else:
                item = {
                    'id': str(uuid.uuid1()),
                    'name': data['child'],
                    'children': [
                        {
                            'id':  str(uuid.uuid1()),
                            'name': data['name'],
                            'url': data['url']
                        }
                    ]
                }
            bookmarks = response['Item']['bookmarks']
            if data['parent'] == 'root':
                bookmarks['children'].append(item)
            else:
                bookmarks['children'] = recursive_insert(bookmarks['children'], data['parent'], item)

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
