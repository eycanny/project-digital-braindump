'use strict';

// const url = 'https://zenquotes.io/api/quotes';

// fetch(url)
//     .then(response => response.json())
//     .then(responseData => {
//         document
//             .querySelector('#affirmation')
//             .innerHTML = `<p>"${responseData[0]['h']}"</p>`
//         });

const url = 'https://quotes.rest/qod?category=inspire&language=en';

fetch(url)
    .then(response => response.json())
    .then(responseData => {
        document
            .querySelector('#affirmation')
            .innerHTML = `<p>"${responseData['contents']['quotes'][0]['quote']}"</p>`
        });