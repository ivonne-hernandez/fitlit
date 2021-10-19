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

// querySelectors

let welcomeUser = document.querySelector('#welcomeUser');
let userName = document.querySelector('#userName');
let addressInfo = document.querySelector('#addressInfo');
let userEmail = document.querySelector('#userEmail');
let userStrideLength = document.querySelector('#userStrideLength');
let userStepGoal = document.querySelector('#userStepGoal');
let userFriends = document.querySelector('#userFriends');

let userRepository = new UserRepository(userData);
let user = new User(userRepository.renderUserData(1));


// functions

const renderUserWelcomeMsg = () => {
  welcomeUser.innerText = `Welcome, ${user.renderUserFirstName()}!`;
}

const displayUserName = () => {
  userName.innerText = `${user.name}`;
}

const displayUserAddress = () => {
  addressInfo.innerText = `${user.address}`;
}
const displayUserEmail = () => {
  userEmail.innerText = `${user.email}`;
}

const displayUserStrideLength = () => {
  userStrideLength.innerText = `${user.strideLength}`;
}

const displayUserStepGoal = () => {
  userStepGoal.innerText = `${user.dailyStepGoal}`;
}

const displayUserFriends = () => {
  const userFriendNames = user.friends
  .map((friend) => {

    return userRepository.data[friend].name;
  })
  .forEach((friend) => {
    // console.log(friend)
    // console.log(friend.split(' ')[0])
    friend.split(' ')[0];
  })
  return userFriendNames;
  // console.log(userFriendNames)

//   const userFriendNames = user.friends.filter((friend) =>
//     // console.log(userRepository.data[friend].name)
//   friend === userRepository.data[friend].id;
// ).map(friend) => {
//   console.log(friend);
//   return friend.name
// })
//   // console.log(userFriendNames);
//   return userFriendNames;
//   userFriends.innerText = `${userRepository.data[friend].name}`;
}
// console.log(displayUserFriends())

const renderUserInfo = () => {
  renderUserWelcomeMsg();
  displayUserName();
  displayUserAddress();
  displayUserEmail();
  displayUserStrideLength();
  displayUserStepGoal();
  displayUserFriends();
}




// eventListeners
window.addEventListener('load', renderUserInfo);

// console.log(userRepository)
// console.log(user)
