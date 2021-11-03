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
import Activity from './Activity';
import ActivityRepository from './ActivityRepository';
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
let numberOfStepsToday = document.querySelector('#numberOfStepsToday');
let activeMinsToday = document.querySelector('#minutesToday');
let milesWalkedToday = document.querySelector('#distanceToday');
let stairsToday = document.querySelector('#stairsToday');
let stepsTodayForAvgUser = document.querySelector('#numberOfStepsTodayAvgUser');
let minutesActiveAvgUser = document.querySelector('#minutesActiveAvgUser');

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
      displayUserInfo();
      displayUserSleepInfo();
      displayUserHydrationInfo();
      displayUserActivityInfo();
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
  stepGoalComparison.innerHTML = `<b>Your step goal:</b> ${user.dailyStepGoal.toLocaleString()} compared to the average user step goal: ${userRepository.calculateAvgUserStepGoal().toLocaleString()}.`;
}

const displayHydrationToday = () => {
  hydrationToday.innerText = `${renderUserHydrationToday()} ounces.`;
}

const displayNumStepsToday = () => {
  numberOfStepsToday.innerHTML = `<b>Number of steps today:</b> ${userActivities.userActivities[userActivities.userActivities.length - 1].numSteps.toLocaleString()}`;
}

const displayNumStepsForAvgUser = () => {
  const todaysDate = activityRepository.activityDataSet[activityRepository.activityDataSet.length - 1].date;
  stepsTodayForAvgUser.innerHTML = `<b>Steps for average user:</b> ${activityRepository.getAverageActivityOnDate(todaysDate, "numSteps").toLocaleString()}`;
}

const displayStairsToday = () => {
  stairsToday.innerHTML = `<b>${userActivities.userActivities[userActivities.userActivities.length - 1].flightsOfStairs}</b> flights of stairs`;
}
const displayNumMinsActiveToday = () => {
  activeMinsToday.innerHTML = `<b>${userActivities.userActivities[userActivities.userActivities.length - 1].minutesActive}</b> active minutes`;
}

const displayMilesWalkedToday = () => {
  const todaysDate = userActivities.userActivities[userActivities.userActivities.length - 1].date;
  milesWalkedToday.innerHTML = `<b>${userActivities.getMilesWalked(todaysDate)}</b> miles`;
}

const displayMinsActiveAvgUser = () => {
  const todaysDate = activityRepository.activityDataSet[activityRepository.activityDataSet.length - 1].date;
  minutesActiveAvgUser.innerHTML = `<b>${activityRepository.getAverageActivityOnDate(todaysDate, "minutesActive")} minutes</b><br>Average user`; 
}

// How their number of steps, minutes active, and flights of stairs climbed compares to all users for the latest day


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

const displayUserActivityInfo = () => {
  console.log(`activityRepository`, activityRepository);
  console.log(`userActivities`, userActivities);
  displayNumStepsToday();
  displayNumStepsForAvgUser();
  displayNumMinsActiveToday();
  displayMilesWalkedToday();
  displayStairsToday();
  displayMinsActiveAvgUser();
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

//event handlers
function hideDropdown(event) {
  if (!(event.target === hydrationDateToggle) && !(event.target === sleepDateToggle)) {
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
}

function renderSleepCard(event) {
  if (event.target === sleepDropdownToday) {
    sleepCardThisWeek.classList.add('hidden');
    sleepCardAllTime.classList.add('hidden');
    sleepCardToday.classList.remove('hidden');
    sleepDateToggle.innerText = "Today";
  }
  if (event.target === sleepDropdownThisWeek) {
    sleepCardToday.classList.add('hidden');
    sleepCardAllTime.classList.add('hidden');
    sleepCardThisWeek.classList.remove('hidden');
    sleepDateToggle.innerText = "This Week";
  }
  if (event.target === sleepDropdownAllTime) {
    sleepCardToday.classList.add('hidden');
    sleepCardThisWeek.classList.add('hidden');
    sleepCardAllTime.classList.remove('hidden');
    sleepDateToggle.innerText = "All Time";
  }
}

function renderHydrationCard(event) {
  if (event.target === hydrationDropdownToday) {
    hydrationCardThisWeek.classList.add('hidden');
    hydrationCardToday.classList.remove('hidden');
    hydrationDateToggle.innerText = "Today";
  }
  if (event.target === hydrationDropdownThisWeek) {
    hydrationCardToday.classList.add('hidden');
    hydrationCardThisWeek.classList.remove('hidden');
    hydrationDateToggle.innerText = "This Week";
  }
}
