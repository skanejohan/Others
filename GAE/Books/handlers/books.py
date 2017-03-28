__author__ = 'Johan'

from handler_ import DataToHTML, BooksHTMLRequestHandler
from models.book import Book
import logging

class BookViewHandler(BooksHTMLRequestHandler):
    """Handler for "/123/456" """

    def template(self):
        return "book_view.html"

    def get(self, author_id, book_id):
        """Render the page for book details."""
        if self.user_logged_in():
            book = Book.by_id(self.user.name, int(author_id), int(book_id))
            d = DataToHTML()
            d.add_checkbox("owns", book.owns)
            d.add_checkbox("read", book.read)
            self.render_me(name=book.name, **d.get_dict())

    def post(self, author_id, book_id):
        """Set "read" and "owns" according to input."""
        if self.user_logged_in():
            book = Book.by_id(self.user.name, int(author_id), int(book_id))
            book.owns = bool(self.request.get('owns'))
            book.read = bool(self.request.get('read'))
            book.put()
            self.redirect("/" + author_id)


class BookAddHandler(BooksHTMLRequestHandler):
    """Handler for "/123/add" """

    def template(self):
        return "book_add.html"

    def get(self, author_id):
        """Render the page for adding a book."""
        if self.user_logged_in():
            self.render_me()

    def post(self, author_id):
        """Add a new book if the input is OK."""
        if self.user_logged_in():
            dict = {}
            dict['name'] = self.request.get('name') 
            dict['year'] = int(self.request.get('year')) 
            dict['owns'] = bool(self.request.get('owns'))
            dict['read'] = bool(self.request.get('read'))
            if dict['name'] == "":
                self.render_me(book_name_error="The name must not be empty", **dict)
            elif Book.exists(self.user.name, author_id, dict["name"]):
                self.render_me(book_name_error="This book already exists", **dict)
            else:
                book = Book.add(self.user.name, author_id, **dict)
                book.put()
                self.redirect("/" + author_id)

class BookDeleteHandler(BooksHTMLRequestHandler):
    """Handler for "/123/123/delete" """

    def post(self, author_id, book_id):
        """Delete the given book."""
        if self.user_logged_in():
            Book.delete_by_id(self.user.name, int(author_id), int(book_id))


