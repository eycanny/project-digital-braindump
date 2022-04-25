"""Script to seed database."""

import os
from datetime import datetime

import crud
import model
import server

os.system("dropdb notes")
os.system("createdb notes")

model.connect_to_db(server.app)
model.db.create_all()

for n in range(10):
    email = f"user{n}@test.com"
    password = "test"
    username = f"user{n}"

    user = crud.create_user(email=email, password=password, username=username)
    model.db.session.add(user)
    model.db.session.commit()
    
    for i in range(5):

        note = crud.create_note(user, title = f"Title test{i}", body = f"Note test{i}")
        model.db.session.add(note)

model.db.session.commit()