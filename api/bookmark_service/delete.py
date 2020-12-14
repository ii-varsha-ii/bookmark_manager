import json

from bookmark_handler import BookmarkHandler

def delete(event, context):

    body = event['pathParameters']
    bookmark_handler = BookmarkHandler(body)
    token = bookmark_handler.get_token(event)
    result = {}
    if token:
        decoded, status = bookmark_handler.decode_token(token)
        if not status:
            result['message'] = decoded
        else:
            userid = decoded
            old_bookmarks = bookmark_handler.get_bookmarks(userid)
            new_bookmarks = bookmark_handler.delete_entry(old_bookmarks)
            
            result['bookmarks'] = bookmark_handler.update_bookmarks(userid, new_bookmarks)
            result['message'] = 'Success'
    else:
        result['message'] = 'Authorization string empty'

    return {
        'statusCode': 200,
        'headers': bookmark_handler.headers,
        'body': json.dumps(result)
    }

