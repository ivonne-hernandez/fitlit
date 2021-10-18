class UserRepository {
  constructor(data) {
    this.data = data;
  }

  renderUserData(userId) {
    const userData = this.data.find((user) => user.id === userId);
    return userData;
  }

  calculateAvgUserStepGoal() {
    const totalUserSteps = this.data.reduce((accumulator, user) => {
      return accumulator += user.dailyStepGoal;
    }, 0);

    return Math.floor(totalUserSteps/this.data.length);
  }

}

export default UserRepository;
