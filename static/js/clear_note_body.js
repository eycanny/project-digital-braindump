'use strict';

const clearNoteBodyButton = document.querySelector('#clear-body-btn');
const noteBody = document.querySelector('#note-body');

clearNoteBodyButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    noteBody.innerHTML = 'Body<br/><textarea type="text" name="body" id="text-body" style="height: 450px; width: 450px"></textarea>'
})
