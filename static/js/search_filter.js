'use strict';

const sortButton = document.querySelector('#sort-button');

// When user selects a sort filter and clicks on the sort button,
// the page refreshes with value of the selected filter.

const currentUrl = window.location.href;

if (currentUrl.includes('sort-by')) {
    const query = currentUrl.substring(38);

    document.querySelector('#sort-by-select').value = query;
}