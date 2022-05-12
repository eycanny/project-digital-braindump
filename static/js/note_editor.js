'use strict';

const deleteButton = document.querySelector('#delete-button');

deleteButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  document
    .querySelector("#delete-confirm")
    .innerHTML = `Are you sure that you want to delete this note? Once deleted, the note can't be restored.
      <br/>
      <input type="submit" value="Click Again to Confirm Delete">`

})