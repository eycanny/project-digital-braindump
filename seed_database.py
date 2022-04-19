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

    user = crud.create_user(email, password)
    model.db.session.add(user)

model.db.session.commit()