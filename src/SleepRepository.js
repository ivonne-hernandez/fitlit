class SleepRepository {
  constructor(data){
    this.sleepData = data;
  }

  renderUserSleepData(userID){
    const userSleepData = this.sleepData.filter((user) => user.userID === userID);
    return userSleepData;
  }


  calculateAvgSleepPerDay(userID){
    
  }
}

export default SleepRepository;
