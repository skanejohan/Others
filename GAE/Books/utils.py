import os
import hmac

secret = "topsecret"


def make_secure_val(val):
    return '%s|%s' % (val, hmac.new(secret, val).hexdigest())

def check_secure_val(secure_val):
    val = secure_val.split('|')[0]
    if secure_val == make_secure_val(val):
        return val

def app_dir():
    return os.path.dirname(__file__)

def safe_int(value, default=0):
    try:
        ival = int(value)
    except TypeError:
        ival = default
    return ival
