'use strict';


// Feature: Makes an AJAX call to pull a quote from a site
const url = 'https://quotes.rest/qod?category=inspire&language=en';

fetch(url)
    .then(response => response.json())
    .then(responseData => {
        document
            .querySelector('#affirmation')
            .innerHTML = `<p>"${responseData['contents']['quotes'][0]['quote']}"</p>`
        });