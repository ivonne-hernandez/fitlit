let activitySubmitButton = document.querySelector('#submitActivityData');
let activityDateInput = document.querySelector('#addActivityDate');
let activityStepsInput = document.querySelector('#addDataSteps');
let activityStairsInput = document.querySelector('#addDataStairs');
let activityMinutesInput = document.querySelector('#addDataMinutes')
let activityInputForm = document.querySelector('#activityInputForm')


const validateUserInput = () => {
  if (activityDateInput.value && activityStepsInput.value && activityStairsInput.value && activityMinutesInput.value) {
    activitySubmitButton.disabled = false;
  } else {
    activitySubmitButton.disabled = true;
  }
}

activityInputForm.addEventListener("keyup", validateUserInput)







let domUpdates = {

}




export default domUpdates;
