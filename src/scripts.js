// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// An example of how you tell webpack to use a JS file

//import userData from './data/users';
import {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData
} from './apiCalls';

//we'll need to import our apiCalls.js functions here (?) and get rid of userData import
import UserRepository from './UserRepository';
import User from './User';
import SleepRepository from './SleepRepository';
import HydrationRepository from './HydrationRepository';
import Hydration from './Hydration';

// querySelectors

let welcomeUser = document.querySelector('#welcomeUser');
let userName = document.querySelector('#userName');
let addressInfo = document.querySelector('#addressInfo');
let userEmail = document.querySelector('#userEmail');
let userStrideLength = document.querySelector('#userStrideLength');
let userStepGoal = document.querySelector('#userStepGoal');
let userFriends = document.querySelector('#userFriends');
let stepGoalComparison = document.querySelector('#stepGoalComparison');
let sleepLatestDay = document.querySelector('#userHoursSleptLatestDay');
let sleepQualityLatestDay = document.querySelector('#userSleepQualityLatestDay');
let sleepLatestWeek = document.querySelector('#userHoursSleptLatestWeek');
let sleepQualityLatestWeek = document.querySelector('#userSleepQualityLatestWeek');
let userAllTimeAvgHoursSlept = document.querySelector('#userAllTimeAvgHoursSlept');
let userAllTimeAvgSleepQuality = document.querySelector('#userAllTimeAvgSleepQuality');
let hydrationToday = document.querySelector('#hydrationToday');
let hydrationLatestWeek = document.querySelector('#hydrationLatestWeek');

let hydrationRepository;
let userHydrationData;
let userRepository;
let user;
let sleepRepository;

let renderRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let userId = renderRandomIndex(1, 50);

const fetchAll = () => {
  fetchUserData()
    .then(data => {
      parseAllData(data);
      displayUserInfo();
    });
  fetchSleepData()
    .then(sleepData => {
      parseSleepData(sleepData);
      displayUserSleepInfo();
    });
    fetchHydrationData()
    .then(hydrationData => {
      parseHydrationData(hydrationData);
      displayUserHydrationInfo();
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

// functions

const displayUserWelcomeMsg = () => {
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
  const friends = userRepository.getUsersByIds(user.friends);
  const friendNames = friends.map((friend) => {
    return friend.name;
  });
  userFriends.innerText = `${friendNames.join(', ')}`;
}

const displayStepGoalComparison = () => {
  stepGoalComparison.innerText = `Your step goal: ${user.dailyStepGoal} compared to the average user step goal: ${userRepository.calculateAvgUserStepGoal()}.`;
}

const displayUserHoursSleptLatestDay = () => {
  userHoursSleptLatestDay.innerText = `Hours slept today: ${renderUserHoursSlept()}`;
}

const displayUserSleepQualityLatestDay = () => {
  userSleepQualityLatestDay.innerText = `Sleep quality today: ${renderUserSleepQuality()}`;
}

const displayUserHoursSleptLatestWeek = () => {
  userHoursSleptLatestWeek.innerText = `Hours slept this week: ${renderHoursSleptLatestWeek()}`;
}

const displayUserSleepQualityLatestWeek = () => {
  userSleepQualityLatestWeek.innerText = `Sleep quality this week: ${renderSleepQualityLatestWeek()}`;
}

const displayAllTimeAvgHoursSlept = () => {
  userAllTimeAvgHoursSlept.innerText = `Average hours slept (all-time): ${renderAllTimeAverageHoursSlept()}`;
}

const displayAllTimeAvgSleepQuality = () => {
  userAllTimeAvgSleepQuality.innerText = `Average sleep quality (all-time): ${renderAllTimeAverageSleepQuality()}`;
}

const displayHydrationToday = () => {
  hydrationToday.innerText = `${renderUserHydrationToday()} ounces.`;
}

const displayHydrationLatestWeek = () => {
  hydrationLatestWeek.innerText = `${renderUserHydrationLatestWeek()} ounces.`;
}

const displayUserInfo = () => {
  displayUserWelcomeMsg();
  displayUserName();
  displayUserAddress();
  displayUserEmail();
  displayUserStrideLength();
  displayUserStepGoal();
  displayUserFriends();
  displayStepGoalComparison();
}

const displayUserSleepInfo = () => {
  displayUserHoursSleptLatestDay();
  displayUserSleepQualityLatestDay();
  displayUserHoursSleptLatestWeek();
  displayUserSleepQualityLatestWeek();
  displayAllTimeAvgHoursSlept();
  displayAllTimeAvgSleepQuality();
}

const displayUserHydrationInfo = () => {
  displayHydrationToday();
  displayHydrationLatestWeek();
}

const renderUserHydrationLatestWeek = () => {
  const endDate = userHydrationData.hydrationData[userHydrationData.hydrationData.length - 1].date;
  const startDate = userHydrationData.hydrationData[userHydrationData.hydrationData.length - 7].date;
  return userHydrationData.renderOuncesConsumedInDayRange(startDate, endDate);
}

const renderUserHydrationToday = () => {
  const lastUserHydrationDate = userHydrationData.hydrationData[userHydrationData.hydrationData.length - 1].date;
  return userHydrationData.renderOuncesConsumedOnDate(lastUserHydrationDate);
}

const renderUserHoursSlept = () => {
  const userSleepEvents = sleepRepository.renderUserSleepData(userId);
  const lastUserSleepEvent = userSleepEvents[userSleepEvents.length - 1].date;
  return sleepRepository.renderHoursSleptOnDate(userId, lastUserSleepEvent);
}

const renderUserSleepQuality = () => {
  const userSleepEvents = sleepRepository.renderUserSleepData(userId);
  const lastUserSleepEvent = userSleepEvents[userSleepEvents.length - 1].date;
  return sleepRepository.renderSleepQualityOnDate(userId, lastUserSleepEvent);
}

const renderHoursSleptLatestWeek = () => {
  const userSleepEvents = sleepRepository.renderUserSleepData(userId);
  const endDate = userSleepEvents[userSleepEvents.length - 1].date;
  const startDate = userSleepEvents[userSleepEvents.length - 7].date;
  return sleepRepository.renderHoursSleptByStartAndEndDate(userId, startDate, endDate);
}

const renderSleepQualityLatestWeek = () => {
  const userSleepEvents = sleepRepository.renderUserSleepData(userId);
  const endDate = userSleepEvents[userSleepEvents.length - 1].date;
  const startDate = userSleepEvents[userSleepEvents.length - 7].date;
  return sleepRepository.renderSleepQualityByStartAndEndDate(userId, startDate, endDate);
}

const renderAllTimeAverageHoursSlept = () => {
  return sleepRepository.calcAvgHoursSlept(userId);
}

const renderAllTimeAverageSleepQuality = () => {
  return sleepRepository.calcAvgSleepQuality(userId);
}



// eventListeners
window.addEventListener('load', fetchAll);
