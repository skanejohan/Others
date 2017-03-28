import logging

__author__ = 'Johan'

from handler_ import DataToHTML, BooksHTMLRequestHandler, HTMLRequestHandler
from models.author import Author
from models.book import Book
from models.setting import Setting
from utils import safe_int


class AuthorsHandler(BooksHTMLRequestHandler):
    """Handler for "/" """

    def template(self):
        return "authors.html"

    def get(self):
        """Render the "authors" list page"""
        if self.user_logged_in():
            authors = list(Author.get_all(self.user.name))
            self.render_me(authors = authors)


class AuthorViewHandler(BooksHTMLRequestHandler):
    """Handler for "/123" which displays details for an author."""

    def template(self):
        return "author_view.html"

    def post(self, author_id):
        if self.user_logged_in():
            if self.request.get('sort'):
                Setting.set(self.user.name, "sort_index", self.request.get('sort'))
            if self.request.get('owns'):
                Setting.set(self.user.name, "owns_index", self.request.get('owns'))
            if self.request.get('read'):
                Setting.set(self.user.name, "read_index", self.request.get('read'))
            self.redirect("/" + author_id)

    def get(self, author_id):
        if self.user_logged_in():
            author = Author.by_id(self.user.name, int(author_id))
            if author:
                sort_index = safe_int(Setting.get(self.user.name, "sort_index"))
                owns_index = safe_int(Setting.get(self.user.name, "owns_index"))
                read_index = safe_int(Setting.get(self.user.name, "read_index"))
                books = list(Book.get_all(self.user.name, int(author_id), sort_index, owns_index, read_index))
                d = DataToHTML()
                d.add_select("sort", ["Sort: name", "Sort: year"], sort_index)
                d.add_select("owns", ["Owns: any", "Owns: yes", "Owns: no"], owns_index)
                d.add_select("read", ["Read: any", "Read: yes", "Read: no"], read_index)
                self.render_me(dataurl="/" + author_id, author=author, books=books, **d.get_dict())

class AuthorAddHandler(BooksHTMLRequestHandler):
    """Handler for "/add" """

    def template(self):
        return "author_add.html"

    def get(self):
        """Render the page for adding an author."""
        if self.user_logged_in():
            self.render_me()

    def post(self):
        """Add a new author if the input is OK."""
        if self.user_logged_in():
            author_name = self.request.get('author_name')
            if author_name == "":
                self.render_me(author_name_error="The name must not be empty")
            elif Author.exists(self.user.name, author_name):
                self.render_me(author_name=author_name, author_name_error="This author already exists")
            else:
                author = Author.add(self.user.name, author_name)
                author.put()
                self.redirect("/")

class AuthorDeleteHandler(BooksHTMLRequestHandler):
    """Handler for "/123/delete" """

    def post(self, author_id):
        """Delete the given author and all its books."""
        if self.user_logged_in():
            Book.delete_all(self.user.name, int(author_id))
            Author.delete_by_id(self.user.name, int(author_id))


