
import Chart from 'chart.js/auto';

let domUpdates = {
  displayUserInfo(user, sleepRepository, userId, userRepository) {
    this.displayUserWelcomeMsg(user);
    this.displayTodaysDate(sleepRepository, userId);
    this.displayUserName(user);
    this.displayUserAddress(user);
    this.displayUserEmail(user);
    this.displayUserStrideLength(user);
    this.displayUserStepGoal(user);
    this.displayUserFriends(userRepository, user);
    this.displayStepGoalComparison(userRepository, user);
  },

  displayUserWelcomeMsg(user) {
    const welcomeUser = document.querySelector('#welcomeUser');
    welcomeUser.innerText = `Welcome, ${user.renderUserFirstName()}!`;
  },

  displayTodaysDate(sleepRepository, userId) {
    const todaysDate = document.querySelector('#navDate');
    todaysDate.innerText = `${this.renderLastSleepEventDate(sleepRepository, userId).toDateString()}`;
  },

  displayUserName(user) {
    const userName = document.querySelector('#userName');
    userName.innerText = `${user.name}`;
  },

  displayUserAddress(user) {
    const addressInfo = document.querySelector('#addressInfo');
    addressInfo.innerText = `${user.address}`;
  },

  displayUserEmail(user) {
    const userEmail = document.querySelector('#userEmail');
    userEmail.innerText = `${user.email}`;
  },

  displayUserStrideLength(user) {
    const userStrideLength = document.querySelector('#userStrideLength');
    userStrideLength.innerText = `${user.strideLength}`;
  },

  displayUserStepGoal(user) {
    const userStepGoal = document.querySelector('#userStepGoal');
    userStepGoal.innerText = `${user.dailyStepGoal}`;
  },

  displayUserFriends(userRepository, user) {
    let userFriends = document.querySelector('#userFriends');
    const friends = userRepository.getUsersByIds(user.friends);
    const friendNames = friends.map((friend) => {
      return friend.name;
    });
    userFriends.innerText = `${friendNames.join(', ')}`;
  },

  displayStepGoalComparison(userRepository, user) {
    const stepGoalComparison = document.querySelector('#stepGoalComparison');
    stepGoalComparison.innerHTML = `<b>Your step goal:</b> ${user.dailyStepGoal.toLocaleString()} compared to the average user step goal: ${userRepository.calculateAvgUserStepGoal().toLocaleString()}.`;
  },

  renderLastSleepEventDate(sleepRepository, userId) {
    let userSleepEvents = sleepRepository.renderUserSleepData(userId);
    const lastUserSleepEventDate = new Date(userSleepEvents[userSleepEvents.length - 1].date);
    return lastUserSleepEventDate;
  },

  displayUserSleepInfo(sleepRepository, userId) {
    this.chartSleepToday(sleepRepository, userId);
    this.chartLatestWeekOfSleepStats(sleepRepository, userId);
    this.chartAllTimeUserSleepStats(sleepRepository, userId);
  },

  hideSleepDataForm() {
    document.querySelector('.add-data-form-sleep').classList.add('hidden');
  },

  hideActivityDataForm() {
    document.querySelector('#activityFormContainer').classList.add('hidden');
  },

  latestWeekOfSleepEvents(sleepRepository, userId) {
    const userSleepEvents = sleepRepository.renderUserSleepData(userId);
    const endDate = new Date(userSleepEvents[userSleepEvents.length - 1].date);
    const startDate = new Date(userSleepEvents[userSleepEvents.length - 7].date);
    const latestWeekOfSleepEvents = userSleepEvents
      .filter((sleepEvent) => {
        const sleepDate = new Date(sleepEvent.date);
        return startDate <= sleepDate && sleepDate <= endDate;
      });
    return latestWeekOfSleepEvents;
  },
  sleepTodayChart: null,
  sleepLatestWeekChart: null,
  sleepAllTimeChart: null,

  chartSleepToday(sleepRepository, userId) {
    if (this.sleepTodayChart) {
      this.sleepTodayChart.destroy();
    }
    const chartSleepHoursToday = document.querySelector('#chartSleepHoursToday').getContext('2d');
    const userSleepEvents = sleepRepository.renderUserSleepData(userId);
    const hoursSleptLatestDay = userSleepEvents[userSleepEvents.length - 1].hoursSlept;
    const sleepQualityLatestDay = userSleepEvents[userSleepEvents.length - 1].sleepQuality;
    const latestDayDate = userSleepEvents[userSleepEvents.length - 1].date;
    this.sleepTodayChart = new Chart(chartSleepHoursToday,
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
  },

  chartLatestWeekOfSleepStats(sleepRepository, userId) {
    if (this.sleepLatestWeekChart) {
      this.sleepLatestWeekChart.destroy();
    }
    const chartSleepHoursForLatestWeek = document.querySelector('#chartSleepHoursForLatestWeek').getContext('2d');
    const latestWeekSleepEvents = this.latestWeekOfSleepEvents(sleepRepository, userId);
    this.sleepLatestWeekChart = new Chart(chartSleepHoursForLatestWeek,
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
  },

  chartAllTimeUserSleepStats(sleepRepository, userId) {
    if (this.sleepAllTimeChart) {
      this.sleepAllTimeChart.destroy();
    }
    const chartAllTimeSleepStats = document.querySelector('#chartAllTimeSleepStats').getContext('2d');
    const userSleepEvents = sleepRepository.renderUserSleepData(userId);
    const endDate = userSleepEvents[userSleepEvents.length - 1].date;
    const startDate = userSleepEvents[userSleepEvents.length - 7].date;
    const allTimeAvgSleepQuality = sleepRepository.calcAvgSleepQuality(userId);
    const allTimeAvgHoursSlept = sleepRepository.calcAvgHoursSlept(userId);
    this.sleepAllTimeChart = new Chart(chartAllTimeSleepStats,
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
  },

  displayUserHydrationInfo(hydrationRepository, userHydrationData) {
    this.displayHydrationToday(userHydrationData);
    this.chartHydrationLatestWeek(userHydrationData);
    this.validateHydrationInput();
  },

  renderUserHydrationToday(userHydrationData) {
    console.log('userHydrationData.hydrationData', userHydrationData.hydrationData)
    const lastUserHydrationDate = userHydrationData.hydrationData[userHydrationData.hydrationData.length - 1].date;
    console.log('lastUserHydrationDate', lastUserHydrationDate)
    return userHydrationData.renderOuncesConsumedOnDate(lastUserHydrationDate);
  },

  displayHydrationToday(userHydrationData) {
    const hydrationToday = document.querySelector('#hydrationToday');
    hydrationToday.innerText = `${this.renderUserHydrationToday(userHydrationData)} ounces.`;
  },

  latestWeekOfHydrationEvents(userHydrationData) {
    const endDate = new Date(userHydrationData.hydrationData[userHydrationData.hydrationData.length - 1].date);
    const startDate = new Date(userHydrationData.hydrationData[userHydrationData.hydrationData.length - 7].date);
    const latestWeekOfHydrationEvents = userHydrationData.hydrationData
      .filter((hydrationEvent) => {
        const hydrationDate = new Date(hydrationEvent.date);
        return startDate <= hydrationDate && hydrationDate <= endDate;
      });
    return latestWeekOfHydrationEvents;
  },

  chartHydrationWeek: null,

  chartHydrationLatestWeek(userHydrationData) {
    if (this.chartHydrationWeek) {
      this.chartHydrationWeek.destroy();
    }
    const chartHydrationForLatestWeek = document.querySelector('#chartHydrationForLatestWeek').getContext('2d');
    const latestWeekHydrationEvents = this.latestWeekOfHydrationEvents(userHydrationData);
    this.chartHydrationWeek = new Chart(chartHydrationForLatestWeek,
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
  },

  displayUserActivityInfo(activityRepository, userActivities) {
    const chartLatestWeekOfSteps = document.querySelector('#chartStepsForLatestWeek');
    const chartStairsClimbedForLatestWeek = document.querySelector('#chartStairsForLatestWeek');
    const chartActiveMinsForLatestWeek = document.querySelector('#chartActiveMinsForLatestWeek');

    this.displayNumStepsToday(userActivities);
    this.displayNumStepsForAvgUser(activityRepository);
    this.displayNumMinsActiveToday(userActivities);
    this.displayMilesWalkedToday(userActivities);
    this.displayStairsToday(userActivities);
    this.displayMinsActiveAvgUser(activityRepository);
    this.displayStairFlightAvgUser(activityRepository);
    this.latestWeekOfActivityEvents(userActivities);
    this.chartActivityTypeForLatestWeek("numSteps", "Step Count", chartLatestWeekOfSteps, userActivities);
    this.chartActivityTypeForLatestWeek("flightsOfStairs", "Stairs Climbed", chartStairsClimbedForLatestWeek, userActivities);
    this.chartActivityTypeForLatestWeek("minutesActive", "Active Minutes", chartActiveMinsForLatestWeek, userActivities);
    this.validateActivityInput();
  },

  displayNumStepsToday(userActivities) {
    const numberOfStepsToday = document.querySelector('#numberOfStepsToday');
    numberOfStepsToday.innerHTML = `<b>Number of steps today:</b> ${userActivities.userActivities[userActivities.userActivities.length - 1].numSteps.toLocaleString()}`;
  },

  displayNumStepsForAvgUser(activityRepository) {
    const stepsTodayForAvgUser = document.querySelector('#numberOfStepsTodayAvgUser');
    const todaysDate = activityRepository.activityDataSet[activityRepository.activityDataSet.length - 1].date;
    stepsTodayForAvgUser.innerHTML = `<b>Steps for average user:</b> ${activityRepository.getAverageActivityOnDate(todaysDate, "numSteps").toLocaleString()}`;
  },

  displayNumMinsActiveToday(userActivities) {
    const activeMinsToday = document.querySelector('#minutesToday');
    activeMinsToday.innerHTML = `<b>${userActivities.userActivities[userActivities.userActivities.length - 1].minutesActive}</b> active minutes`;
  },

  displayMilesWalkedToday(userActivities) {
    const milesWalkedToday = document.querySelector('#distanceToday');
    const todaysDate = userActivities.userActivities[userActivities.userActivities.length - 1].date;
    milesWalkedToday.innerHTML = `<b>${userActivities.getMilesWalked(todaysDate)}</b> miles`;
  },

  displayStairsToday(userActivities) {
    const stairsToday = document.querySelector('#stairsToday');
    stairsToday.innerHTML = `<b>${userActivities.userActivities[userActivities.userActivities.length - 1].flightsOfStairs}</b> flights of stairs`;
  },

  displayMinsActiveAvgUser(activityRepository) {
    const minutesActiveAvgUser = document.querySelector('#minutesActiveAvgUser');
    const todaysDate = activityRepository.activityDataSet[activityRepository.activityDataSet.length - 1].date;
    minutesActiveAvgUser.innerHTML = `<b>${activityRepository.getAverageActivityOnDate(todaysDate, "minutesActive")} minutes</b><br>Average user`;
  },

  displayStairFlightAvgUser(activityRepository) {
    const stairsForAvgUser = document.querySelector('#stairsAvgUser');
    const todaysDate = activityRepository.activityDataSet[activityRepository.activityDataSet.length - 1].date;
    stairsForAvgUser.innerHTML = `<b>${activityRepository.getAverageActivityOnDate(todaysDate, "flightsOfStairs")} flights</b><br>Average user`;
  },

  latestWeekOfActivityEvents(userActivities) {
    const endDate = new Date(userActivities.userActivities[userActivities.userActivities.length - 1].date);
    const startDate = new Date(userActivities.userActivities[userActivities.userActivities.length - 7].date);
    const latestWeekOfActivityEvents = userActivities.userActivities
      .filter((activityEvent) => {
        const activityDate = new Date(activityEvent.date);
        return startDate <= activityDate && activityDate <= endDate;
      });
    return latestWeekOfActivityEvents;
  },

  activityCharts: {},

  chartActivityTypeForLatestWeek(activityType, label, querySelector, userActivities) {
    const latestWeekActivityEvents = this.latestWeekOfActivityEvents(userActivities);
    if (this.activityCharts[activityType]) {
      this.activityCharts[activityType].destroy();
    }

    this.activityCharts[activityType] = new Chart(querySelector,
      {
        type: 'bar',
        data: {
          labels: latestWeekActivityEvents.map(activityEvent => activityEvent.date),
          datasets: [{
            label: label,
            data: latestWeekActivityEvents.map(activityEvent => activityEvent[activityType]),
            backgroundColor: 'red'
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
  },

  hideDropdown(event) {
    const hydrationDateToggle = document.querySelector('#hydrationDateToggle');
    const sleepDateToggle = document.querySelector('#sleepDateToggle');
    const activityDateToggle = document.querySelector('#activityDateToggle');

    if (!(event.target === hydrationDateToggle) && !(event.target === sleepDateToggle) && !(event.target === activityDateToggle) ) {
      let dropdowns = document.querySelectorAll('.dropdown-content');
      dropdowns.forEach((dropdown) => {
        if (!dropdown.classList.contains('hidden')) {
          dropdown.classList.add('hidden');
        }
      });
    }
  },

  showDropdown(event) {
    const hydrationDateToggle = document.querySelector('#hydrationDateToggle');
    const sleepDateToggle = document.querySelector('#sleepDateToggle');
    const activityDateToggle = document.querySelector('#activityDateToggle');
    const hydrationDropdown = document.querySelector('#hydrationDropdown');
    const sleepDropdown = document.querySelector('#sleepDropdown');
    const activityDropdown = document.querySelector('#activityDropdown');

    if (event.target === hydrationDateToggle) {
      hydrationDropdown.classList.toggle('hidden');
    }
    if (event.target === sleepDateToggle) {
      sleepDropdown.classList.toggle('hidden');
    }
    if (event.target === activityDateToggle) {
      activityDropdown.classList.toggle('hidden');
    }
  },

  renderSleepCard(event) {
    const sleepDropdownToday = document.querySelector('#sleepDropdownToday');
    const sleepDropdownThisWeek = document.querySelector('#sleepDropdownThisWeek');
    const sleepDropdownAllTime = document.querySelector('#sleepDropdownAllTime');
    const sleepCardThisWeek = document.querySelector('#sleepCardThisWeek');
    const sleepCardAllTime = document.querySelector('#sleepCardAllTime');
    const sleepCardToday = document.querySelector('#sleepCardToday');
    const sleepDateToggle = document.querySelector('#sleepDateToggle');

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
  },

  renderHydrationCard(event) {
    const hydrationDropdownToday = document.querySelector('#hydrationDropdownToday');
    const hydrationDropdownThisWeek = document.querySelector('#hydrationDropdownThisWeek');
    const hydrationCardThisWeek = document.querySelector('#hydrationCardThisWeek');
    const hydrationCardToday = document.querySelector('#hydrationCardToday');
    const hydrationDateToggle = document.querySelector('#hydrationDateToggle');
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
  },

  renderActivityCard(event) {
    const activityDropdownToday = document.querySelector('#activityDropdownToday');
    const activityDropdownThisWeek = document.querySelector('#activityDropdownThisWeek');
    const activityCardsToday = document.querySelector('#activityCardsToday');
    const activityCardsThisWeek = document.querySelector('#activityCardsThisWeek');
    const activityDateToggle = document.querySelector('#activityDateToggle');

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
  },

  validateActivityInput() {
    const activitySubmitButton = document.querySelector('#submitActivityData');
    const activityDateInput = document.querySelector('#addActivityDate');
    const activityStepsInput = document.querySelector('#addDataSteps');
    const activityStairsInput = document.querySelector('#addDataStairs');
    const activityMinutesInput = document.querySelector('#addDataMinutes');

    if (activityStepsInput.value && activityStairsInput.value && activityMinutesInput.value) {
      activitySubmitButton.disabled = false;
    } else {
      activitySubmitButton.disabled = true;
    }
  },

  validateHydrationInput() {
    const hydrationDateInput = document.querySelector('#addHydrationDate');
    const ouncesInput = document.querySelector('#addOzDrank');
    const hydrationSubmitButton = document.querySelector('#submitHydrationData');

    if (hydrationDateInput.value && ouncesInput.value) {
      hydrationSubmitButton.disabled = false;
    } else {
      hydrationSubmitButton.disabled = true;
    }
  },

  validateSleepInput() {
    const sleepSubmitButton = document.querySelector('#submitSleepData');
    if (this.isValidHoursSlept() && this.isValidSleepQuality()) {
      sleepSubmitButton.disabled = false;
    } else {
      sleepSubmitButton.disabled = true;
    }
  },

  isValidHoursSlept() {
    const hoursSleptInput = document.querySelector('#addHoursSlept');
    if (Number(hoursSleptInput.value) <= 48) {
      return true;
    } else {
      return false;
    }
  },

  isValidSleepQuality() {
    const sleepQualityInput = document.querySelector('#addSleepQuality');
    if (Number(sleepQualityInput.value) <= 5) {
      return true;
    } else {
      return false;
    }
  },

  hideHydrationDataForm() {
    const hydrationFormContainer = document.querySelector('#hydrationFormContainer');
    hydrationFormContainer.classList.add('hidden');
  }



}

const hydrationDateToggle = document.querySelector('#hydrationDateToggle');
const hydrationDropdown = document.querySelector('#hydrationDropdown');
const sleepDateToggle = document.querySelector('#sleepDateToggle');
const sleepDropdown = document.querySelector('#sleepDropdown');
const activityDateToggle = document.querySelector('#activityDateToggle');
const activityDropdown = document.querySelector('#activityDropdown');
const activityInputForm = document.querySelector('#activityInputForm');
const hydrationInputForm = document.querySelector('#hydrationInputForm');
const sleepInputForm = document.querySelector('#sleepInputForm');

window.addEventListener('click', domUpdates.hideDropdown);
hydrationDateToggle.addEventListener('click', domUpdates.showDropdown);
hydrationDropdown.addEventListener('click', domUpdates.renderHydrationCard);
sleepDateToggle.addEventListener('click', domUpdates.showDropdown);
sleepDropdown.addEventListener('click', domUpdates.renderSleepCard);
activityDateToggle.addEventListener('click', domUpdates.showDropdown);
activityDropdown.addEventListener('click', domUpdates.renderActivityCard);

activityInputForm.addEventListener("keyup", function() {
  domUpdates.validateActivityInput();
});
hydrationInputForm.addEventListener("keyup", domUpdates.validateHydrationInput);
sleepInputForm.addEventListener("keyup", function() {
  domUpdates.validateSleepInput();
});

export default domUpdates;
