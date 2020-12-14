import datetime
import jwt
import os


class EncodeAuth:
    @staticmethod
    def encode_auth_token(user_id):
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        token = jwt.encode(payload, os.environ['SECRET_KEY'], algorithm='HS256')
        return token
