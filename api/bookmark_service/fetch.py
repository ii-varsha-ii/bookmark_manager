import json
import os
import uuid
import boto3
    
dynamodb = boto3.resource('dynamodb')

def fetch(event, context):
    userid = event['pathParameters']['userid']
    table = dynamodb.Table(os.environ['BOOKMARKS_TABLE'])
    
    item = table.get_item(Key={'userid': userid})
    result = item['Item']['bookmarks']
    
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