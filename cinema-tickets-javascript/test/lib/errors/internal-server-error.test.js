
const sandbox = require("sinon").createSandbox();
const { expect, assert } = require('chai');
const InternalServerError = require("../../../src/pairtest/lib/errors/InternalServerError");

describe("InternalServerError Tests", () => {

  let err;

  afterEach(() => {
    err = null;
    sandbox.restore();
  });

  it(`Class should be of type Error`, () => {

    err = new InternalServerError("Message");
    assert.isTrue(err instanceof Error)
  });

  it(`Test toJSON returns correct structure`, () => {
    const expected = {
      "code": 500,
      "error": "There was a problem with this service",
      "message": "Message",
      "name": "InternalServerError"
    };

    err = new InternalServerError("Message");
    expect(err.toJSON()).to.deep.equal(expected)
  });


  it(`Test constructor uses default params`, () => {
    const expected = {
      "code": 500,
      "error": "There was a problem with this service",
      "message": "Internal Server Error",
      "name": "InternalServerError"
    };
    let err = new InternalServerError()
    expect(err.toJSON()).to.deep.equal(expected)
  });

});