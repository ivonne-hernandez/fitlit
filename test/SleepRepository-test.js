import { expect } from 'chai';
import SleepRepository from '../src/SleepRepository.js';

describe('Sleep Repository', () => {
  let sleepData;
  let sleepRepository;
  let user1SleepData;
  let userId;
  let startDate;
  let endDate;

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
        },
        {
          "userID": 1,
          "date": "2019/06/17",
          "hoursSlept": 8,
          "sleepQuality": 2.6
        },
        {
          "userID": 1,
          "date": "2019/06/19",
          "hoursSlept": 10.7,
          "sleepQuality": 1.2
        },
        {
          "userID": 1,
          "date": "2019/06/20",
          "hoursSlept": 9.3,
          "sleepQuality": 1.2
        },
        {
          "userID": 1,
          "date": "2019/06/21",
          "hoursSlept": 7.8,
          "sleepQuality": 4.2
        },
        {
          "userID": 1,
          "date": "2019/06/22",
          "hoursSlept": 7,
          "sleepQuality": 3
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
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "hoursSlept": 8,
        "sleepQuality": 2.6
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "hoursSlept": 10.7,
        "sleepQuality": 1.2
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "hoursSlept": 9.3,
        "sleepQuality": 1.2
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "hoursSlept": 7.8,
        "sleepQuality": 4.2
      },
      {
        "userID": 1,
        "date": "2019/06/22",
        "hoursSlept": 7,
        "sleepQuality": 3
      }
    ];

    sleepRepository = new SleepRepository(sleepData);
    userId = 1;
    startDate = "2019/06/15";
    endDate = "2019/06/22";
  });

  it('should be a function', function () {
    expect(SleepRepository).to.be.a('function');
  });

  it('should be an instance of SleepRepository', function() {
    expect(sleepRepository).to.be.an.instanceOf(SleepRepository);
  });

  it('given a user ID, it should return the user\'s sleep data', function() {
   const result = sleepRepository.renderUserSleepData(userId);
   expect(userId).to.equal(1);
   expect(result).to.deep.equal(user1SleepData);
  });

  it('given a user ID, it should return the average number of hours slept per day', function() {
    const result = sleepRepository.calcAvgHoursSlept(userId);
    expect(userId).to.equal(1);
    expect(result).to.equal(7.6);
  });

  it('given a user ID, it should return the average sleep quality per day over all time', function() {
    const result = sleepRepository.calcAvgSleepQuality(userId);
    
    expect(userId).to.equal(1);
    expect(result).to.equal(2.6);
  });

  it('given a user ID and date, it should return how many hours a user slept on that date', function() {
    const result = sleepRepository.renderHoursSleptOnDate(userId, startDate);
    
    expect(userId).to.equal(1);
    expect(startDate).to.equal("2019/06/15");
    expect(result).to.equal(6.1);
  });

  it('given a user ID and date, it should return the user\'s sleep quality on that date', function() {
    const result = sleepRepository.renderSleepQualityOnDate(userId, startDate);
    
    expect(userId).to.equal(1);
    expect(startDate).to.equal("2019/06/15");
    expect(result).to.equal(2.2);
  });

  it('given a user ID, start & end date, it should return hours slept for each day', function() {
    const result = sleepRepository.renderHoursSleptByStartAndEndDate(userId, startDate, endDate);

    expect(userId).to.equal(1);
    expect(startDate).to.equal("2019/06/15");
    expect(endDate).to.equal("2019/06/22");
    expect(result).to.deep.equal([6.1, 4.1, 8, 10.7, 9.3, 7.8, 7])
  })

  it('given a user ID, start & end date, it should return the sleep quality for each day', function() {
    const result = sleepRepository.renderSleepQualityByStartAndEndDate(userId, startDate, endDate);

    expect(userId).to.equal(1);
    expect(startDate).to.equal("2019/06/15");
    expect(endDate).to.equal("2019/06/22");
    expect(result).to.deep.equal([2.2, 3.8, 2.6, 1.2, 1.2, 4.2, 3]);
  });

  it('should calculate average sleep quality for all users', function() {
    const result = sleepRepository.calcAllUsersAvgSleepQuality();
    expect(result).to.equal(3.1);
  })
});
