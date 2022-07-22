
const sandbox = require("sinon").createSandbox();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;
chai.use(chaiAsPromised);

const InvalidPurchaseException = require('../../src/pairtest/lib/errors/InvalidPurchaseException.js');
  let engine = require('../../src/pairtest/lib/ticket-rules.js');

describe("Testing ticket rules Tests", () => {
  beforeEach(() => {
  });

  afterEach(() => {
    sandbox.restore();
  });

  it(`Test minAdultTicketCheck rule throws InvalidPurchaseException on failure`,  async() => {
      await expect(engine().run({ minAdultTicketCheck: 0 })).to.eventually.be.rejectedWith(InvalidPurchaseException);
  });

  it(`Test maxTicketsCheck rule throws InvalidPurchaseException on failure`,  async() => {
    await expect(engine().run({ maxTicketsCheck: 21,  minAdultTicketCheck: 1})).to.eventually.be.rejectedWith(InvalidPurchaseException);
  });
  
  it(`Test sufficientFundsCheck rule throws InvalidPurchaseException on failure`,  async() => {
    await expect(engine().run({ sufficientFundsCheck: 0, maxTicketsCheck: 20, minAdultTicketCheck: 1 })).to.eventually.be.rejectedWith(InvalidPurchaseException);
  });

  it(`Test all successful rules`,  async() => {
    await expect(engine().run({ sufficientFundsCheck: 1, maxTicketsCheck: 20, minAdultTicketCheck: 1 })).to.eventually.not.be.rejected;
  });

});