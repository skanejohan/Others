from user import *
from google.appengine.ext import db

# Objects of type Setting have parents of type User

class Setting(db.Model):
    s_key = db.StringProperty(required=True)
    s_value = db.StringProperty()

    @classmethod
    def get_object(cls, user_name, s_key):
        """ For internal use - returns object with gievn key, or None """
        return Setting.all().ancestor(get_user(user_name)).filter('s_key =', s_key).get()

    @classmethod
    def get(cls, user_name, s_key):
        """ Returns value of setting with given key, or None """
        setting = cls.get_object(user_name, s_key)
        if setting:
            return setting.s_value

    @classmethod
    def set(cls, user_name, s_key, s_value):
        """ Sets given value to key (persistent) """
        setting = cls.get_object(user_name, s_key)
        if setting:
            setting.s_value = s_value
        else:
            setting = Setting(parent=get_user(user_name), s_key=s_key, s_value=s_value)
        setting.put()
