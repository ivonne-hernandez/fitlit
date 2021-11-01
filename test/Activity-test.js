import { expect } from 'chai';
import Activity from '../src/Activity';


describe('Activity', () => {
  let userActivityEvents;
  let startDate;
  let endDate;
  let userActivitiesData;

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
userActivityEvents = new Activity(userActivitiesData);
})

it('It should be a function',  function() {
  expect(Activity).to.be.a('function');
})
it('It should be an instance of Activity', function() {
  expect(userActivityEvents).to.be.an.instanceOf(Activity);
})
it('It should store activity data for a user', function() {
  expect(userActivityEvents.userActivities).to.deep.equal(userActivitiesData);
})


})
