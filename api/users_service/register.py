import json

from user_handler import UserHandler

def register(event, context):
    body = json.loads(event['body'])
    user_handler = UserHandler(body)

    response = {}
    if user_handler.register_body_checker():
        if user_handler.create_user():
            response['status'] = True
            response['message'] = "Success"

            return {
                'statusCode': 200,
                'headers': user_handler.headers,
                'body': json.dumps(response)
            }

    response['status'] = False
    response['message'] = "Failed"
    
    return {
        'statusCode': 200,
        'headers': user_handler.headers,
        'body': json.dumps(response)
    }
