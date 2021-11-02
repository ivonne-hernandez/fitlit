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

  getMinutesActive(date) {
    const activityOnDate = this.userActivities.find((userActivity) => {
      if (userActivity.date === date) {
        return userActivity;
      }
    });
    return activityOnDate.minutesActive;
  }

  //For a user, how many minutes active did they average for a given week (7 days)?
  getAvgMinsActiveByStartAndEnd(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const totalActiveMinsForWk = this.userActivities
      .filter((activityEvent) => {
        const activityDate = new Date(activityEvent.date);
        return startDate <= activityDate && activityDate <= endDate;
      })
      .reduce((acc, renderedActivityEvent) => {
        return acc += renderedActivityEvent.minutesActive;
      }, 0);

    return Math.floor(totalActiveMinsForWk / 7);
  }
}




export default Activity;
