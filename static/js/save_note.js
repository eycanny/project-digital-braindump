'use strict';

const saveButton = document.querySelector('#save-button');

// Adds to page without refreshing but unable to pull data in AJAX request

// saveButton.addEventListener('click', (evt) => {
//   evt.preventDefault();

//   fetch('/create-note', {
//     method: 'POST',
//   })
//     .then((response) => response.json())
//     .then((responseData) => {
//         document.querySelector('#note-container').insertAdjacentHTML(
//             'beforeend',
//             `<form action="/notes/${responseData.note_id}" class="note">
//             <button>
//                 <h2>${responseData.title}</h2>
        
//                 <img src="${responseData.body}"></img>
//                 <p>${responseData.body}</p>

//                 <img src="${responseData.image}"></img>
//             </button>
//             </form>`
//             );
//     });
// });

// saveButton.addEventListener('click', (evt) => {
//   evt.preventDefault();

//   fetch('/api/image-upload')
//     .then((images) => images.json())
//     .then((imageData) => {
//       const images = imageData;

//       const formInputs = {
//         title: document.getElementById('#note-title').value,
//         body: document.getElementById('#note-body').value,
//         imageBody: images.note_image,
//         imageAttachment: images.note_attachment,
//       };

//       fetch('/create-note', {
//         method: 'POST',
//         body: JSON.stringify(formInputs),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => response.json())
//         .then((responseJson) => {
//           console.log(responseJson)
//         });

//   });
// });