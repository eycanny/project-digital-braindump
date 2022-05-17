'use strict';

// Feature: Clear note's body of any text or images
const clearNoteBodyButton = document.querySelector('#clear-body-btn');
const noteBody = document.querySelector('#note-body');

clearNoteBodyButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    noteBody.innerHTML = '<textarea type="text" name="body" id="text-body" style="height: 450px; width: 100%"></textarea>'
})
