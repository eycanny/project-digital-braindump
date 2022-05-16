'use strict';


// Feature: Delays deletion of note until user confirms they want note deleted
const deleteButton = document.querySelector('#delete-button');

deleteButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  document
    .querySelector("#delete-confirm")
    .innerHTML = `Are you sure that you want to delete this note? Once deleted, the note can't be restored.
      <br/>
      <button class="btn btn-outline-secondary option-btn" id="confirm-delete-btn">Click Again to Confirm Delete</button>`

})