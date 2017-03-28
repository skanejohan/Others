from author import *
from google.appengine.ext import db

# Object of type Book have parents of type Author

# Convenience method
def get_book(user_name, author_id, book_id):
    return Book.by_id(cls, user_name, int(author_id), int(book_id))

class Book(db.Model):
    name = db.StringProperty(required=True)
    year = db.IntegerProperty(required=True)
    owns = db.BooleanProperty(default=False)
    read = db.BooleanProperty(default=False)

    @classmethod # For internal use - query for retrieving all books
    def all_books_query(cls, user_name, author_id):
        return Book.all().ancestor(get_author(user_name, author_id))

    @classmethod # For internal use - query for retrieving specified book
    def one_book_query(cls, user_name, author_id, book_name):
        return cls.all_books_query(user_name, author_id).filter('name =', book_name)

    @classmethod
    def add(cls, user_name, author_id, name, year, owns, read):
        return Book(parent=get_author(user_name, author_id), name=name, year=year, owns=owns, read=read)

    @classmethod
    def update(cls, user_name, author_id, book_id, name, year, owns, read):
        book = cls.by_id(user_name, author_id, book_id)
        if book:
            book.name = name
            book.year = year
            book.owns = owns
            book.read = read
        return book

    @classmethod
    def exists(cls, user_name, author_id, book_name):
        return cls.one_book_query(user_name, author_id, book_name).count() > 0

    @classmethod
    def by_id(cls, user_name, author_id, book_id):
        return Book.get_by_id(book_id, parent=get_author(user_name, author_id))

    @classmethod
    def by_name(cls, user_name, author_id, book_name):
        return cls.one_book_query(user_name, author_id, book_name).get()

    @classmethod
    def get_all(cls, user_name, author_id, sort_index = 1, owns_index = 0, read_index = 0):
        order = "name" if sort_index == 0 else "year"
        query = cls.all_books_query(user_name, author_id).order(order)
        if owns_index == 1: # yes
            query.filter("owns =", True)
        elif owns_index == 2: # No
            query.filter("owns =", False)
        if read_index == 1: # yes
            query.filter("read =", True)
        elif read_index == 2: # no
            query.filter("read =", False)
        return query.run()

    @classmethod
    def delete_by_id(cls, user_name, author_id, book_id):
        Book.get_by_id(book_id, parent=get_author(user_name, author_id)).delete()

    @classmethod
    def delete_all(cls, user_name, author_id):
        results = cls.all_books_query(user_name, author_id).run(batch_size=1000)
        for result in results:
            result.delete()
