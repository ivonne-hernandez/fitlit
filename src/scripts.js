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
import Chart from 'chart.js/auto';

// querySelectors
let welcomeUser = document.querySelector('#welcomeUser');
let todaysDate = document.querySelector('#navDate');
let userName = document.querySelector('#userName');
let addressInfo = document.querySelector('#addressInfo');
let userEmail = document.querySelector('#userEmail');
let userStrideLength = document.querySelector('#userStrideLength');
let userStepGoal = document.querySelector('#userStepGoal');
let userFriends = document.querySelector('#userFriends');
let stepGoalComparison = document.querySelector('#stepGoalComparison');
let hydrationToday = document.querySelector('#hydrationToday');
let chartSleepHoursForLatestWeek = document.querySelector('#chartSleepHoursForLatestWeek').getContext('2d');
let chartHydrationForLatestWeek = document.querySelector('#chartHydrationForLatestWeek').getContext('2d');
let chartAllTimeSleepStats = document.querySelector('#chartAllTimeSleepStats').getContext('2d');
let chartSleepHoursToday = document.querySelector('#chartSleepHoursToday').getContext('2d');
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

let renderRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let userId = renderRandomIndex(1, 50);

const fetchAll = () => {
  const userDataPromise = fetchUserData();
  const sleepDataPromise = fetchSleepData();
  const hydrationDataPromise = fetchHydrationData();
  Promise.all([userDataPromise, sleepDataPromise, hydrationDataPromise])
    .then(data => {
      parseAllData(data[0]);
      parseSleepData(data[1]);
      parseHydrationData(data[2]);
      displayUserInfo();
      displayUserSleepInfo();
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

const displayUserWelcomeMsg = () => {
  welcomeUser.innerText = `Welcome, ${user.renderUserFirstName()}!`;
}

const displayTodaysDate = () => {
  todaysDate.innerText = `${renderLastSleepEventDate().toDateString()}`;
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

const displayHydrationToday = () => {
  hydrationToday.innerText = `${renderUserHydrationToday()} ounces.`;
}

// functions that will display elements on the DOM once all information has been fetched & parsed
const displayUserInfo = () => {
  displayUserWelcomeMsg();
  displayTodaysDate();
  displayUserName();
  displayUserAddress();
  displayUserEmail();
  displayUserStrideLength();
  displayUserStepGoal();
  displayUserFriends();
  displayStepGoalComparison();
}

const displayUserSleepInfo = () => {
  chartSleepToday();
  chartLatestWeekOfSleepStats();
  chartAllTimeUserSleepStats();
}

const displayUserHydrationInfo = () => {
  displayHydrationToday();
  chartHydrationLatestWeek();
}

const renderUserHydrationToday = () => {
  const lastUserHydrationDate = userHydrationData.hydrationData[userHydrationData.hydrationData.length - 1].date;
  return userHydrationData.renderOuncesConsumedOnDate(lastUserHydrationDate);
}

const renderLastSleepEventDate = () => {
  let userSleepEvents = sleepRepository.renderUserSleepData(userId);
  const lastUserSleepEventDate = new Date (userSleepEvents[userSleepEvents.length - 1].date);
  return lastUserSleepEventDate;
}

const latestWeekOfSleepEvents = () => {
  const userSleepEvents = sleepRepository.renderUserSleepData(userId);
  const endDate = new Date(userSleepEvents[userSleepEvents.length - 1].date);
  const startDate = new Date(userSleepEvents[userSleepEvents.length - 7].date);
  const latestWeekOfSleepEvents = userSleepEvents
    .filter((sleepEvent) => {
      const sleepDate = new Date(sleepEvent.date);
      return startDate <= sleepDate && sleepDate <= endDate;
    });
  return latestWeekOfSleepEvents;
}

const chartSleepToday = () => {
  const userSleepEvents = sleepRepository.renderUserSleepData(userId);
  const hoursSleptLatestDay = userSleepEvents[userSleepEvents.length - 1].hoursSlept;
  const sleepQualityLatestDay = userSleepEvents[userSleepEvents.length - 1].sleepQuality;
  const latestDayDate = userSleepEvents[userSleepEvents.length - 1].date;
  new Chart(chartSleepHoursToday, 
    {
      type: 'bar',
      data: {
        labels: [latestDayDate],
        datasets: [{
          label: 'Sleep Quality',
          data: [sleepQualityLatestDay],
          backgroundColor: '#D7b4F3'
        },
        {
          label: 'Hours Slept',
          data: [hoursSleptLatestDay],
          backgroundColor: 'purple',
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
            ticks: {
              min: 0
            }
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        }
      }
    }
  );
}

const chartLatestWeekOfSleepStats = () => { 
  const latestWeekSleepEvents = latestWeekOfSleepEvents();
  new Chart(chartSleepHoursForLatestWeek, 
    {
      type: 'bar',
      data: {
        labels: latestWeekSleepEvents.map(sleepEvent => sleepEvent.date),
        datasets: [{
          label: 'Sleep Quality',
          data: latestWeekSleepEvents.map(sleepEvent => sleepEvent.sleepQuality),
          backgroundColor: '#D7B4F3'
        },
        {
          label: 'Hours Slept',
          data: latestWeekSleepEvents.map(sleepEvent => sleepEvent.hoursSlept),
          backgroundColor: 'purple'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        }
      }
    }
  );
}

const chartAllTimeUserSleepStats = () => {
  const userSleepEvents = sleepRepository.renderUserSleepData(userId);
  const endDate = userSleepEvents[userSleepEvents.length - 1].date;
  const startDate = userSleepEvents[userSleepEvents.length - 7].date;
  const allTimeAvgSleepQuality = sleepRepository.calcAvgSleepQuality(userId);
  const allTimeAvgHoursSlept = sleepRepository.calcAvgHoursSlept(userId);
  new Chart(chartAllTimeSleepStats,
    {
      type: 'bar',
      data: {
        labels: [`${startDate} - ${endDate}`],
        datasets: [{
          label: 'Avg Sleep Quality',
          data: [allTimeAvgSleepQuality],
          backgroundColor: '#D7B4F3'
        },
        {
          label: 'Avg Hours Slept',
          data: [allTimeAvgHoursSlept],
          backgroundColor: 'purple'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        }
      }
    }
  );
}

const latestWeekOfHydrationEvents = () => {
  const endDate = new Date(userHydrationData.hydrationData[userHydrationData.hydrationData.length - 1].date);
  const startDate = new Date(userHydrationData.hydrationData[userHydrationData.hydrationData.length - 7].date);
  const latestWeekOfHydrationEvents = userHydrationData.hydrationData
    .filter((hydrationEvent) => {
      const hydrationDate = new Date(hydrationEvent.date);
      return startDate <= hydrationDate && hydrationDate <= endDate;
    });
  return latestWeekOfHydrationEvents;
}

const chartHydrationLatestWeek = () => {
  const latestWeekHydrationEvents = latestWeekOfHydrationEvents();
  new Chart(chartHydrationForLatestWeek,   
    {
      type: 'bar',
      data: {
        labels: latestWeekHydrationEvents.map(hydrationEvent => hydrationEvent.date),
        datasets: [{
          label: 'Fluid Ounces',
          data: latestWeekHydrationEvents.map(hydrationEvent => hydrationEvent.numOunces),
          backgroundColor: 'blue'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  );
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
