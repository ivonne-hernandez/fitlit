class Activity {
  constructor(userActivitiesData, strideLength) {
    this.userActivities = userActivitiesData;
    this.strideLength = strideLength;
  }

  getMilesWalked(date) {
    const activityOnDate = this.userActivities.find((userActivity) => {
      if (userActivity.date === date) {
        return userActivity;
      }

    });
    return Number((activityOnDate.numSteps * this.strideLength / 5280).toFixed(2));
  }


}




export default Activity;
