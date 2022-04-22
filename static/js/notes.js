'use strict';

const deleteButton = document.querySelector('#delete-button');

deleteButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    let result = confirm("Are you sure you want to delete this note?"
        + "You won't be able to restore the data once it's been deleted.");

    if (result === true) {
        document.querySelector("#delete-confirm")
                .innerHTML = '<input type="submit" value="I REALLY WANT TO DELETE THIS NOTE">'
    }

});