'use strict';

const imageNoteButton = document.querySelector("#image-note-btn")
const noteBody = document.querySelector("#note-body")

imageNoteButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  noteBody.insertAdjacentHTML('beforeend', '<br/>This is for uploading an image as a note. <input type="file" name="note-image" accept="image/*">')
});

const imageAttachmentButton = document.querySelector("#image-attachment-btn")

imageAttachmentButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  noteBody.insertAdjacentHTML('beforeend', '<br/>This is for attaching an image to a note. <input type="file" name="note-attachment" accept="image/*">')
});