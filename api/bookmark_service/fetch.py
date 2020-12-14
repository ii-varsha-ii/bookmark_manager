import json

from bookmark_handler import BookmarkHandler

def fetch(event, context):

    bookmark_handler = BookmarkHandler()
    token = bookmark_handler.get_token(event)

    result = {}
    if token:
        decoded, status = bookmark_handler.decode_token(token)
        if not status:
            result['message'] = decoded
        else:
            userid = decoded
            result['bookmarks'] = bookmark_handler.get_bookmarks(userid)
            if result['bookmarks'] == None:
                result['message'] = 'Server error'
            else:
                result['message'] = 'Success'
    else:
        result['message'] = 'Authorization string empty'
    
    return {
        'statusCode': 200,
        'headers': bookmark_handler.headers,
        'body': json.dumps(result)
    }
    