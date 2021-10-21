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

it('should be an instance of User Repository', function() {
  expect(hydrationRepository).to.be.an.instanceOf(HydrationRepository);
});

it('should store data', function() {
  expect(hydrationRepository.data).to.deep.equal(data);
});

it('given a user ID, it should return the user\'s data', function() {
  const result = hydrationRepository.returnUserData(hydrationRepository.data[0].id);
  expect(result).to.deep.equal(userRepository.data[0]);
});
});
