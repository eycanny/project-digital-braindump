"""Server for note-taking app."""

from flask import Flask, render_template, request, flash, session, redirect
from model import connect_to_db, db
from datetime import datetime
import crud
import os
import cloudinary.uploader

from jinja2 import StrictUndefined

os.system("sudo service postgresql start")

app = Flask(__name__)
app.secret_key = os.environ['SECRET_KEY']
app.jinja_env.undefined = StrictUndefined

CLOUDINARY_CLOUD_NAME = os.environ['CLOUDINARY_CLOUD_NAME']
CLOUDINARY_KEY = os.environ['CLOUDINARY_KEY']
CLOUDINARY_API_SECRET = os.environ['CLOUDINARY_API_SECRET']

#-----------------------------------------------------------------------------#
#---------------------------- Homepage Functions -----------------------------#
#-----------------------------------------------------------------------------#

@app.route("/")
def view_homepage():
    """View homepage."""

    user_email = session.get("user_email")
    user = crud.get_user_by_email(user_email)

    if user:
        return redirect("/notes")

    return render_template("homepage.html")


@app.route("/users", methods=["POST"])
def create_account():
    """Create a user account."""

    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    username_check = crud.get_user_by_username(username)

    if user:
        flash("An account is already associated with that email. Try again.")

    elif username_check:
        flash("That username is taken. Try again.")

    else:
        user = crud.create_user(email=email, password=password, username=username)
        db.session.add(user)
        db.session.commit()
        flash("Account successfully created! Please log in.")

    return redirect("/")


@app.route("/login", methods = ["POST"])
def process_login():
    """Process user login.
    
    If login successful, redirect to user's notes."""

    email = request.form.get("email")
    password = request.form.get("password")
    user = crud.get_user_by_email(email)

    if not user or user.password != password:
        flash("The email or password you entered was incorrect. Try again.")
        return redirect("/")
    else:
        session["user_email"] = user.email
        flash(f"Logged into account successfully. Welcome back, {user.username}.")
        return redirect("/notes")


@app.route("/logout")
def process_logout():
    """Process user logout."""

    session["user_email"] = None
    flash("Logged out of account successfully.")

    return redirect("/")


#-----------------------------------------------------------------------------#
#-------------------------- Note Viewing Functions ---------------------------#
#-----------------------------------------------------------------------------#

@app.route("/notes")
def view_notes():
    """Show all notes created by user."""

    session["user_email"] = session.get("user_email")

    if session["user_email"] == None:
        flash("You must be logged in to view your notes.")
        return redirect("/")

    user = crud.get_user_by_email(session["user_email"])
    notes = crud.get_note_by_user(user.user_id)

    return render_template("user_notes.html", notes=notes, user=user)


@app.route("/view-note/<note_id>")
def view_note(note_id):
    """Show a note."""

    session["user_email"] = session.get("user_email")

    if session["user_email"] == None:
        flash("You must be logged in to view your notes.")
        return redirect("/")

    user = crud.get_user_by_email(session["user_email"])
    note = crud.get_note_by_id(note_id=note_id, user_id=user.user_id)

    return render_template("note_details.html", note=note)


@app.route("/search")
def view_notes_by_keyword():
    """Return notes with keyword input by user."""

    session["user_email"] = session.get("user_email")

    if session["user_email"] == None:
        flash("You must be logged in to view your notes.")
        return redirect("/")

    keyword = request.args.get("search")

    if not keyword:
        return redirect("/notes")

    user = crud.get_user_by_email(session["user_email"])

    notes = crud.get_note_by_keyword(keyword, user.user_id)

    return render_template("user_notes.html", notes=notes, user=user)


@app.route("/sort-by")
def sort_notes():
    """Return notes sorted by user's selected value."""

    session["user_email"] = session.get("user_email")

    if session["user_email"] == None:
        flash("You must be logged in to view your notes.")
        return redirect("/")

    user_email = session["user_email"]
    user = crud.get_user_by_email(user_email)

    sorting_choice = request.args.get("sort-by")

    if sorting_choice == "title-asc":
        notes = crud.sort_note_by_title_asc(user.user_id)

    elif sorting_choice == "title-desc":
        notes = crud.sort_note_by_title_desc(user.user_id)
    
    elif sorting_choice == "date-created-asc":
        notes = crud.sort_note_by_date_created_asc(user.user_id)

    elif sorting_choice == "date-created-desc":
        notes = crud.sort_note_by_date_created_desc(user.user_id)
    
    elif sorting_choice == "date-modified-asc":
        notes = crud.sort_note_by_date_modified_asc(user.user_id)

    elif sorting_choice == "date-modified-desc":
        notes = crud.sort_note_by_date_modified_desc(user.user_id)
    
    return render_template("user_notes.html", notes=notes, user=user)


