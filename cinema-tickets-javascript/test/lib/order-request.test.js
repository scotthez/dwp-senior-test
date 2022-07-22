
const sandbox = require("sinon").createSandbox();
const chai = require('chai');
chai.use(require('chai-match'));
const { expect, assert } = chai;

const OrderRequest = require("../../src/pairtest/lib/OrderRequest");

describe("OrderRequest Tests", () => {

  let obj;

  beforeEach(() => {
      obj = new OrderRequest();
  });

  afterEach(() => {
    obj = null;
    sandbox.restore();
  });

  it(`addTickets returns internal server error if array is incorrect type`, () => {
    obj.addToOrder(100);
    expect (obj.totalCost).to.equal(100);
  });

  it(`check order id is correct uuid v4`, () => {
    expect(obj.orderId).to.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
  });


});