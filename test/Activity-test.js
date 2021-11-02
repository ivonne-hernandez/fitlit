import { expect } from 'chai';
import Activity from '../src/Activity';
import User from '../src/User';

describe('Activity', () => {
  let userActivityEvents;
  let startDate;
  let endDate;
  let userActivitiesData;
  let user;

beforeEach(function() {
  userActivitiesData = [{
    "userID": 1,
    "date": "2019/06/15",
    "numSteps": 3577,
    "minutesActive": 140,
    "flightsOfStairs": 16
  },
  {
    "userID": 1,
    "date": "2019/06/16",
    "numSteps": 6637,
    "minutesActive": 175,
    "flightsOfStairs": 36
  },
  {
    "userID": 1,
    "date": "2019/06/17",
    "numSteps": 14329,
    "minutesActive": 168,
    "flightsOfStairs": 18
  },
    {
    "userID": 1,
    "date": "2019/06/18",
    "numSteps": 4419,
    "minutesActive": 165,
    "flightsOfStairs": 33
  },
  {
    "userID": 1,
    "date": "2019/06/19",
    "numSteps": 8429,
    "minutesActive": 275,
    "flightsOfStairs": 2
  },
  {
    "userID": 1,
    "date": "2019/06/20",
    "numSteps": 14478,
    "minutesActive": 140,
    "flightsOfStairs": 12
  },
  {
    "userID": 1,
    "date": "2019/06/21",
    "numSteps": 6760,
    "minutesActive": 135,
    "flightsOfStairs": 6
  }];

  startDate = '2019/06/15';
  endDate = '2019/06/21';
  user = new User({
    "id": 1,
    "name": "Luisa Hane",
    "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    "email": "Diana.Hayes1@hotmail.com",
    "strideLength": 4.3,
    "dailyStepGoal": 10000,
    "friends": [16, 4, 8]
  });
  userActivityEvents = new Activity(userActivitiesData, user.strideLength);
});

it('It should be a function',  function() {
  expect(Activity).to.be.a('function');
});

it('It should be an instance of Activity', function() {
  expect(userActivityEvents).to.be.an.instanceOf(Activity);
});

it('It should store activity data for a user', function() {
  expect(userActivityEvents.userActivities).to.deep.equal(userActivitiesData);
});

it('It should have a strideLength', function() {
  expect(userActivityEvents.strideLength).to.equal(user.strideLength);
});

it('It should return miles a user has walked for a specific day', function() {
  const result = userActivityEvents.getMilesWalked(startDate);

  expect(result).to.equal(2.91);
});

it('It should return the user\'s minutes active for a specific day', function() {
  const result = userActivityEvents.getMinutesActive(startDate);

  expect(result).to.equal(140);
});

})
