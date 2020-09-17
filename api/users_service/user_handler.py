import boto3
import os
import time
import uuid

from encode_auth import EncodeAuth
"""
A class used to handle registeration, authentication and 
log in of users
"""
class UserHandler:
    def __init__(self, body):
        self.table = boto3.resource('dynamodb').Table(os.environ['USER_TABLE'])
        self.data = body
        self.headers = {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            }
    """
    Check if the request body consists of 
    appropriate fields for furthur processing
    """
    def register_body_checker(self):
        if 'firstname' not in self.data or \
            'lastname' not in self.data or \
            'email' not in self.data or \
            'password' not in self.data:
            return False
        return True
    
    def login_body_checker(self):
        if 'email' not in self.data or \
            'password' not in self.data:
            return False
        return True
    
    """
    Construct and insert new user object 
    upon registeration
    """
    def create_user(self):
        timestamp = str(time.time())
        item = {
            'id': str(uuid.uuid1()),
            'firstname': self.data['firstname'],
            'lastname': self.data['lastname'],
            'email': self.data['email'],
            'password': self.data['password'],
            'createdAt': timestamp,
            'updatedAt': timestamp,
        }
        try:
            self.table.put_item(Item=item)
        except:
            return False
        return True
    
    """
    Check authentication and return JWT token
    """
    def verify_user(self):
        response = self.table.get_item(
                        Key={
                            'email': self.data['email']
                        })
        result = None
        if 'Item' not in response:
            result = self.data
            
            result['status'] = "False"
            result['message'] =  "User doesn't exist. Register to continue."
        
        else:
            result = response['Item']
            if result['password'] == self.data['password']:
                token = EncodeAuth.encode_auth_token(result['id'])
                result['auth_token'] = token.decode('utf-8')

                result['status'] = "True"
                result['message'] = "Logged In Successfully."
            else:
                result['status'] = "False"
                result['message'] = "Username and Password doesn't match"
        return result


    
