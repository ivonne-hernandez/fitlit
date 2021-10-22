class Hydration {
  constructor(userStats) {
    this.userStats = userStats;
  }
  getAvgOunces() {
    const avgOunces = this.userStats.reduce((accumulator, day) => {
      return accumulator + day.numOunces;
    }, 0);
    return Math.floor(avgOunces / this.userStats.length);
  }
}



// For a user (identified by their userID - this is the same for all methods requiring a specific user’s data), the average fluid ounces consumed per day for all time
// For a user, how many fluid ounces they consumed for a specific day (identified by a date)
// For a user, how many fluid ounces of water consumed each day over the course of a week (7 days) - return the amount for each day




export default Hydration;
