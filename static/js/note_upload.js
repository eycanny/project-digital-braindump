'use strict';

const createNoteButton = document.querySelector("#create-note-button");
const box = document.getElementById("modal-box");

// When user clicks on button, modal pops up
createNoteButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  box.style.display = "block";
})

// When user clicks outside of modal, modal closes
window.addEventListener("click", (evt) => {
  if (evt.target == box) {
    box.style.display = "none";
  }
})

const imageNoteButton = document.querySelector("#image-note-btn");
const imageNoteUploader = document.querySelector("#image-note-upload");

// When user clicks on button, option to upload an image as a note appears
imageNoteButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  imageNoteUploader.innerHTML = '<br/>This is for uploading an image as a note and will override anything written in the body textbox. <input type="file" name="note-image" accept="image/*">'
});

const imageAttachmentButton = document.querySelector("#image-attachment-btn");
const imageAttachmentUploader = document.querySelector("#image-attachment-upload");

// When user clicks on button, option to upload an image as a note attachment appears
imageAttachmentButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  imageAttachmentUploader.innerHTML = '<br/>This is for attaching an image to a note. <input type="file" name="note-attachment" accept="image/*">'
});