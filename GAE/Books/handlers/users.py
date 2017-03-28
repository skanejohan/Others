from handler_ import HTMLRequestHandler

from models.user import User


class WelcomeHandler(HTMLRequestHandler):
    
    def template(self):
        return "welcome.html"

    def get(self):
        self.render_me()
 

class SignupHandler(HTMLRequestHandler):

    def template(self):
        return "signup.html"

    def get(self):
        self.render_me()
        
    def post(self):
        ok = True
        username = self.request.get('username')
        password = self.request.get('password')
        verify = self.request.get('verify')
        email = self.request.get("email")

        params = dict(username = username, email = email)

        u = User.by_name(username)
        if u:
            params['user_name_error'] = "That user already exists"
            ok = False
        elif not User.valid_username(username):
            params['user_name_error'] = "That's not a valid username."
            ok = False

        if not User.valid_password(password):
            params['password_error'] = "That wasn't a valid password."
            ok = False
        elif password != verify:
            params['verify_error'] = "Your passwords didn't match."
            ok = False

        if not User.valid_email(email):
            params['email_error'] = "That's not a valid email."
            ok = False

        if ok:
            u = User.register(username, password, email)
            u.put()
            self.login(u)
            self.redirect('/')
        else:
            self.render_me(**params)


class LoginHandler(HTMLRequestHandler):

    def template(self):
        return "login.html"

    def get(self):
        self.render_me()
 
    def post(self):
        username = self.request.get('username')
        password = self.request.get('password')

        u = User.login(username, password)
        if u:
            self.login(u)
            self.redirect('/')
        else:
            self.render_me(error = "Invalid login")


class LogoutHandler(HTMLRequestHandler):
    def get(self):
        self.logout()
        self.redirect('/welcome')
