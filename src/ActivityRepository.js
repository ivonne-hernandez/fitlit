class ActivityRepository {
  constructor(activityData) {
    this.activityDataSet = activityData;
  }

  getUserActivity(userId) {
    const userActivityEvents = this.activityDataSet.filter((activityEvent) => {
      return activityEvent.userID === userId;
    })
    return userActivityEvents;
  }

  getAverageActivityOnDate(date, activityType) {
    let activityEventsOnDate = 0;
    const totalActivityTypeOnDate = this.activityDataSet
      .filter((activityEvent) => {
        if (activityEvent.date === date) {
          activityEventsOnDate += 1;
          return activityEvent;
        }
      })
      .reduce((acc, activityEvent) => {
        acc += activityEvent[activityType];
        return acc;
      }, 0);

    return Math.floor(totalActivityTypeOnDate / activityEventsOnDate);
  }
}


export default ActivityRepository;
