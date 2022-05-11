'use strict';

const loginButton = document.querySelector('#login-btn');
const createAccountButton = document.querySelector('#create-acct-btn');
const accountBox = document.querySelector('#account-info-box');

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

      <p>
        <input type="submit">
      </p>
  </form>`;

})

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

      <p>
        <input type="submit">
      </p>
  </form>`;

})