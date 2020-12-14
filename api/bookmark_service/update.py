import json

from bookmark_handler import BookmarkHandler

def update(event, context):

    body = json.loads(event['body'])
    bookmark_handler = BookmarkHandler(body)

    result = {}
    if bookmark_handler.update_body_checker():
        token = bookmark_handler.get_token(event)
        if token:
            decoded, status = bookmark_handler.decode_token(token)
            if not status:
                result['message'] = decoded
            else:
                userid = decoded
                old_bookmarks = bookmark_handler.get_bookmarks(userid)
        
                new_bookmarks = bookmark_handler.update_entry(old_bookmarks)
                
                result['bookmarks'] = bookmark_handler.update_bookmarks(userid, new_bookmarks)
                result['message'] = 'Success'
        else:
            result['message'] = 'Authorization string empty'
    else:
        result['message'] = 'Server error'

    return {
        'statusCode': 200,
        'headers': bookmark_handler.headers,
        'body': json.dumps(result)
    }