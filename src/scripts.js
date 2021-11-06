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


let sleepDateToggle = document.querySelector('#sleepDateToggle');
let sleepDropdown = document.querySelector('#sleepDropdown');
let sleepDropdownToday = document.querySelector('#sleepDropdownToday');
let sleepDropdownThisWeek = document.querySelector('#sleepDropdownThisWeek');
let sleepDropdownAllTime = document.querySelector('#sleepDropdownAllTime');
let sleepCardThisWeek = document.querySelector('#sleepCardThisWeek');
let sleepCardAllTime = document.querySelector('#sleepCardAllTime');
let sleepCardToday = document.querySelector('#sleepCardToday');
let hydrationDropdown = document.querySelector('#hydrationDropdown');
let hydrationDateToggle = document.querySelector('#hydrationDateToggle');
let hydrationDropdownToday = document.querySelector('#hydrationDropdownToday');
let hydrationDropdownThisWeek = document.querySelector('#hydrationDropdownThisWeek');
let hydrationCardThisWeek = document.querySelector('#hydrationCardThisWeek');
let hydrationCardToday = document.querySelector('#hydrationCardToday');
let activityDateToggle = document.querySelector('#activityDateToggle');
let activityCardsToday = document.querySelector('#activityCardsToday');
let activityCardsThisWeek = document.querySelector('#activityCardsThisWeek');
let activityDropdown = document.querySelector('#activityDropdown');
let activityDropdownToday = document.querySelector('#activityDropdownToday');
let activityDropdownThisWeek = document.querySelector('#activityDropdownThisWeek');

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





// eventListeners
window.addEventListener('load', fetchAll);
window.addEventListener('click', hideDropdown);
hydrationDateToggle.addEventListener('click', showDropdown);
hydrationDropdown.addEventListener('click', renderHydrationCard);
sleepDateToggle.addEventListener('click', showDropdown);
sleepDropdown.addEventListener('click', renderSleepCard);

activityDateToggle.addEventListener('click', showDropdown);
activityDropdown.addEventListener('click', renderActivityCard);

//event handlers
function hideDropdown(event) {
  if (!(event.target === hydrationDateToggle) && !(event.target === sleepDateToggle) && !(event.target === activityDateToggle) ) {
    let dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach((dropdown) => {
      if (!dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
      }
    });
  }
}

function showDropdown(event) {
  if (event.target === hydrationDateToggle) {
    hydrationDropdown.classList.toggle('hidden');
  }
  if (event.target === sleepDateToggle) {
    sleepDropdown.classList.toggle('hidden');
  }
  if (event.target === activityDateToggle) {
    activityDropdown.classList.toggle('hidden');
  }
}

function renderSleepCard(event) {
  if (event.target === sleepDropdownToday) {
    sleepCardThisWeek.classList.add('hidden');
    sleepCardAllTime.classList.add('hidden');
    sleepCardToday.classList.remove('hidden');
    sleepDateToggle.innerHTML = 'Today <i class="fas fa-chevron-down fa-sm"></i>';
  }
  if (event.target === sleepDropdownThisWeek) {
    sleepCardToday.classList.add('hidden');
    sleepCardAllTime.classList.add('hidden');
    sleepCardThisWeek.classList.remove('hidden');
    sleepDateToggle.innerHTML = 'This Week <i class="fas fa-chevron-down fa-sm"></i>';
  }
  if (event.target === sleepDropdownAllTime) {
    sleepCardToday.classList.add('hidden');
    sleepCardThisWeek.classList.add('hidden');
    sleepCardAllTime.classList.remove('hidden');
    sleepDateToggle.innerHTML = 'All Time <i class="fas fa-chevron-down fa-sm"></i>';
  }
}

function renderHydrationCard(event) {
  if (event.target === hydrationDropdownToday) {
    hydrationCardThisWeek.classList.add('hidden');
    hydrationCardToday.classList.remove('hidden');
    hydrationDateToggle.innerHTML = 'Today <i class="fas fa-chevron-down fa-sm"></i>';
  }
  if (event.target === hydrationDropdownThisWeek) {
    hydrationCardToday.classList.add('hidden');
    hydrationCardThisWeek.classList.remove('hidden');
    hydrationDateToggle.innerHTML = 'This Week <i class="fas fa-chevron-down fa-sm"></i>';
  }
}

function renderActivityCard(event) {
  if (event.target === activityDropdownToday) {
    activityCardsThisWeek.classList.add('hidden');
    activityCardsToday.classList.remove('hidden');
    activityDateToggle.innerHTML = 'Today <i class="fas fa-chevron-down fa-sm"></i>';
  }

  if (event.target === activityDropdownThisWeek) {
    activityCardsToday.classList.add('hidden');
    activityCardsThisWeek.classList.remove('hidden');
    activityDateToggle.innerHTML = 'This Week <i class="fas fa-chevron-down fa-sm"></i>';
  }
}
