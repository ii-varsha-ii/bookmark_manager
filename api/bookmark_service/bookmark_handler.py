import boto3
import os
import uuid

from decode_auth import DecodeAuth

class BookmarkHandler:
    def __init__(self, body = None):
        self.table = boto3.resource('dynamodb').Table(os.environ['BOOKMARKS_TABLE'])
        self.data = body
        self.headers = {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            }

    def get_token(self, event):
        if 'Authorization' not in event['headers']:
            return None
        auth_header = event['headers']['Authorization']
        if auth_header:
            token = auth_header.split(" ")[1]
            return token
        return None
    
    def decode_token(self, token):
        decoded = DecodeAuth.decode_auth_token(token)
        if isinstance(decoded, str):
            return decoded, False
        else:
            return decoded['sub'], True
    
    def create_body_checker(self):
        if 'parent' not in self.data or \
            'child' not in self.data or \
            'name' not in self.data or \
            'url' not in self.data:
            return False
        return True
    
    def update_body_checker(self):
        if 'nodeid' not in self.data or \
            'name' not in self.data or \
             'url' not in self.data:   
            return False
        return True

    def put_struct(self, userid):
        initial = {
            'userid': userid,
            'bookmarks': {
                'id' : 'root',
                'name': 'Bookmarks',
                'children': []
            }
        }
        try:
            self.table.put_item(Item = initial)
            return initial['bookmarks']
        except:
            return None
    
    
    def recursive_insert(self, bookmarks, parent, item):
        for i, key in enumerate(bookmarks):
            if 'children' in key and key['id'] == parent:
                key['children'].append(item)
            elif 'children' in key:
                key['children'] = self.recursive_insert(key['children'], parent, item)
        return bookmarks
    
    def recursive_delete(self, bookmarks, itemId):
        for i, key in enumerate(bookmarks):
            if key['id'] == itemId:
                bookmarks.remove(key)
            elif 'children' in key:
                key['children'] = self.recursive_delete(key['children'],itemId)
        return bookmarks

    def recursive_update(self, bookmarks):
        for i, key in enumerate(bookmarks):
            if key['id'] == self.data['nodeid']:
                key['name'] = self.data['name']
                if self.data['url'] is not None:
                    key['url'] = self.data['url']
            elif 'children' in key:
                key['children'] = self.recursive_update(key['children'])
        return bookmarks

    def create_entry(self, bookmarks):
        if self.data['child'] is None:
            item = {
                'id':  str(uuid.uuid1()),
                'name': self.data['name'],
                'url': self.data['url']
            }
        else:
            item = {
                'id': str(uuid.uuid1()),
                'name': self.data['child'],
                'children': [
                    {
                        'id':  str(uuid.uuid1()),
                        'name': self.data['name'],
                        'url': self.data['url']
                    }
                ]
            }
        if self.data['parent'] == 'root':
            bookmarks['children'].append(item)
        else:
            bookmarks['children'] = self.recursive_insert(bookmarks['children'], self.data['parent'], item)

        print(bookmarks)
        return bookmarks
    
    def delete_entry(self, bookmarks):
        itemid = self.data['nodeid']
        bookmarks['children'] = self.recursive_delete(bookmarks['children'], itemid)
        return bookmarks
    
    def update_entry(self, bookmarks):
        bookmarks['children'] = self.recursive_update(bookmarks['children'])
        return bookmarks
            
    def get_bookmarks(self, userid):
        try:
            response = self.table.get_item(Key={'userid': userid})
            if 'Item' not in response:
                return self.put_struct(userid)
            else:
                return response['Item']['bookmarks']
        except:
            return None

    def update_bookmarks(self, userid, bookmarks):
        try:
            response = self.table.update_item(
                Key={
                    'userid': userid
                },
                UpdateExpression="set bookmarks = :b",
                ExpressionAttributeValues={
                    ':b': bookmarks
                },
                ReturnValues="UPDATED_NEW"
            )
            return response['Attributes']['bookmarks']
        except:
            return None