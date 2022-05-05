'use strict';

const imageNoteButton = document.querySelector("#image-note-btn");
const imageNoteUploader = document.querySelector("#image-note-upload");

// When user clicks on button, option to upload an image as a note appears
imageNoteButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  imageNoteUploader.innerHTML = '<br/>This is for uploading an image as a note and will override anything written in the body textbox. <input type="file" name="note-image" id="note-image-body" accept="image/*">'
});

const imageAttachmentButton = document.querySelector("#image-attachment-btn");
const imageAttachmentUploader = document.querySelector("#image-attachment-upload");

// When user clicks on button, option to upload an image as a note attachment appears
imageAttachmentButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  imageAttachmentUploader.innerHTML = '<br/>This is for attaching an image to a note. <input type="file" name="note-attachment" id="note-image-attachment" accept="image/*">'
});