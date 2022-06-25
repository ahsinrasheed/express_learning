/* eslint-disable */
import '@babel/polyfill';
import { login } from './login';

  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
// ================================================

/* eslint-disable */
  /*

import '@babel/polyfill';
// import { displayMap } from './mapbox';
import { login } from './login';

  const loginForm = document.getElementById('map');

  // DOM Elements
  const mapBox = document.getElementById('map');

  

  // DELEGATION 

  if(mapBox){
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations);
  }
  
 
if (loginForm) { 
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
*/