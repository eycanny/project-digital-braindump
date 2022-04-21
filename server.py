"""Server for note-taking app."""

from flask import Flask, render_template, request, flash, session, redirect
from model import connect_to_db, db
import crud
import os

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = os.environ['SECRET_KEY']
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def view_homepage():
    """View homepage."""

    user_email = session.get("user_email")
    user = crud.get_user_by_email(user_email)

    if user:
        return redirect("/notes")

    return render_template("homepage.html")


@app.route("/login", methods = ["POST"])
def process_login():
    """Process user login.
    
    If login successful, redirect to user's notes."""

    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    if not user or user.password != password:
        flash("The email or password you entered was incorrect.")
        return redirect("/")
    else:
        session["user_email"] = user.email
        return redirect("/notes")


@app.route("/create-note")
def open_note_editor():
    """Open note editor."""

    return render_template("note_editor.html")


@app.route("/create-note", methods=["POST"])
def create_note():
    """Create a note."""

    title = request.form.get("title")
    body = request.form.get("body")
    user = crud.get_user_by_email(session["user_email"])

    new_note = crud.create_note(user, title, body)
    db.session.add(new_note)
    db.session.commit()

    return redirect("/notes")

@app.route("/notes")
def view_notes():
    """Show notes of user."""

    if session["user_email"] == None:
        flash("You must be logged in to view your notes.")
        return redirect("/")

    user = crud.get_user_by_email(session["user_email"])
    notes = crud.get_note_by_user(user.user_id)

    return render_template("user_notes.html", notes=notes, user=user)


@app.route("/notes/<note_id>")
def view_note(note_id):
    """Show a note."""

    user = crud.get_user_by_email(session["user_email"])
    note = crud.get_note_by_id(note_id=note_id, user_id=user.user_id)

    return render_template("note_details.html", note=note)


@app.route("/search")
def view_notes_by_keyword():
    """Return notes with keyword input by user."""

    keyword = request.args.get("search")
    user = crud.get_user_by_email(session["user_email"])

    notes = crud.get_note_by_keyword(keyword, user.user_id)

    return render_template("user_notes.html", notes=notes, user=user)


@app.route("/logout")
def process_logout():
    """Process user logout."""

    session["user_email"] = None

    return redirect("/")
    


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)