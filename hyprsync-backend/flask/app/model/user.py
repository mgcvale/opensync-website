import bcrypt
import secrets

def gensalt():
    return bcrypt.gensalt()


def hash_password(password, salt):
    return bcrypt.hashpw(password.encode('utf-8'), salt)


class User:
    def __init__(self, username, password):
        self._username = username
        self._salt = gensalt()
        self._password_hash = hash_password(password, self._salt)
        self._access_token = secrets.token_hex(16)

    def get_token(self, password):
        hashed_pwd = hash_password(password, self._salt)
        return self._access_token if hashed_pwd == self._password_hash else None

    def auth(self, token):
        return token == self._access_token

    def regen_token(self):
        self._access_token = secrets.token_hex(16)