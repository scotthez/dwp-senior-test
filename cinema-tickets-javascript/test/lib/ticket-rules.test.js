
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

  it(`Test minTicketsCheck rule throws InvalidPurchaseException on failure`,  async() => {
    // Fail if no tickets selected
      await expect(engine().run({ minTicketsCheck: 0 })).to.eventually.be.rejectedWith(InvalidPurchaseException);
  });

  it(`Test minAdultTicketCheck rule throws InvalidPurchaseException on failure`,  async() => {
    // Fail if no adults tickets selected
      await expect(engine().run({ minAdultTicketCheck: 0, minTicketsCheck: 1, })).to.eventually.be.rejectedWith(InvalidPurchaseException);
  });

  it(`Test sufficientAdultsCheck rule throws InvalidPurchaseException on failure`,  async() => {
    // Fail if there is less adults than infants
    await expect(engine().run({ sufficientAdultsCheck: false, minAdultTicketCheck: 1, minTicketsCheck: 20, })).to.eventually.be.rejectedWith(InvalidPurchaseException);
  });

  it(`Test maxTicketsCheck rule throws InvalidPurchaseException on failure`,  async() => {
    // Fail if ticket total is greater than 20
    await expect(engine().run({ maxTicketsCheck: 21,  sufficientAdultsCheck: true, minAdultTicketCheck: 1, minTicketsCheck: 21, })).to.eventually.be.rejectedWith(InvalidPurchaseException);
  });
  
  it(`Test sufficientFundsCheck rule throws InvalidPurchaseException on failure`,  async() => {
    // accountId > 0 (implies they have enough funds)
    await expect(engine().run({ sufficientFundsCheck: 0, maxTicketsCheck: 20, sufficientAdultsCheck: true, minAdultTicketCheck: 1, minTicketsCheck: 20, })).to.eventually.be.rejectedWith(InvalidPurchaseException);
  });

  it(`Test all successful rules`,  async() => {
    await expect(engine().run({ sufficientFundsCheck: 1, maxTicketsCheck: 20, sufficientAdultsCheck: true, minAdultTicketCheck: 1, minTicketsCheck: 20,  })).to.eventually.not.be.rejected;
  });

});