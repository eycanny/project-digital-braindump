'use strict';

//Login and Account Creation
const loginButton = document.querySelector('#login-btn');
const createAccountButton = document.querySelector('#create-acct-btn');
const accountBox = document.querySelector('#account-info-box');


//Feature: Changes to a box for logging in upon clicking button
loginButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  loginButton.style.backgroundColor = 'rgba(34,124,157, 0.6)';
  createAccountButton.style.backgroundColor = 'rgba(34,124,157, 0.2)';

  accountBox.innerHTML =
  `<form action="/login" method="POST">
    <h5><strong>Log into Account</strong></h5>
    <table>
      <tr>
        <td><label for="email"><strong>Email</strong></label></td>
        <td><input type="email" name="email"></td>
      </tr>
      <tr>
        <td><label for="password"><strong>Password</strong></label></td>
        <td><input type="password" name="password"></td>
      </tr>
    </table>
    <button class="btn btn-outline-secondary option-btn" type="submit">SIGN IN</button>
  </form>`;

})


//Feature: Changes to a box for creating an account upon clicking button
createAccountButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  loginButton.style.backgroundColor = 'rgba(34,124,157, 0.2)';
  createAccountButton.style.backgroundColor = 'rgba(34,124,157, 0.6)';

  accountBox.innerHTML =
  `<form action="/users" method="POST">
    <h5><strong>Create an Account</strong></h5>
    <table>
      <tr>
        <td><label for="username"><strong>Username</strong></label></td>
        <td><input type="text" name="username"></td>
      </tr>
      <tr>
        <td><label for="email"><strong>Email</strong></label></td>
        <td><input type="email" name="email"></td>
      </tr>
      <tr>
        <td><label for="password"><strong>Password</strong></label></td>
        <td><input type="password" name="password"></td>
      </tr>
    </table>
    <button class="btn btn-outline-secondary option-btn" type="submit">CREATE</button>
  </form>`;

})


//About Digital Braindump
const aboutButton = document.querySelector('#about-braindump-btn');
const aboutContext = document.querySelector('#about-braindump');

//Feature: Show user the app's About information
aboutButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  aboutContext.innerHTML =
    `<button class="btn btn-outline-secondary option-btn" type="button" id="about-braindump-btn">
    What is Digital Braindump?<br/>
    Click to learn!
    </button><br/>
    <br/>
    <p>
    Digital Braindump serves as a minimalist application to help you declutter your mind in the form of notes.
    </p>`
})