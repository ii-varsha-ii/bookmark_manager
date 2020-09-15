import json
import os
import uuid
import boto3
from boto3.dynamodb.conditions import Key
    
dynamodb = boto3.resource('dynamodb')

def recursive_insert(bookmarks, parent, item):
    for i, key in enumerate(bookmarks):
        if 'children' in key and key['id'] == parent:     #change to id 
            key['children'].append(item)
        elif 'children' in key:
            key['children'] = recursive_insert(key['children'], parent, item)
        else:
            print(key)
    return bookmarks

def create(event, context):
    data = json.loads(event['body'])
    table = dynamodb.Table(os.environ['BOOKMARKS_TABLE'])

    response = table.get_item(Key={'userid': data['userid']})
    print(response)
    
    #construct object based on folder creation OR bookmark creat
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
    print("Item : " ,item)
    bookmarks = response['Item']['bookmarks']
    print(bookmarks)
    if data['parent'] == 'root':
        bookmarks['children'].append(item)
    else:
        bookmarks['children'] = recursive_insert(bookmarks['children'], data['parent'], item)
    
    print(bookmarks)
    response = table.update_item(
        Key={
            'userid': data['userid']
        },
        UpdateExpression="set bookmarks = :b",
        ExpressionAttributeValues={
            ':b': bookmarks
        },
        ReturnValues="UPDATED_NEW"
    )
    updated_item = response['Attributes']['bookmarks']
    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(updated_item)
    }
    return response
