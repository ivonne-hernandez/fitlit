class SleepRepository {
  constructor(sleepDataSet) {
    this.sleepDataSet = sleepDataSet;
  }

  renderUserSleepData(userID) {
    const userSleepEvents = this.sleepDataSet.filter((user) => user.userID === userID);
    return userSleepEvents;
  }

  calcAvgHoursSlept(userID) {
    const userSleepEvents = this.renderUserSleepData(userID);
    const totalHoursSlept = userSleepEvents.reduce((accumulator, sleepEvent) => {
      return accumulator + sleepEvent.hoursSlept;
    }, 0);

    return Number((totalHoursSlept/userSleepEvents.length).toFixed(1));
  }

  calcAvgSleepQuality(userID) {
    const userSleepEvents = this.renderUserSleepData(userID);
    const totalSleepQuality = userSleepEvents.reduce((accumulator, sleepEvent) => {
      return accumulator + sleepEvent.sleepQuality;
    }, 0);

    return totalSleepQuality/userSleepEvents.length;
  }

  renderHoursSleptOnDate(userID, date) {
    const userSleepEvents = this.renderUserSleepData(userID);
    const sleepEventOnDate = userSleepEvents.find((sleepEvent) => {
        return sleepEvent.date === date;
    });
    return sleepEventOnDate.hoursSlept;
  }

  renderSleepQualityOnDate(userID, date) {
    const userSleepEvents = this.renderUserSleepData(userID);
    const sleepEventOnDate = userSleepEvents.find((sleepEvent) => {
        return sleepEvent.date === date;
    });
    return sleepEventOnDate.sleepQuality;
  }

  renderHoursSleptInDayRange(userID, days) {
    const userSleepEvents = this.renderUserSleepData(userID);
    const hoursSleptForChosenDays = userSleepEvents
      .filter((sleepEvent) => {
        return days.includes(sleepEvent.date);
      })
      .map((renderedSleepEvent) => {
        return renderedSleepEvent.hoursSlept;
      });
    return hoursSleptForChosenDays;
  }

  renderSleepQualityInDayRange(userID, days) {
    const userSleepEvents = this.renderUserSleepData(userID);
    const sleepQualityForChosenDays = userSleepEvents
      .filter((sleepEvent) => {
        return days.includes(sleepEvent.date);
      })
      .map((renderedSleepEvent) => {
        return renderedSleepEvent.sleepQuality;
      });
    return sleepQualityForChosenDays;
  }

  renderSleepQualityByStartAndEndDate(userID, start, end) {
    const userSleepEvents = this.renderUserSleepData(userID);
    const startDate = new Date(start);
    const endDate = new Date(end);
    const sleepQualityForChosenDays = userSleepEvents
      .filter((sleepEvent) => {
        const sleepDate = new Date(sleepEvent.date);
        return startDate <= sleepDate && sleepDate <= endDate;
      })
      .map((renderedSleepEvent) => {
        return renderedSleepEvent.sleepQuality;
      });
    return sleepQualityForChosenDays;
  }

  calcAllUsersAvgSleepQuality () {
    const totalSleepQualityAllUsers = this.sleepDataSet.reduce((acc, sleepEvent) => {
      return acc += sleepEvent.sleepQuality;
    },0);
    return Number((totalSleepQualityAllUsers/this.sleepDataSet.length).toFixed(1));
  }
}

export default SleepRepository;
