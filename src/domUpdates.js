import Chart from 'chart.js/auto';

// new querySelectors below
let activitySubmitButton = document.querySelector('#submitActivityData');
let activityDateInput = document.querySelector('#addActivityDate');
let activityStepsInput = document.querySelector('#addDataSteps');
let activityStairsInput = document.querySelector('#addDataStairs');
let activityMinutesInput = document.querySelector('#addDataMinutes');
let activityInputForm = document.querySelector('#activityInputForm');
let hydrationDateInput = document.querySelector('#addHydrationDate');
let ouncesInput = document.querySelector('#addOzDrank');
let hydrationSubmitButton = document.querySelector('#submitHydrationData');
let hydrationInputForm = document.querySelector('#hydrationInputForm');
let sleepDateInput = document.querySelector('#addSleepDate');
let hoursSleptInput = document.querySelector('#addHoursSlept');
let sleepQualityInput = document.querySelector('#addSleepQuality');
let sleepInputForm = document.querySelector('#sleepInputForm');
let sleepSubmitButton = document.querySelector('#submitSleepData');

//new form functions
const validateActivityInput = () => {
  if (activityDateInput.value && activityStepsInput.value && activityStairsInput.value && activityMinutesInput.value) {
    activitySubmitButton.disabled = false;
  } else {
    activitySubmitButton.disabled = true;
  }
}

const validateHydrationInput = () => {
  if (hydrationDateInput.value && ouncesInput.value) {
    hydrationSubmitButton.disabled = false;
  } else {
    hydrationSubmitButton.disabled = true;
  }
}

const validateSleepInput = () => {
  if (sleepDateInput.value && hoursSleptInput.value && sleepQualityInput.value) {
    sleepSubmitButton.disabled = false;
  } else {
    sleepSubmitButton.disabled = true;
  }
}
//new event listeners
activityInputForm.addEventListener("keyup", validateActivityInput)
hydrationInputForm.addEventListener("keyup", validateHydrationInput);
sleepInputForm.addEventListener("keyup", validateSleepInput);
//old event listeners 


//when submit button is clicked we want to:
//#1 create an object with the data in the correct format
//we want to then invoke a POST request function that will take in our object as an arg
//use that arg for the body 
//

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

  chartSleepToday(sleepRepository, userId) {
    const chartSleepHoursToday = document.querySelector('#chartSleepHoursToday').getContext('2d');
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
  }, 

  chartLatestWeekOfSleepStats(sleepRepository, userId) {
    const chartSleepHoursForLatestWeek = document.querySelector('#chartSleepHoursForLatestWeek').getContext('2d');
    const latestWeekSleepEvents = this.latestWeekOfSleepEvents(sleepRepository, userId);
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
  },

  chartAllTimeUserSleepStats(sleepRepository, userId) {
    const chartAllTimeSleepStats = document.querySelector('#chartAllTimeSleepStats').getContext('2d');
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
  },

  displayUserHydrationInfo(hydrationRepository, userHydrationData) {
    this.displayHydrationToday(userHydrationData);
    this.chartHydrationLatestWeek(userHydrationData);
  },

  renderUserHydrationToday(userHydrationData) {
    const lastUserHydrationDate = userHydrationData.hydrationData[userHydrationData.hydrationData.length - 1].date;
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

  chartHydrationLatestWeek(userHydrationData) {
    const chartHydrationForLatestWeek = document.querySelector('#chartHydrationForLatestWeek').getContext('2d');
    const latestWeekHydrationEvents = this.latestWeekOfHydrationEvents(userHydrationData);
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

  chartActivityTypeForLatestWeek(activityType, label, querySelector, userActivities) {
    const latestWeekActivityEvents = this.latestWeekOfActivityEvents(userActivities);

    new Chart(querySelector,
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


}


export default domUpdates;
