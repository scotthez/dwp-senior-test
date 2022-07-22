
const sandbox = require("sinon").createSandbox();
const { expect, assert } = require('chai');
const BadRequestError = require("../../../src/pairtest/lib/errors/BadRequestError");

describe("BadRequestError Tests", () => {

  let err;

  afterEach(() => {
    err = null;
    sandbox.restore();
  });

  it(`Class should be of type Error`, () => {
    err = new BadRequestError("Message", "Error");
    assert.isTrue(err instanceof Error)
  });

  it(`Test toJSON returns correct structure`, () => {
    const expected = {
      "code": 400,
      "error": "Error",
      "message": "Message",
      "name": "BadRequestError"
    };
    err = new BadRequestError("Message", "Error");
    expect(err.toJSON()).to.deep.equal(expected)
  });

  it(`Test constructor uses default params`, () => {
    const expected = {
      "code": 400,
      "error": "Bad request",
      "message": "Bad request",
      "name": "BadRequestError"
    };
    err = new BadRequestError();
    expect(err.toJSON()).to.deep.equal(expected)
  });

});