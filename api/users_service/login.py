import json

from user_handler import UserHandler


def login(event, context):
    body = json.loads(event['body'])
    user_handler = UserHandler(body)

    result = {}
    if user_handler.login_body_checker():
        result = user_handler.verify_user()
        return {
            'statusCode': 200,
            'headers': user_handler.headers,
            'body': json.dumps(result)
        }

    result['status'] = False
    result['message'] = "Credentials check failed"

    return {
        'statusCode': 200,
        'headers': user_handler.headers,
        'body': json.dumps(result)
    }
