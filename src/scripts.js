// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// An example of how you tell webpack to use a JS file

import userData from './data/users';
import UserRepository from './UserRepository';
import User from './User';

let userRepository = new UserRepository(userData);
let user = new User(userRepository.renderUserData(1));

const 

console.log(userRepository)
console.log(user)
