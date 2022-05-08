'use strict';

const sortButton = document.querySelector('#sort-button');

// When user clicks on sort button, dropdown menu should stay
// on selected filter and notes should match filter.

// sortButton.addEventListener('click', (evt) => {
//     evt.preventDefault();
    
//     const sortValue = document.querySelector('#sort-by-select').value;
//     console.log(sortValue);
    
    // document.querySelector('#sort-by-select').value = sortValue;
    // const queryString = new URLSearchParams({"sort-by": sortValue}).toString();
    // const sortUrl = `/sort-by?${queryString}`;

    // fetch('/sort-by')
    //   .then((response) => response.text())
    //   .then((sortFilter) => {
    //     document.querySelector('#sort-by-select').value = sortFilter.sort;
    //   });
// });


// When user selects a sort filter and clicks on the sort button,
// the page refreshes with value of the selected filter.

const currentUrl = window.location.href;

if (currentUrl.includes('sort-by')) {
    const query = currentUrl.substring(38);

    document.querySelector('#sort-by-select').value = query;
}