"""Models for note-taking app."""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    """A user."""

    __tablename__ = "users"

    #MVP
    user_id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    email = db.Column(db.String, unique = True, nullable = False)
    password = db.Column(db.String, nullable = False)

    #2.0
    username = db.Column(db.String, unique = True, nullable = False)

    notes = db.relationship("Note", back_populates = "user")

    def __repr__(self):
        return f"<User user_id = {self.user_id} email = {self.email} username = {self.username}>"


class Note(db.Model):
    """A note."""

    __tablename__ = "notes"

    #MVP
    note_id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    title = db.Column(db.String)
    body = db.Column(db.Text)
    date_created = db.Column(db.DateTime, nullable = False)
    date_modified = db.Column(db.DateTime, nullable = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    image = db.Column(db.String, nullable = True)

    user = db.relationship("User", back_populates = "notes")

    def __repr__(self):
        return f"<Note note_id = {self.note_id}>"


def connect_to_db(flask_app, db_uri = "postgresql:///notes", echo = True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = False
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    connect_to_db(app)