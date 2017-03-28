from user import *
from google.appengine.ext import db

# Objects of type Author have parents of type User

# Convenience method
def get_author(user_name, author_id):
    return Author.by_id(user_name, int(author_id))

class Author(db.Model):
    name = db.StringProperty(required=True)

    @classmethod # For internal use - query for retrieving all authors
    def all_authors_query(cls, user_name):
        return Author.all().ancestor(get_user(user_name))

    @classmethod # For internal use - query for retrieving specified author
    def one_author_query(cls, user_name, author_name):
        return cls.all_authors_query(user_name).filter('name =', author_name)

    @classmethod
    def add(cls, user_name, name):
        return Author(parent=get_user(user_name), name=name)

    @classmethod
    def update(cls, user_name, author_id, name):
        author = cls.by_id(user_name, author_id)
        if author:
            author.name = name
        return author

    @classmethod
    def exists(cls, user_name, author_name):
        return cls.one_author_query(user_name, author_name).count() > 0

    @classmethod
    def by_id(cls, user_name, author_id):
        return Author.get_by_id(author_id, parent=get_user(user_name))

    @classmethod
    def by_name(cls, user_name, author_name):
        return cls.one_author_query(user_name, author_name).get()

    @classmethod
    def get_all(cls, user_name):
        return cls.all_authors_query(user_name).order("name").run()

    @classmethod
    def delete_by_id(cls, user_name, author_id):
        Author.by_id(user_name, author_id).delete()
