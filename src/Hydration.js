class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  calcAvgOuncesConsumed() {
    const avgOunces = this.hydrationData.reduce((accumulator, day) => {
      return accumulator + day.numOunces;
    }, 0);
    return Math.floor(avgOunces / this.hydrationData.length);
  }

  renderOuncesConsumedOnDate(date) {
    const givenDate = this.hydrationData.find((hydrationOccurance) => {
      return hydrationOccurance.date === date
    });
    return givenDate.numOunces;
  }

  renderOuncesConsumedInDayRange(days) {
    const ouncesForDays = this.hydrationData.filter((hydrationOccurance) => {
      return days.includes(hydrationOccurance.date);
    })
    .map((day) => {
      return day.numOunces;
    });
    return ouncesForDays;
  }
}

export default Hydration;
