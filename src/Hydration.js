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

  getOuncesByDay(day) {
    const givenDay = this.userStats.find((stat) => {
      return stat.date === day
    });
    return givenDay.numOunces;
  }

  getOuncesForRange(days) {
    const ouncesForDays = this.userStats.filter((stat) => {
      return days.includes(this.userStats.date);
    })
    .map((day) => {
      return day.numOunces;
    })
    return ouncesForDays;
  }
}
// const hoursSleptForChosenDays = userSleepOccurrences
//      .filter((sleepOccurrence) => {
//        return days.includes(sleepOccurrence.date);
//      })
//      .map((renderedSleepOccurance) => {
//        return renderedSleepOccurance.hoursSlept;
//      })
//    return hoursSleptForChosenDays;
//  }



// For a user (identified by their userID - this is the same for all methods requiring a specific user’s data), the average fluid ounces consumed per day for all time
// For a user, how many fluid ounces they consumed for a specific day (identified by a date)
// For a user, how many fluid ounces of water consumed each day over the course of a week (7 days) - return the amount for each day




export default Hydration;
