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

activityInputForm.addEventListener("keyup", validateActivityInput)
hydrationInputForm.addEventListener("keyup", validateHydrationInput);
sleepInputForm.addEventListener("keyup", validateSleepInput);





let domUpdates = {

}




export default domUpdates;
