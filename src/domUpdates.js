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

activityInputForm.addEventListener("keyup", validateActivityInput)
hydrationInputForm.addEventListener("keyup", validateHydrationInput);






let domUpdates = {

}




export default domUpdates;
