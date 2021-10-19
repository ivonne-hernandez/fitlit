class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
  }

  renderUserFirstName() {
    return this.name.split(' ')[0];
  }

  renderUserFriendNames() {
    const friendNames = this.friends.filter((friend) => {
      friend === this.friends.id 
    })
  }
}
export default User;
