class SleepRepository {
  constructor(sleepDataSet) {
    this.sleepDataSet = sleepDataSet;
  }

  renderUserSleepData(userID) {
    const userSleepOccurrences = this.sleepDataSet.filter((user) => user.userID === userID);
    return userSleepOccurrences;
  }

  calcAvgHoursSlept(userID) {
    const userSleepOccurrences = this.renderUserSleepData(userID);
    const totalHoursSlept = userSleepOccurrences.reduce((accumulator, sleepOccurrence) => {
      return accumulator + sleepOccurrence.hoursSlept;
    }, 0);

    return Number((totalHoursSlept/userSleepOccurrences.length).toFixed(1));
  }

  calcAvgSleepQuality(userID) {
    const userSleepOccurrences = this.renderUserSleepData(userID);
    const totalSleepQuality = userSleepOccurrences.reduce((accumulator, sleepOccurrence) => {
      return accumulator + sleepOccurrence.sleepQuality;
    }, 0);

    return totalSleepQuality/userSleepOccurrences.length;
  }

  renderHoursSleptOnDate(userID, date) {
    const userSleepOccurrences = this.renderUserSleepData(userID);
    const sleepOccurrenceOnDate = userSleepOccurrences.find((sleepOccurrence) => {
        return sleepOccurrence.date === date;
    });
    return sleepOccurrenceOnDate.hoursSlept;
  }

  renderSleepQualityOnDate(userID, date) {
    const userSleepOccurrences = this.renderUserSleepData(userID);
    const sleepOccurrenceOnDate = userSleepOccurrences.find((sleepOccurrence) => {
        return sleepOccurrence.date === date;
    });
    return sleepOccurrenceOnDate.sleepQuality;
  }

  renderHoursSleptInDayRange(userID, days) {
    const userSleepOccurrences = this.renderUserSleepData(userID);
    const hoursSleptForChosenDays = userSleepOccurrences
      .filter((sleepOccurrence) => {
        return days.includes(sleepOccurrence.date);
      })
      .map((renderedSleepOccurance) => {
        return renderedSleepOccurance.hoursSlept;
      })
    return hoursSleptForChosenDays;
  }

}

export default SleepRepository;
