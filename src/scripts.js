// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// An example of how you tell webpack to use a JS file
import domUpdates from './domUpdates';

import {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData
} from './apiCalls';

import UserRepository from './UserRepository';
import User from './User';
import SleepRepository from './SleepRepository';
import HydrationRepository from './HydrationRepository';
import Hydration from './Hydration';
import Activity from './Activity';
import ActivityRepository from './ActivityRepository';

let hydrationRepository;
let userHydrationData;
let userRepository;
let user;
let sleepRepository;
let activityRepository;
let userActivities;

let renderRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let userId = renderRandomIndex(1, 50);

const fetchAll = () => {
  const userDataPromise = fetchUserData();
  const sleepDataPromise = fetchSleepData();
  const hydrationDataPromise = fetchHydrationData();
  const activityDataPromise = fetchActivityData();
  Promise.all([userDataPromise, sleepDataPromise, hydrationDataPromise, activityDataPromise])
    .then(data => {
      parseAllData(data[0]);
      parseSleepData(data[1]);
      parseHydrationData(data[2]);
      parseActivityData(data[3]);
      domUpdates.displayUserInfo(user, sleepRepository, userId, userRepository);
      domUpdates.displayUserSleepInfo(sleepRepository, userId);
      domUpdates.displayUserHydrationInfo(hydrationRepository, userHydrationData);
      domUpdates.displayUserActivityInfo(activityRepository, userActivities);
    })
}

const parseAllData = (data) => {
  userRepository = new UserRepository(data.userData);
  user = new User(userRepository.renderUserData(userId));
}

const parseSleepData = (sleepData) => {
  sleepRepository = new SleepRepository(sleepData.sleepData);
}

const parseHydrationData = (hydrationData) => {
  hydrationRepository = new HydrationRepository(hydrationData.hydrationData);
  userHydrationData = new Hydration(hydrationRepository.renderUserData(userId));
}

const parseActivityData = (activityData) => {
  activityRepository = new ActivityRepository(activityData.activityData);
  userActivities = new Activity(activityRepository.getUserActivity(userId), user.strideLength, user.dailyStepGoal);
}

const addSleepData = () => {
  const newSleepEvent = {
    "userID": userId,
    "date": sleepDateInput.value,
    "hoursSlept": hoursSleptInput.value,
    "sleepQuality": sleepQualityInput.value
  }

  console.log(`newSleepEvent`, newSleepEvent);
}

const sleepSubmitButton = document.querySelector('#submitSleepData');
const sleepDateInput = document.querySelector('#addSleepDate');
const hoursSleptInput = document.querySelector('#addHoursSlept');
const sleepQualityInput = document.querySelector('#addSleepQuality');

window.addEventListener('load', fetchAll);
sleepSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();
  addSleepData();
});
//add event listener on submit buttons
//these will invoke a function that submits a POST request => shell function that calls the apiCalls method
//that function will go in our apiCalls
//parse the data it returns
//then call domUpdates method to update the dom

//when submit button is clicked we want to:
//#1 create an object with the data in the correct format
//we want to then invoke a POST request function that will take in our object as an arg
//use that arg for the body 
//