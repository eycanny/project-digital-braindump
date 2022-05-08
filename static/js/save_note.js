// 'use strict';

// const saveButton = document.querySelector('#save-button');

// // Adds to page without refreshing but unable to pull data in AJAX

saveButton.addEventListener('click', (evt) => {
  // evt.preventDefault();

  let file = evt.target.parentElement.parentElement.querySelector("#note-image-body").files[0];
  // let formData = new FormData().append("image", file);

  console.log(file);

  fetch('/create-note', {
    method: 'POST',
    mode: "no-cors",
    body: new FormData().append("file", file),
    files: file,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
    .then((note) => note.json())
    .then((noteData) => {
        document.querySelector('#note-container').insertAdjacentHTML(
            'beforeend',
            `<form action="/notes/${noteData.note_id}" class="note">
            <button>
                <h2>${noteData.title}</h2>
        
                <img src="${noteData.body}"></img>
                <p>${noteData.body}</p>

                <img src="${noteData.image}"></img>
            </button>
            </form>`
            );
    });
});

// // const noteImageUpload = document.getElementById('#note-image');
// // const noteAttachmentUPload = document.getElementById('#note-attachment');
// // const formData = new FormData();

// // if (noteImageUpload.files.length = 1) {
// //   formData.append('note-image', noteImageUpload.files[0]);
// // }

// // if (noteAttachmentUPload.files.length = 1) {
// //   formData.append('note-attachment', noteAttachmentUPload.files[0]);
// // }

// // const upload = (file) => {
// //   fetch('/create-note',{
// //     method: 'POST',
// //     body: noteImageUpload.files[0],
// //   })
// // }

// // saveButton.addEventListener('click', (evt) => {
// //   evt.preventDefault();

// //   const formInputs = {
// //     title: document.getElementById('#note-title').value,
// //     body: document.getElementById('#note-body').value,
// //   };

// //   const fileInputs = {
// //     imageBody: document.getElementById('#note-image').files,
// //     imageAttachment: document.getElementById('#note-attachment').files,
// //   };

// //   Promise.all([
// //     fetch('/create-note', {
// //       method: 'POST',
// //       body: JSON.stringify(formInputs),
// //       headers: {
// //       'Content-Type': 'application/json',
// //       }
// //     }),
// //     fetch('/api-image-upload', {
// //       method: 'POST',
// //       body: JSON.stringify(fileInputs),
// //       headers: {
// //       'Content-Type': 'application/json',
// //       }
// //     })
// //   ])
// //     .then((responses) => {
// //       Promise.all(responses.map((response) => {
// //         response.json();
// //       }));
// //     })
// //     .then((responseData) => {
// //       document.querySelector('#note-container').insertAdjacentHTML(
// //         'beforeend',
// //         `<form action="/notes/${responseData.note_id}" class="note">
// //         <button>
// //             <h2>${responseData.title}</h2>
    
// //             <img src="${responseData.body}"></img>
// //             <p>${responseData.body}</p>

// //             <img src="${responseData.image}"></img>
// //         </button>
// //         </form>`
// //         );
// //     });
// // });