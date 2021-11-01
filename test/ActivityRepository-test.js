import { expect } from 'chai';
import ActivityRepository from '../src/ActivityRepository';
describe('ActivityRepository', () => {
  let activityRepository;
  let userId;
  let activityData;

  beforeEach(function() {
    activityData = [{
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numSteps": 4294,
        "minutesActive": 138,
        "flightsOfStairs": 10
      },
      {
        "userID": 3,
        "date": "2019/06/15",
        "numSteps": 7402,
        "minutesActive": 116,
        "flightsOfStairs": 33
      },
      {
        "userID": 4,
        "date": "2019/06/15",
        "numSteps": 3486,
        "minutesActive": 114,
        "flightsOfStairs": 32
      },
      {
        "userID": 5,
        "date": "2019/06/15",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      },
      {
        "userID": 6,
        "date": "2019/06/15",
        "numSteps": 14810,
        "minutesActive": 287,
        "flightsOfStairs": 18
    }];

    userId = 1;
    activityRepository = new ActivityRepository(activityData);
  });

  it('It should be a function', function() {
    expect(ActivityRepository).to.be.a('function');
  });

  it('It should be an instance of ActivityRepository', function() {
    expect(activityRepository).to.be.an.instanceOf(ActivityRepository);
  });
  it('It should store activity data', function() {
    expect(activityRepository.activityDataSet).to.deep.equal(activityData);
  })
  it('Given a userID it should return a user\'s activity events.', function() {
    const result = activityRepository.getUserActivity(userId);

    expect(result).to.deep.equal([activityData[0]]);
  })





});
