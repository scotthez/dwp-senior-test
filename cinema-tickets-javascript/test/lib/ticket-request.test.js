
var sandbox = require("sinon").createSandbox();
const { expect, assert } = require('chai');

const TicketRequest = require("../../src/pairtest/lib/TicketRequest");
const TicketTypeRequest = require("../../src/pairtest/lib/TicketTypeRequest");
const InternalServerError = require("../../src/pairtest/lib/errors/InternalServerError");
const OrderRequest = require("../../src/pairtest/lib/OrderRequest");


describe("TicketRequest Tests", () => {

  let obj;

  beforeEach(() => {
      obj = new TicketRequest();
  });

  afterEach(() => {
    obj = null;
    sandbox.restore();
  });

  it(`Test that the class should be of type OrderRequest`, () => {
    assert.isTrue(obj instanceof OrderRequest)
  });

  it(`Test the totalNoOfTickets returns 0 as default`, () => {
    assert.isTrue(obj.totalNoOfTickets === 0)
  });

  it(`Test addTickets returns internal server error if no input is passed`, () => {
    expect(()=> { obj.addTickets(); }).to.throw (InternalServerError);
  });

  it(`Test addTickets returns internal server error if blank array is passed`, () => {
    expect (()=> { obj.addTickets([]); }).to.throw ( InternalServerError );
  });

  it(`Test addTickets returns internal server error if array is incorrect type`, () => {
    expect (()=> { obj.addTickets(["incorrect-input"]); }).to.throw ( InternalServerError );
  });

  it(`Test addTickets returns internal server error if array is incorrect type`, () => {
    expect (()=> { obj.addTickets(["incorrect-input"]); }).to.throw ( InternalServerError );
  });

  it(`Test addTickets adds to totalNoOfTickets`, () => {
    obj.addTickets([ new TicketTypeRequest('ADULT', 20) ]);
    expect (obj.totalNoOfTickets).to.equal( 20 );
  });

  it(`Test addTickets adds 400 to totalCost for adults`, () => {
    obj.addTickets([ new TicketTypeRequest('ADULT', 20) ]);
    expect (obj.totalCost).to.equal( 400 );
  });

  it(`Test addTickets adds 200 to totalCost for adults`, () => {
    obj.addTickets([ new TicketTypeRequest('CHILD', 20) ]);
    expect (obj.totalCost).to.equal( 200 );
  });


  it(`Test addTickets adds 400 to totalCost for adults`, () => {
    obj.addToOrder(200);
    expect (obj.totalCost).to.equal( 200 );
  });

  
  

});
