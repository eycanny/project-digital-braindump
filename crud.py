"""CRUD operations."""

from model import db, User, Note, connect_to_db
from datetime import datetime
from sqlalchemy import func, nullslast


def create_user(email, password, username):
    """Create and return a new user."""

    user = User(email = email, password = password, username = username)

    return user


def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()


def get_user_by_username(username):
    """Return a user by username."""

    return User.query.filter(User.username == username).first()


def get_user_by_id(user_id):
    """Return a user by user id."""

    return User.query.filter(User.user_id == user_id).first()


def create_note(user, title, body):
    """Create and return a new note."""

    note = Note(
        title = title, 
        body = body, 
        date_created = datetime.now().strftime("%m-%d-%Y %H:%M:%S"), 
        date_modified = datetime.now().strftime("%m-%d-%Y %H:%M:%S"),
        user_id = user.user_id
    )

    return note


def delete_note(note_id):
    """Delete a note."""

    #User clicks on delete button
    #Alert box pops up
    #User confirms or denies proceeding with delete


def get_note_by_user(user_id):
    """Return notes by user id."""

    return Note.query.filter(Note.user_id == user_id).order_by(Note.note_id).all()


def get_note_by_id(note_id, user_id):
    """Return a note by note id based on user id."""

    return Note.query.filter(Note.user_id == user_id, Note.note_id == note_id).first()


def get_note_by_keyword(keyword, user_id):
    """Return notes containing keyword."""

    return Note.query.filter(
        (Note.title.ilike(f"%{keyword}%")) | (Note.body.ilike(f"%{keyword}%")),
        Note.user_id == user_id
        ).all()


def sort_note_by_title_asc(user_id):
    """Return notes sorted by title in ascending order."""

    return Note.query.filter(Note.user_id == user_id).order_by(nullslast(func.lower(Note.title).asc())).all()


def sort_note_by_title_desc(user_id):
    """Return notes sorted by title in descending order."""

    return Note.query.filter(Note.user_id == user_id).order_by(nullslast(func.lower(Note.title).desc())).all()


def sort_note_by_date_created_asc(user_id):
    """Return notes sorted by date created in ascending order."""

    return Note.query.filter(Note.user_id == user_id).order_by(Note.date_created.asc()).all()


def sort_note_by_date_created_desc(user_id):
    """Return notes sorted by date created in descending order."""

    return Note.query.filter(Note.user_id == user_id).order_by(Note.date_created.desc()).all()


def sort_note_by_date_modified_asc(user_id):
    """Return notes sorted by date created in ascending order."""

    return Note.query.filter(Note.user_id == user_id).order_by(Note.date_modified.asc()).all()


def sort_note_by_date_modified_desc(user_id):
    """Return notes sorted by date created in descending order."""

    return Note.query.filter(Note.user_id == user_id).order_by(Note.date_modified.desc()).all()


if __name__ == "__main__":
    from server import app

    connect_to_db(app)