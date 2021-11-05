let activitySubmitButton = document.querySelector('#submitActivityData');
let activityDateInput = document.querySelector('#addActivityDate');
let activityStepsInput = document.querySelector('#addDataSteps');
let activityStairsInput = document.querySelector('#addDataStairs');
let activityMinutesInput = document.querySelector('#addDataMinutes')



const validateUserInput = () => {
  if (activityDateInput.value && activityStepsInput.value && activityStairsInput.value && activityMinutesInput.value) {
    activitySubmitButton.disabled = false;
  }
}








let domUpdates = {

}




export default domUpdates;
