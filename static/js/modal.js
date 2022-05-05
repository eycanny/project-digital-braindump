'use strict';

const createNoteButton = document.querySelector('#create-note-button');
const box = document.getElementById('modal-box');

// When user clicks on save button, modal pops up
createNoteButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  box.style.display = 'block';
})

// When user clicks outside of modal, modal closes
window.addEventListener('click', (evt) => {
  if (evt.target == box) {
    box.style.display = 'none';
  }
})

// When user clicks on cancel button, modal closes
const cancelButton = document.querySelector('#cancel-button');

cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  box.style.display = 'none';
})