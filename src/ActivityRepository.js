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

}


export default ActivityRepository;
