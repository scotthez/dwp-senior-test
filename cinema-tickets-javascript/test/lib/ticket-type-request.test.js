
const sandbox = require("sinon").createSandbox();
const { expect, assert } = require('chai');


const TicketTypeRequest = require("../../src/pairtest/lib/TicketTypeRequest");

describe("TicketTypeRequest Tests", () => {
  
  let obj;

  beforeEach(() => {
  });

  afterEach(() => {
    obj = null;
    sandbox.restore();
  });


  it(`Test TypeError is thrown when incorrect type`, () => {
    expect (()=> { new TicketTypeRequest("WRONG", 1) }).to.throw ( TypeError );
  });

  it(`Test TypeError is thrown when incorrect number`, () => {
    expect (()=> { new TicketTypeRequest("ADULT", "wrong") }).to.throw ( TypeError );
  });


  it(`Test ticketType getter on valid contstructor instance`, () => {
    obj = new TicketTypeRequest("ADULT", 1)
    expect (obj.ticketType).to.equal ( "ADULT" );
  });

  it(`Test noOfTickets getter on valid contstructor instance`, () => {
    obj = new TicketTypeRequest("ADULT", 1)
    expect (obj.noOfTickets).to.equal(1);
  });

  it(`Test totalCost is correct when buying adult ticket`, () => {
    obj = new TicketTypeRequest("ADULT", 1)
    expect (obj.totalCost).to.equal(20);
  });

  it(`Test totalCost is correct when buying children tickets`, () => {
    obj = new TicketTypeRequest("CHILD", 1)
    expect (obj.totalCost).to.equal(10);
  });

});