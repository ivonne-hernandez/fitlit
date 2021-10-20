class SleepRepository {
  constructor(data){
    this.sleepData = data;
  }

  renderUserSleepData(userID){
    const userSleepData = this.sleepData.filter((user) => user.userID === userID);
    return userSleepData;
  }


  calculateAvgSleepPerDay(userID){
    const userSleepData = this.renderUserSleepData(userID);
    const totalHoursSlept = userSleepData.reduce((accumulator, user) => {
      return accumulator += user.hoursSlept;
    }, 0);

    return totalHoursSlept/userSleepData.length;
  }
}

export default SleepRepository;
