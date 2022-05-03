'use strict';

const imageNoteButton = document.querySelector("#image-note-btn");
const imageNoteUploader = document.querySelector("#image-note-upload");

imageNoteButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  imageNoteUploader.innerHTML = '<br/>This is for uploading an image as a note and will override anything written in the body textarea. <input type="file" name="note-image" accept="image/*">'
});

const imageAttachmentButton = document.querySelector("#image-attachment-btn");
const imageAttachmentUploader = document.querySelector("#image-attachment-upload");

imageAttachmentButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  imageAttachmentUploader.innerHTML = '<br/>This is for attaching an image to a note. <input type="file" name="note-attachment" accept="image/*">'
});