#-----------------------------------------------------------------------------#
#--------------------- Note Creating/Editing Functions -----------------------#
#-----------------------------------------------------------------------------#

@app.route("/create-note", methods=["POST"])
def create_note():
    """Create a note."""

    title = request.form.get("title")
    body = request.form.get("body")
    user = crud.get_user_by_email(session["user_email"])
    image = None

    if title == "":
        title = "(No Title)"

    if body == "":
        body = "(No Body)"

    images = upload_to_cloudinary()

    if (images["note_image"] != None) and (type(images["note_image"]) == str):
        body = images["note_image"]

    if (images["note_attachment"] != None) and (type(images["note_attachment"]) == str):
        image = images["note_attachment"]
    
    new_note = crud.create_note(user, title, body, image)
    db.session.add(new_note)
    db.session.commit()

    return redirect("/notes")


@app.route("/edit-note/<note_id>/")
def open_editor(note_id):
    """Open note editor to edit a note."""

    session["user_email"] = session.get("user_email")

    if session["user_email"] == None:
        flash("You must be logged in to edit your notes.")
        return redirect("/")

    user = crud.get_user_by_email(session["user_email"])
    note = crud.get_note_by_id(note_id=note_id, user_id=user.user_id)

    return render_template("note_editor.html", note=note)


@app.route("/save-note/<note_id>", methods=["POST"])
def save_note(note_id):
    """Save a note after editing."""

    user = crud.get_user_by_email(session["user_email"])
    note = crud.get_note_by_id(note_id=note_id, user_id=user.user_id)

    note = modify_note(note)
    db.session.commit()

    return redirect(f"/view-note/{note_id}")


@app.route("/delete-note/<note_id>", methods=["POST"])
def delete_note(note_id):
    """Delete a note."""

    user = crud.get_user_by_email(session["user_email"])
    note = crud.get_note_by_id(note_id=note_id, user_id=user.user_id)

    db.session.delete(note)
    db.session.commit()

    flash("Note has been successfully deleted.")
    return redirect("/notes")


#-----------------------------------------------------------------------------#
#----------------------------- Logic Functions -------------------------------#
#-----------------------------------------------------------------------------#

def modify_note(note):
    """Modify a note."""

    new_title = request.form.get("title")
    new_body = request.form.get("body")
    date_modified = datetime.now().strftime("%m-%d-%Y %H:%M:%S")
    new_image = note.image

    if not new_title:
        new_title = "(No Title)"

    if not new_body:
        new_body = "(No Body)"

    images = upload_to_cloudinary()

    if (images["note_image"] != None) and (type(images["note_image"]) == str):
        new_body = images["note_image"]

    if (images["note_attachment"] != None) and (type(images["note_attachment"]) == str):
        new_image = images["note_attachment"]

    note.title = new_title
    note.body = new_body
    note.date_modified = date_modified
    note.image = new_image

    return note


def upload_to_cloudinary():
    """Upload file to Cloudinary API."""

    image_uploads = {}

    image_uploads["note_image"] = request.files.get("note-image")
    image_uploads["note_attachment"] = request.files.get("note-attachment")

    if (request.files.get("note-image") != None) and (request.files.get("note-image").content_type != "application/octet-stream"):
        image_as_note = request.files["note-image"]
        result = cloudinary.uploader.upload(image_as_note,
                                            api_key=CLOUDINARY_KEY,
                                            api_secret=CLOUDINARY_API_SECRET,
                                            cloud_name=CLOUDINARY_CLOUD_NAME)
        image_uploads["note_image"] = result["secure_url"]

    if (request.files.get("note-attachment") != None) and (request.files.get("note-attachment").content_type != "application/octet-stream"):
        image_as_attachment = request.files["note-attachment"]
        result = cloudinary.uploader.upload(image_as_attachment,
                                            api_key=CLOUDINARY_KEY,
                                            api_secret=CLOUDINARY_API_SECRET,
                                            cloud_name=CLOUDINARY_CLOUD_NAME)
        image_uploads["note_attachment"] = result["secure_url"]

    return image_uploads


#-----------------------------------------------------------------------------#
if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)