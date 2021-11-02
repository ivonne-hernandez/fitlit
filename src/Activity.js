import User from "./User";

class Activity {
  constructor(userActivitiesData, strideLength, stepGoal) {
    this.userActivities = userActivitiesData;
    this.strideLength = strideLength;
    this.dailyStepGoal = stepGoal;
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

  wasStepGoalReached(date) {
    const activityOnDate = this.userActivities.find((userActivity) => {
      if (userActivity.date === date) {
        return userActivity;
      }
    });

    if (activityOnDate.numSteps >= this.dailyStepGoal) {
      return true;
    } else {
      return false;
    }
  }

  getDaysThatExceededStepGoal() {
    const datesThatExceededStepGoal = this.userActivities
      .filter((userActivity) => {
        if (userActivity.numSteps > this.dailyStepGoal) {
          return userActivity;
        }
      })
      .map((resultingActivity) => {
        return resultingActivity.date;
      });

    return datesThatExceededStepGoal;
  }


}




export default Activity;
