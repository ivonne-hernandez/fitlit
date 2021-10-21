import { expect } from 'chai';
import SleepRepository from '../src/SleepRepository.js';

describe('Sleep Repository', () => {
  let sleepData;
  let sleepRepository;
  let user1SleepData;

  beforeEach(function() {
    sleepData = [
        {
          "userID": 1,
          "date": "2019/06/15",
          "hoursSlept": 6.1,
          "sleepQuality": 2.2
        },
        {
          "userID": 2,
          "date": "2019/06/15",
          "hoursSlept": 7,
          "sleepQuality": 4.7
        },
        {
          "userID": 3,
          "date": "2019/06/15",
          "hoursSlept": 10.8,
          "sleepQuality": 4.7
        },
        {
          "userID":1,
          "date":"2019/06/16",
          "hoursSlept":4.1,
          "sleepQuality":3.8
        }
      ];

    user1SleepData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 2.2
      },
      {
        "userID":1,
        "date":"2019/06/16",
        "hoursSlept":4.1,
        "sleepQuality":3.8
      }
    ];

    sleepRepository = new SleepRepository(sleepData);
  });

  it('should be a function', function () {
    expect(SleepRepository).to.be.a('function');
  });

  it('should be an instance of SleepRepository', function() {
    expect(sleepRepository).to.be.an.instanceOf(SleepRepository);
  });

  it('given a user ID, it should return the user\'s sleep data', function() {
   const result = sleepRepository.renderUserSleepData(1);
   expect(result).to.deep.equal(user1SleepData);
 });

 it('given a user ID, it should return the average number of hours slept per day', function() {
   const result = sleepRepository.calcAvgHoursSlept(1);
   expect(result).to.equal(5.1);
 });

 it('given a user ID, it should return the average sleep quality per day over all time', function() {
  const result = sleepRepository.calcAvgSleepQuality(1);
  expect(result).to.equal(3);
})

it('given a user ID and date, it should return how many hours a user slept on a specific day', function() {
  const result = sleepRepository.calcHoursSleptOnDate("2019/06/16", 1);
  expect(result).to.equal(4.1);
})

it('given a user ID and date, it should return a user sleep quality on a specific day', function() {
  const result = sleepRepository.calcSleepQualityOnDate("2019/06/16", 1);
  expect(result).to.equal(3.8);
})

it('given a user ID, it should calculate hours slept each day over the course of a given week', function() {
  const result = sleepRepository.calcHoursSleptInDayRange(["2019/06/15", "2019/06/16"], 1);
  expect(result).to.deep.equal([6.1, 4.1])
})

});
