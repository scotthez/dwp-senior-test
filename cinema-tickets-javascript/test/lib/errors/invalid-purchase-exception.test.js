
const sandbox = require("sinon").createSandbox();
const { expect, assert } = require('chai');
const BadRequestError = require("../../../src/pairtest/lib/errors/BadRequestError");
const InvalidPurchaseException = require("../../../src/pairtest/lib/errors/InvalidPurchaseException");

describe("InternalServerError Tests", () => {

  let err;

  afterEach(() => {
    err = null;
    sandbox.restore();
  });

  it(`Class should be of type BadRequestError`, () => {
    err = new InvalidPurchaseException();
    assert.isTrue(err instanceof BadRequestError)
  });

  it(`Test toJSON returns correct structure`, () => {
    const expected = {
      "code": 400,
      "error": "Invalid Purchase",
      "message": "Invalid Purchase",
      "name": "InvalidPurchaseException"
    };
    err = new InvalidPurchaseException();
    expect(err.toJSON()).to.deep.equal(expected)
  });


  it(`Test constructor when passing in inputs`, () => {
    const expected = {
      "code": 400,
      "error": "Error",
      "message": "Message",
      "name": "InvalidPurchaseException"
    };
    err = new InvalidPurchaseException("Message", "Error");
    expect(err.toJSON()).to.deep.equal(expected)
  });

});