import jwt
import os

class DecodeAuth:
    
    @staticmethod
    def decode_auth_token(token):
        try:
            payload = jwt.decode(token, os.environ['SECRET_KEY'], algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Login please'
        except jwt.InvalidTokenError:
            return 'Invalid token. Login please'