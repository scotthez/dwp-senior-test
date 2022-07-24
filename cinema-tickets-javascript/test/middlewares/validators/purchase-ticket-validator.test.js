
const sandbox = require("sinon").createSandbox();
const { expect, assert } = require('chai');
const { mockRequest, mockResponse } = require("mock-req-res");
const BadRequestError = require("../../../src/pairtest/lib/errors/BadRequestError");
const {validatePurchaseTicketInputs} = require("../../../src/pairtest/middlewares/validators/purchase-ticket-validator");

describe("Schema Validation Tests", () => {

  let req;
  let res;
  let next;

  beforeEach(() => {
    res = mockRequest();
    res = mockResponse();
    next = sandbox.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it(`Test return 404 when accountId is not a number`, async () => {
    req = mockRequest({ body: { accountId: "1" } });
    validatePurchaseTicketInputs(req, res, next);
    const expectedErr = sandbox.match.instanceOf(BadRequestError).and(sandbox.match.has('message', 'Validation Error'))
    sandbox.assert.calledWith(next, sandbox.match(expectedErr));
  });

  it(`Test return 404 when accountId is not > 0`, async () => {
    req = mockRequest({ body: { accountId: 0 } });
    validatePurchaseTicketInputs(req, res, next);
    const expectedErr = sandbox.match.instanceOf(BadRequestError).and(sandbox.match.has('message', 'Validation Error'))
    sandbox.assert.calledWith(next, sandbox.match(expectedErr));
  });

  it(`Test return 404 when accountId is not present`, async () => {
    req = mockRequest({ body: {  } });
    validatePurchaseTicketInputs(req, res, next);
    const expectedErr = sandbox.match.instanceOf(BadRequestError).and(sandbox.match.has('message', 'Validation Error'))
    sandbox.assert.calledWith(next, sandbox.match(expectedErr));
  });

  it(`Test return 404 when tickets.adults is not a number`, async () => {
    req = mockRequest({ body: { accountId: 1, tickets: { adults: "wrong"} } });
    validatePurchaseTicketInputs(req, res, next);
    const expectedErr = sandbox.match.instanceOf(BadRequestError).and(sandbox.match.has('message', 'Validation Error'))
    sandbox.assert.calledWith(next, sandbox.match(expectedErr));
  });

  it(`Test return 404 when tickets.adults is not present`, async () => {
    req = mockRequest({ body: { accountId: 1, tickets: { } } });
    validatePurchaseTicketInputs(req, res, next);
    const expectedErr = sandbox.match.instanceOf(BadRequestError).and(sandbox.match.has('message', 'Validation Error'))
    sandbox.assert.calledWith(next, sandbox.match(expectedErr));
  });

  it(`Test return 404 when tickets.children is less than 0`, async () => {
    req = mockRequest({ body: { accountId: 1, tickets: { adults: 1, children: -1} } });
    validatePurchaseTicketInputs(req, res, next);
    const expectedErr = sandbox.match.instanceOf(BadRequestError).and(sandbox.match.has('message', 'Validation Error'))
    sandbox.assert.calledWith(next, sandbox.match(expectedErr));
  });

  it(`Test return 404 when tickets.children is not an number`, async () => {
    req = mockRequest({ body: { accountId: 1, tickets: { adults: 1, children: "wrong"} } });
    validatePurchaseTicketInputs(req, res, next);
    const expectedErr = sandbox.match.instanceOf(BadRequestError).and(sandbox.match.has('message', 'Validation Error'))
    sandbox.assert.calledWith(next, sandbox.match(expectedErr));
  });

  it(`Test return 404 when tickets.infants is less than 0`, async () => {
    req = mockRequest({ body: { accountId: 1, tickets: { adults: 1, infants: -1} } });
    validatePurchaseTicketInputs(req, res, next);
    const expectedErr = sandbox.match.instanceOf(BadRequestError).and(sandbox.match.has('message', 'Validation Error'))
    sandbox.assert.calledWith(next, sandbox.match(expectedErr));
  });

  it(`Test return 404 when tickets.infants is not an number`, async () => {
    req = mockRequest({ body: { accountId: 1, tickets: { adults: 1, infants: "0" } } });
    validatePurchaseTicketInputs(req, res, next);
    const expectedErr = sandbox.match.instanceOf(BadRequestError).and(sandbox.match.has('message', 'Validation Error'))
    sandbox.assert.calledWith(next, sandbox.match(expectedErr));
  });


  it(`Test validation passes`, async () => {
    req = mockRequest({ body: { accountId: 1, tickets: { adults: 1, infants: 0 } } });
    validatePurchaseTicketInputs(req, res, next);
    sandbox.assert.calledOnce(next);
  });

});