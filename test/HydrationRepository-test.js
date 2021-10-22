import { expect } from 'chai';
import HydrationRepository from '../src/HydrationRepository';

describe('Hydration Repository', () => {
  let data;
  let hydrationRepository;

  beforeEach(function() {
    data = [
      {
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
      },
      {
      "userID": 2,
      "date": "2019/06/15",
      "numOunces": 75
      },
      {
      "userID": 1,
      "date": "2019/06/16",
      "numOunces": 69
      },
      {
      "userID": 2,
      "date": "2019/06/16",
      "numOunces": 91
      }];

hydrationRepository = new HydrationRepository(data);
});

it('should be a function', function () {
  expect(HydrationRepository).to.be.a('function');
});

it('should be an instance of Hydration Repository', function() {
  expect(hydrationRepository).to.be.an.instanceOf(HydrationRepository);
});

it('should store data', function() {
  expect(hydrationRepository.hydrateData).to.deep.equal(data);
});

it('given a user ID, it should return the user\'s data', function() {
  let result = hydrationRepository.renderUserData(1);
  expect(result).to.deep.equal([data[0], data[2]]);
});

it('should return nothing if the user ID is invalid', function() {
  let result = hydrationRepository.renderUserData("foo");
  expect(result).to.deep.equal([]);
})
});
