"""Script to seed database using Faker generated information."""

import os
from datetime import datetime
from faker import Faker

import crud
import model
import server

os.system("dropdb notes")
os.system("createdb notes")

model.connect_to_db(server.app)
model.db.create_all()

fake = Faker()

for n in range(5):
    email = fake.simple_profile()['mail']
    password = "test"
    username = fake.simple_profile()['username']

    user = crud.create_user(email=email, password=password, username=username)
    model.db.session.add(user)
    model.db.session.commit()
    
    for i in range(5):

        note = crud.create_note(user, title = fake.text(max_nb_chars=60), body = fake.paragraph(nb_sentences=5), image = None)
        model.db.session.add(note)

model.db.session.commit()