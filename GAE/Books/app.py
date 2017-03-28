# ~/google_appengine/dev_appserver.py --clear_datastore yes .
# ~/google_appengine/appcfg.py update yes .
# hg54k7.appspot.com

"""
      All pages are protected - unauthorized access redirects to /welcome. Base template = base.html.

      URL               Handler                     HTML template       Description
      ==========================================================================================================================
      /welcome          users.WelcomeHandler        welcome.html        Presents "signup" ( => "/signup") and "login" ( => "login" ) options.
      /signup           users.SignupHandler         signup.html         Sign up for an account. OK => "/".
      /login            users.LoginHandler          login.html          Log in to your account. OK => "/".
      /logout           users.LogoutHandler         -                   Log out from your account. OK => "/welcome".

      /                 authors.AuthorsHandler      authors.html        List all authors (names). Add => "/new". Clicking an author => "/<id>".
      /add              authors.AuthorAddHandler    author_add.html     Add an author (name). OK => "/".
      /<id>             authors.AuthorViewHandler   author_view.html    View an author and all its books. Allow filtering by owns/read + sorting by name/year. Clicking a book => "/<id>/<id>"
      /<id>/delete      authors.AuthorDeleteHandler -                   Delete an author and all its books.
      /<id>/add         books.BookAddHandler        book_add.html       Add a book (name). OK => "/<id>".
      /<id>/<id>        books.BookViewHandler       book_view.html      View a book. Allows setting owns/read. OK => /<id>.
      /<id>/<id>/delete books.BookDeleteHandler     -                   Delete a book.

      TODO Display errors.
      TODO filter on read/owns doesn't work
      TODO delete book/author: redirect is too quick - is there a way to wait for the delete to be performed first? 
      TODO delete book/author: sometimes you have to refresh a form before being able to delete.
      TODO upload - button + really upload a .json file (upload in background thread?) Also it takes too long - we must split it up somwhow.
      TODO "Back" button.
      

"""

import webapp2
from handlers.handler_ import StaticRequestHandler
from handlers.users import WelcomeHandler, SignupHandler, LoginHandler, LogoutHandler
from handlers.authors import AuthorsHandler, AuthorAddHandler, AuthorViewHandler, AuthorDeleteHandler
from handlers.books import BookViewHandler, BookAddHandler, BookDeleteHandler
from handlers.transfer import UploadHandler, DownloadHandler

app = webapp2.WSGIApplication([('/welcome/?', WelcomeHandler),
                               ('/signup/?', SignupHandler),
                               ('/login/?', LoginHandler),
                               ('/logout/?', LogoutHandler),

                               ('/?', AuthorsHandler),
                               ('/add/?', AuthorAddHandler),
                               ('/([0-9]+)', AuthorViewHandler),
                               ('/([0-9]+)/delete/?', AuthorDeleteHandler),
                               ('/([0-9]+)/([0-9]+)/delete/?', BookDeleteHandler),     
                               ('/([0-9]+)/([0-9]+)/?', BookViewHandler),     
                               ('/([0-9]+)/add/?', BookAddHandler),

                               ('/static/(.*)', StaticRequestHandler),
                               ('/upload/?', UploadHandler),
                               ('/download/?', DownloadHandler)],
                              debug=True)

