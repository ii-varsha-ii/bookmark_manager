import json
import boto3
import uuid
import os
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')

def recursive_delete(bookmarks, itemId):
    for i, key in enumerate(bookmarks):
        if key['id'] == itemId:
            bookmarks.remove(key)
        elif 'children' in key:
            key['children'] = recursive_delete(key['children'],itemId)
    return bookmarks
    
def delete(event, context):
    data = event['pathParameters']
    table = dynamodb.Table(os.environ['BOOKMARKS_TABLE'])

    result = table.get_item(Key={'userid': data['userid']})
    print(result)
    
    itemId = data['nodeid']
    
    bookmarks = result['Item']['bookmarks']
    print(bookmarks)
    
    bookmarks['children'] = recursive_delete(bookmarks['children'], itemId)
    
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
