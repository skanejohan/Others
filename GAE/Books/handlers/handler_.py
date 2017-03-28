import os
import webapp2
import jinja2
import utils
import logging

from models.user import User


class DataToHTML:
      
      def __init__(self):
            self.d = {}

      def add_text(self, control, text):
            self.d[control + "_text"] = text

      def add_checkbox(self, control, checked):
            self.d[control + "_checked"] = { True: "checked", False: "" }[checked]

      def add_select(self, control, options, selected):
            s = ""
            for index in range(len(options)):
                  s += '<option value="{0}" '.format(index)
                  if index == selected:
                        s += "selected"
                  s += '>{0}</option>'.format(options[index])
            self.d[control + "_options"] = s

      def get_dict(self):
            return self.d


class StaticRequestHandler(webapp2.RequestHandler):
    def __init__(self, request, response):
        self.initialize(request, response)
        self.dir = os.path.join(utils.app_dir(), 'static')

    def get(self, asset_name):
        with open(os.path.join(self.dir, asset_name)) as asset_file:
            file_name, file_extension = os.path.splitext(asset_name)
            logging.error(file_extension)
            if file_extension == '.css':
                self.response.headers['Content-Type'] = 'text/css'
            elif file_extension == '.jpg':
                self.response.headers['Content-Type'] = 'image/jpeg'
            elif file_extension == '.png':
                self.response.headers['Content-Type'] = 'image/png'
            elif file_extension == '.js':
                self.response.headers['Content-Type'] = 'text/javascript'
            else:
                self.response.headers['Content-Type'] = 'text/html'
            self.response.out.write(asset_file.read())


class HTMLRequestHandler(webapp2.RequestHandler):
    def __init__(self, request, response):
        self.initialize(request, response)
        template_dir = os.path.join(utils.app_dir(), 'templates')
        self.jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
                                            autoescape = True)

    def template(self):
        return ""

    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        params['user'] = self.user
        t = self.jinja_env.get_template(template)
        return t.render(params)

    def render(self, template, **kw):
        self.write(self.render_str(template, **kw))

    def render_me(self, **kw):
        self.render(self.template(), **kw)

    def set_secure_cookie(self, name, val):
        cookie_val = utils.make_secure_val(val)
        self.response.headers.add_header('Set-Cookie',
                                         '%s=%s; Path=/' % (name, cookie_val))

    def read_secure_cookie(self, name):
        cookie_val = self.request.cookies.get(name)
        return cookie_val and utils.check_secure_val(cookie_val)

    def login(self, user):
        self.set_secure_cookie('user_id', str(user.key().id()))

    def logout(self):
        self.response.headers.add_header('Set-Cookie', 'user_id=; Path=/')

    def initialize(self, *a, **kw):
        webapp2.RequestHandler.initialize(self, *a, **kw)
        uid = self.read_secure_cookie('user_id')
        self.user = uid and User.by_id(int(uid))

    def bool_to_checked(self, value):
        if value:
            return "checked"
        else:
            return ""

class BooksHTMLRequestHandler(HTMLRequestHandler):
    
    def user_logged_in(self):
        if self.user:
            return True
        else:
            self.redirect('/welcome')