
const sandbox = require("sinon").createSandbox();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;
chai.use(chaiAsPromised);

import TicketPaymentService from '../../src/thirdparty/paymentgateway/TicketPaymentService';
const InternalServerError = require("../../src/pairtest/lib/errors/InternalServerError");
let TicketService = require("../../src/pairtest/services/TicketService");

describe("TicketService Tests", () => {

  afterEach(() => {
    sandbox.restore();
  });

  it(`Test purchaseTickets returns internal server error totalSeats is incorrect input`, async() => {
    await expect(TicketService.purchaseTickets(1, "wrong")).to.eventually.be.rejectedWith(InternalServerError);
  });

  it(`Test purchaseTickets returns internal server error if totalSeats = 0`, async() => {
    await expect(TicketService.purchaseTickets(1, 0)).to.eventually.be.rejectedWith(InternalServerError);
  });

  it(`Test purchaseTickets successfully makes payment`, async() => {

    const stubMysql = sandbox.stub(TicketPaymentService.prototype, 'makePayment');
    stubMysql.returns(true);

    await expect(TicketService.purchaseTickets(1, 20)).to.eventually.not.be.rejected;
  });

});