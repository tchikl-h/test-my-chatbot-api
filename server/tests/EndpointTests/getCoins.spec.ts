const dotenv = require('dotenv');
import { expect } from 'chai';
import 'mocha';
var request = require('request');

describe('getCoins functions', () => {

  it('getCoins endpoint test', () => {
    request("http://localhost:8000/v1/coins", (error, response, body) => {
      expect(response.statusCode).to.equal(200);
    })
  });

  it('getCoins endpoint test number crypto', () => {
    request("http://localhost:8000/v1/coins", (error, response, body) => {
      expect(body.length).to.be.above(100);
    })
  });

});
