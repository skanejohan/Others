import re
import random
import hashlib

from string import letters
from google.appengine.ext import db

USER_RE = re.compile(r"^[a-zA-Z0-9_-]{3,20}$")
PASS_RE = re.compile(r"^.{3,20}$")
EMAIL_RE = re.compile(r'^[\S]+@[\S]+\.[\S]+$')

# Convenience method
def get_user(user_name):
    return User.by_name(user_name)

class User(db.Model):
    name = db.StringProperty(required=True)
    pw_hash = db.StringProperty(required=True)
    email = db.StringProperty()

    @classmethod
    def make_salt(cls, length=5):
        return ''.join(random.choice(letters) for x in xrange(length))

    @classmethod
    def make_pw_hash(cls, name, pw, salt=None):
        if not salt:
            salt = cls.make_salt()
        h = hashlib.sha256(name + pw + salt).hexdigest()
        return '%s,%s' % (salt, h)

    @classmethod
    def valid_pw(cls, name, password, h):
        salt = h.split(',')[0]
        return h == cls.make_pw_hash(name, password, salt)

    @classmethod
    def users_key(cls, group='default'):
        return db.Key.from_path('users', group)

    @classmethod
    def valid_username(cls, username):
        return username and USER_RE.match(username)

    @classmethod
    def valid_password(cls, password):
        return password and PASS_RE.match(password)

    @classmethod
    def valid_email(cls, email):
        return not email or EMAIL_RE.match(email)

    @classmethod
    def by_id(cls, uid):
        return User.get_by_id(uid, parent=cls.users_key())

    @classmethod
    def by_name(cls, name):
        u = User.all().filter('name =', name).get()
        return u

    @classmethod
    def register(cls, name, pw, email=None):
        pw_hash = cls.make_pw_hash(name, pw)
        return User(parent=cls.users_key(),
                    name=name,
                    pw_hash=pw_hash,
                    email=email)

    @classmethod
    def login(cls, name, pw):
        u = cls.by_name(name)
        if u and cls.valid_pw(name, pw, u.pw_hash):
            return u

