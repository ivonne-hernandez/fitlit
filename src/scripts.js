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
let sleepLatestDay = document.querySelector('#userHoursSleptLatestDay');
let sleepQualityLatestDay = document.querySelector('#userSleepQualityLatestDay');
let sleepLatestWeek = document.querySelector('#userHoursSleptLatestWeek');
let sleepQualityLatestWeek = document.querySelector('#userSleepQualityLatestWeek');
let userAllTimeAvgHoursSlept = document.querySelector('#userAllTimeAvgHoursSlept');
let userAllTimeAvgSleepQuality = document.querySelector('#userAllTimeAvgSleepQuality');
let hydrationToday = document.querySelector('#hydrationToday');
let hydrationLatestWeek = document.querySelector('#hydrationLatestWeek');
let chartSleepHoursForLatestWeek = document.querySelector('#chartSleepHoursForLatestWeek').getContext('2d');
let chartHydrationForLatestWeek = document.querySelector('#chartHydrationForLatestWeek').getContext('2d');
let chartAllTimeSleepStats = document.querySelector('#chartAllTimeSleepStats').getContext('2d');
//sleep toggle/dropdown
let sleepDateToggle = document.querySelector('#sleepDateToggle');
let sleepDropdown = document.querySelector('#sleepDropdown');
let sleepDropdownToday = document.querySelector('#sleepDropdownToday');
let sleepDropdownThisWeek = document.querySelector('#sleepDropdownThisWeek');
let sleepDropdownAllTime = document.querySelector('#sleepDropdownAllTime');
let sleepCardThisWeek = document.querySelector('#sleepCardThisWeek');
let sleepCardAllTime = document.querySelector('#sleepCardAllTime');
let sleepCardToday = document.querySelector('#sleepCardToday');
//hydration toggle/dropdown
let hydrationDropdown = document.querySelector('#hydrationDropdown');
let hydrationDateToggle = document.querySelector('#hydrationDateToggle');
let hydrationDropdownToday = document.querySelector('#hydrationDropdownToday');
let hydrationDropdownThisWeek = document.querySelector('#hydrationDropdownThisWeek');
let hydrationCardThisWeek = document.querySelector('#hydrationCardThisWeek');

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

//DOM display TEST functions => need to be carefully removed during refactor phase
const displayUserHoursSleptLatestDay = () => {
  sleepLatestDay.innerText = `Hours slept today: ${renderUserHoursSlept()}`;
}

const displayUserSleepQualityLatestDay = () => {
  sleepQualityLatestDay.innerText = `Sleep quality today: ${renderUserSleepQuality()}`;
}

const displayUserHoursSleptLatestWeek = () => {
  chartLatestWeekOfSleepStats(); //#2
}

// const displayUserSleepQualityLatestWeek = () => {
//   chartSleepQualityLatestWeek();
// }

const displayAllTimeUserSleepStats = () => {
  chartAllTimeUserSleepStats();
}

const displayAllTimeAvgSleepQuality = () => {
  userAllTimeAvgSleepQuality.innerText = `Average sleep quality (all-time): ${renderAllTimeAverageSleepQuality()}`;
}

const displayHydrationToday = () => {
  hydrationToday.innerText = `${renderUserHydrationToday()} ounces.`;
}

const displayHydrationLatestWeek = () => {
  chartHydrationLatestWeek();
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

// => these will need to be carefully removed during refactor phase and replaced with the chart functions where applicable
const displayUserSleepInfo = () => {
  displayUserHoursSleptLatestDay();
  displayUserSleepQualityLatestDay();
  displayUserHoursSleptLatestWeek();// #1 I created a chart for this one and invoked it in this function
  // displayUserSleepQualityLatestWeek();
  displayAllTimeUserSleepStats();
}

const displayUserHydrationInfo = () => {
  displayHydrationToday();
  displayHydrationLatestWeek();
}

// => these will need to be carefully removed during refactor phase since they are being replaced with the chartXInfo functions
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

const renderLastSleepEventDate = () => {
  let userSleepEvents = sleepRepository.renderUserSleepData(userId);
  const lastUserSleepEventDate = new Date (userSleepEvents[userSleepEvents.length - 1].date);
  return lastUserSleepEventDate;
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

const latestWeekOfSleepEvents = () => { //#3 we need the latest week's events for our chart
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


const chartLatestWeekOfSleepStats = () => { //#3.5 b/c it invokes the latestWeekOfSleepEvents on 243
  const latestWeekSleepEvents = latestWeekOfSleepEvents();
  new Chart(chartSleepHoursForLatestWeek, //our querySelector needs to be the arg for this Chart
    {
      type: 'bar',
      data: {
        labels: latestWeekSleepEvents.map(sleepEvent => sleepEvent.date),//map the date for each sleep event
        datasets: [{
          label: 'Sleep Quality',
          data: latestWeekSleepEvents.map(sleepEvent => sleepEvent.sleepQuality),
          backgroundColor: '#D7B4F3'
        },
        {
          label: 'Hours Slept',
          data: latestWeekSleepEvents.map(sleepEvent => sleepEvent.hoursSlept),//map the hours slept for each sleep event
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
  new Chart(chartAllTimeSleepStats, //our querySelector needs to be the arg for this Chart
    {
      type: 'bar',
      data: {
        labels: [`${startDate} - ${endDate}`],//map the date for each sleep event
        datasets: [{
          label: 'Avg Sleep Quality',
          data: [allTimeAvgSleepQuality],//map the hours slept for each sleep event
          backgroundColor: '#D7B4F3'
        },
        {
          label: 'Avg Hours Slept',
          data: [allTimeAvgHoursSlept],//map the hours slept for each sleep event
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
  new Chart(chartHydrationForLatestWeek,   {
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

//event handlers
function hideDropdown(event) {
  if(!(event.target === hydrationDateToggle) && !(event.target === sleepDateToggle)) {
    let dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach((dropdown) => {
      if(!dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
      }
    });
  }
}
function showDropdown(event) {
  if(event.target === hydrationDateToggle) {
    hydrationDropdown.classList.toggle('hidden');
  }
  if(event.target === sleepDateToggle) {
    sleepDropdown.classList.toggle('hidden');
  }
}

function renderSleepCard(event) {
  if(event.target === sleepDropdownToday) {
    sleepCardThisWeek.classList.add('hidden');
    sleepCardAllTime.classList.add('hidden');
    sleepCardToday.classList.remove('hidden');
    sleepDateToggle.innerText = "Today";
  }
  if(event.target === sleepDropdownThisWeek) {
    sleepCardToday.classList.add('hidden');
    sleepCardAllTime.classList.add('hidden');
    sleepCardThisWeek.classList.remove('hidden');
    sleepDateToggle.innerText = "This Week";
  }
  if(event.target === sleepDropdownAllTime) {
    sleepCardToday.classList.add('hidden');
    sleepCardThisWeek.classList.add('hidden');
    sleepCardAllTime.classList.remove('hidden');
    sleepDateToggle.innerText = "All Time";
  }
}

function renderHydrationCard(event) {
  if(event.target === hydrationDropdownToday) {
    hydrationCardThisWeek.classList.add('hidden');
    hydrationCardToday.classList.remove('hidden');
    hydrationDateToggle.innerText = "Today";
  }
  if(event.target === hydrationDropdownThisWeek) {
    hydrationCardToday.classList.add('hidden');
    hydrationCardThisWeek.classList.remove('hidden');
    hydrationDateToggle.innerText = "This Week";
  }
}
