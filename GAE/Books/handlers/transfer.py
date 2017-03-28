__author__ = 'Johan'

import os
import utils
import json    

from handler_ import BooksHTMLRequestHandler
from models.book import Book
from models.author import Author


class UploadHandler(BooksHTMLRequestHandler):

    def add_or_get_author(self, name):
        author = Author.by_name(self.user.name, name)
        if author == None:
                author = Author.add(self.user.name, name)
                author.put()
        return author

    def add_or_get_book(self, author, name, year, owns, read):
        book = Book.by_name(self.user.name, author.key().id(), name)
        if book == None:
                book = Book.add(self.user.name, author.key().id(), name, year, owns, read)
                book.put()
        return book

    def get(self):
        if self.user_logged_in():
            data_dir = os.path.join(utils.app_dir(), '_data')
            json_file = os.path.join(data_dir, "mybooks.json")
            content = json.load(open(json_file))
            for a in content["authors"]:
                author = self.add_or_get_author(a["name"])
                for b in a["books"]:
                    self.add_or_get_book(author, b["title"], b["year"], b["owns"], b["read"])
            self.redirect('/')

class DownloadHandler(BooksHTMLRequestHandler):

    def get(self):
        if self.user_logged_in():
            authors = Author.get_all(self.user.name)
            authors_list = []
            for author in authors:
                author_dict = { "name": author.name } 
                book_list = []
                books = Book.get_all(self.user.name, author.key().id())
                for book in books:
                    book_dict = {}
                    book_dict["title"] = book.name
                    book_dict["year"] = book.year
                    book_dict["owns"] = book.owns
                    book_dict["read"] = book.read
                    book_list.append(book_dict)
                author_dict["books"] = book_list
                authors_list.append(author_dict)
            authors_dict = { "authors": authors_list }
            self.response.out.write(json.dumps(authors_dict, sort_keys=True, indent=2))
            self.response.headers['Content-Type'] = 'application/json'

class DropAllHandler(BooksHTMLRequestHandler):

    def get(self):
        if self.user_logged_in():
            pass
            
 