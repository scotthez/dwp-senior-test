
const sandbox = require("sinon").createSandbox();
const { expect, assert } = require('chai');
const proxyquire = require("proxyquire").noPreserveCache().callThru();
const { mockRequest, mockResponse } = require("mock-req-res");

describe("Ticket controller Tests", () => {
  
  let req;
  let res;
  let next;
  let controller;

  beforeEach(() => {
    res = mockResponse();
    next = sandbox.spy();

    class MockTicketRequest {
      constructor() {}
      get totalNoOfTickets() { return 1}
      get totalCost() { return 20; }
      get orderId() { return "test"; }
      addTickets(ticketRequests = []){ }
      addToOrder(input1, input2) { return }
    }

    class MockTicketTypeRequest {
      constructor(type, amount) {}
      get noOfTickets() { return 1 }
      get ticketType() { return 'ADULT' }
      get totalCost(){ return 20; }
    }

    class MockSeatService {
      constructor() {  }
      async reserveSeats(accountId, totalSeats) { }
      get totalReservedSeats() { return 1; }
    }

    class MockTicketService {
      static async purchaseTickets(accountId, cost) {}    
    }

    controller = proxyquire("../../src/pairtest/controllers/ticket-controller", {
      '../lib/TicketRequest': MockTicketRequest,
      '../lib/TicketTypeRequest': MockTicketTypeRequest,
      '../services/SeatService': MockSeatService,
      '../lib/ticket-rules' : () => { return { run: (obj) => {return} } },
      '../services/TicketService': MockTicketService
    });
  });

  afterEach(() => {
    sandbox.restore();
  });


  it(`Should return correct payload when returning 200`, async() => {
    req = mockRequest({ body: {
      accountId: 1,
      tickets:{
        adults: 1,
        childrens: 0,
        infants: 0
      }
    } });

    await controller.purchaseTickets(req, res, next);

    sandbox.assert.calledWith(res.status, 200);
    sandbox.assert.calledWith(res.json, {
      orderId: 'test',
      cost: 20,
      totalSeats: 1,
      totalTickets: 1,
      ticketSummary: { adults: 1, children: 0, infants: 0 }
    });
  });


  it(`Should set to 0 when tickets.children is not a number`, async() => {
    req = mockRequest({ body: {
      accountId: 1,
      tickets:{
        adults: 1,
        childrens: "",
        infants: 0
      }
    } });

    await controller.purchaseTickets(req, res, next);

    sandbox.assert.calledWith(res.status, 200);
    sandbox.assert.calledWith(res.json, sandbox.match.has("cost", 20));
    sandbox.assert.calledWith(res.json, sandbox.match.has("ticketSummary", sandbox.match.has("children", 0)));
  });

  it(`Should set to 0 when tickets.infants is not a number`, async() => {
    req = mockRequest({ body: {
      accountId: 1,
      tickets:{
        adults: 1,
        childrens: 0,
        infants: ""
      }
    } });

    await controller.purchaseTickets(req, res, next);

    sandbox.assert.calledWith(res.status, 200);
    sandbox.assert.calledWith(res.json, sandbox.match.has("ticketSummary", sandbox.match.has("infants", 0)));
  });


  it(`Should return correct payload when returning 200`, async() => {
    req = mockRequest({ body: {
      accountId: 1,
      tickets:{
        childrens: 0,
        infants: 0
      }
    } });

    class MockTicketRequest {
      constructor(){throw new Error("Test error")}
    }
    controller = proxyquire("../../src/pairtest/controllers/ticket-controller", {
      '../lib/TicketRequest': MockTicketRequest,
    });

    await controller.purchaseTickets(req, res, next);

    const expectedErr = sandbox.match.instanceOf(Error).and(sandbox.match.has('message', 'Test error'))
    sandbox.assert.calledWith(next, sandbox.match(expectedErr));
  });
  



});