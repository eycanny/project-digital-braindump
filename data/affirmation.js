'use strict';

const url = 'https://www.affirmations.dev/';

fetch(url)
    .then(response => response.json())
    .then(responseData => {
        document
            .querySelector('#affirmation')
            .innerHTML = `<p>"${responseData['affirmation']}"</p>`
        });