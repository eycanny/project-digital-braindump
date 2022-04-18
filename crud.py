"""CRUD operations."""

from model import db, User, Note, connect_to_db
from datetime import datetime

# MVP
def create_user(email, password):
    """Create and return a new user."""

    user = User(email = email, password = password)

    return user


# 2.0
# def create_user(email, password, username):
#     """Create and return a new user."""

#     user = User(email=email, password=password, username=username)

#     return user

def create_note(title = None, body = None, date_created, date_modified = None):
    """Create and return a new note."""

    note = Note(title = title, 
                body = body, 
                date_created = date_created, 
                date_modified = date_modified)

    return note

def modify_note(note):
    """Modify a note."""

    #requires data from html
    new_title = request.form.get("title")
    new_body = request.form.get("body")
    date_modified = datetime.now().strftime("%m-%d-%Y %H:%M:%S")

    note.title = new_title
    note.body = new_body
    note.date_modified = date_modified

    return note