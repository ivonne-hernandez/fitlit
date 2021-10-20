import { expect } from 'chai';
import HydrationRepository from '../src/HydrationRepository';

describe('Hydration Repository', () => {
  const hydrateData;
  const hydrationRepository;

  beforeEach(function() {
    hydrateData = [
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

hydrationRepository = new HydrationRepository(hydrateData);
