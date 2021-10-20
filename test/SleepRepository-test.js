import { expect } from 'chai';
import SleepRepository from '../src/SleepRepository.js';

describe('Sleep Repository', () => {
  let sleepData;
  let sleepRepository;

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

    sleepRepository = new SleepRepository(sleepData);
  });

  it('should be a function', function () {
    expect(SleepRepository).to.be.a('function');
  });

  it('should be an instance of SleepRepository', function() {
    expect(sleepRepository).to.be.an.instanceOf(SleepRepository);
  });

   it('given a user ID it should return the user\'s sleep data', function() {
     const user1SleepData = [
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

     const result = sleepRepository.renderUserSleepData(1);
     expect(result).to.deep.equal(user1SleepData);
   });
});
