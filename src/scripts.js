// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// An example of how you tell webpack to use a JS file
import domUpdates from './domUpdates';

import {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData,
  postNewSleepEvent,
  postNewActivityEvent,
  postNewHydrationEvent
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
    .catch(error => showGetErrorMsg(error));
}

const showGetErrorMsg = (error) => {
  const errorDisplay = document.querySelector('#welcomeUser');
  errorDisplay.innerText = `Please check your network connection, ${error}`;
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
  const sleepDate = sleepDateInput.value.split('-').join('/');
  const newSleepEvent = {
    "userID": userId,
    "date": sleepDate,
    "hoursSlept": Number(hoursSleptInput.value),
    "sleepQuality":Number(sleepQualityInput.value)
  }
  return postNewSleepEvent(newSleepEvent)
    .then(data => console.log('response from sleep POST', data))
    .catch(error => showPostErrorMsg(error))
}

const addActivityData = () => {
  const activityDate = activityDateInput.value.split('-').join('/');
  const newActivityEvent = {
    "userID": userId,
    "date": activityDate,
    "numSteps": Number(stepsInput.value),
    "minutesActive": Number(minutesActiveInput.value),
    "flightsOfStairs": Number(stairsInput.value)
  }
  return postNewActivityEvent(newActivityEvent)
    .then(data => {
      console.log('response from activity POST', data);
    });
}

const addHydrationData = () => {
  const hydrationDate = hydrationDateInput.value.split('-').join('/');
  const newHydrationEvent = {
    "userID": userId,
    "date": hydrationDate,
    "numOunces": Number(ouncesInput.value)
  }
  return postNewHydrationEvent(newHydrationEvent)
    .then(data => {
      console.log('response from hydration POST', data);
    })
}

const sleepSubmitButton = document.querySelector('#submitSleepData');
const sleepDateInput = document.querySelector('#addSleepDate');
const hoursSleptInput = document.querySelector('#addHoursSlept');
const sleepQualityInput = document.querySelector('#addSleepQuality');

window.addEventListener('load', fetchAll);

sleepSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();
  addSleepData()
    .then(() => {
      return fetchSleepData();
    })
    .then(data => {
      parseSleepData(data);
      domUpdates.displayUserSleepInfo(sleepRepository, userId);
      domUpdates.hideSleepDataForm();
    })
});

const activitySubmitButton = document.querySelector('#submitActivityData');
const activityDateInput = document.querySelector('#addActivityDate');
const stepsInput = document.querySelector('#addDataSteps');
const stairsInput = document.querySelector('#addDataStairs');
const minutesActiveInput = document.querySelector('#addDataMinutes');

activitySubmitButton.addEventListener('click', (event) => {
  event.preventDefault();
  addActivityData()
    .then(() => {
      return fetchActivityData();
    })
    .then(data => {
      parseActivityData(data);
      domUpdates.displayUserActivityInfo(activityRepository, userActivities);
      domUpdates.hideActivityDataForm();
    })
});

const hydrationSubmitButton = document.querySelector('#submitHydrationData');
const hydrationDateInput = document.querySelector('#addHydrationDate');
const ouncesInput = document.querySelector('#addOzDrank');

hydrationSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();
  addHydrationData()
    .then(() => {
      return fetchHydrationData();
    })
    .then(data => {
      parseHydrationData(data);
      domUpdates.displayUserHydrationInfo(hydrationRepository, userHydrationData);
      domUpdates.hideHydrationDataForm();
    })
})
