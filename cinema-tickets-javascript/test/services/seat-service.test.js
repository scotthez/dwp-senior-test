
const sandbox = require("sinon").createSandbox();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;
chai.use(chaiAsPromised);
import SeatReservationService from '../../src/thirdparty/seatbooking/SeatReservationService';

const InternalServerError = require("../../src/pairtest/lib/errors/InternalServerError");
let SeatService = require("../../src/pairtest/services/SeatService");

describe("TicketService Tests", () => {

  let obj;

  beforeEach(() => {});

  afterEach(() => {
    obj = null;
    sandbox.restore();
  });

  it(`Test totalReservedSeats sets a default to 0`, () => {
    obj = new SeatService();
    expect(obj.totalReservedSeats).to.eq(0);
  });
  
  it(`Test totalReservedSeats sets seats from constructor`, () => {
    obj = new SeatService(10);
    expect(obj.totalReservedSeats).to.eq(10);
  });

  it(`Test reserveSeats returns internal server error totalSeats is incorrect input`, async() => {
    obj = new SeatService();
    await expect(obj.reserveSeats(1, "wrong")).to.eventually.be.rejectedWith(InternalServerError);
  });

  it(`Test reserveSeats returns internal server error if totalSeats = 0`, async() => {
    obj = new SeatService();
    await expect(obj.reserveSeats(1, 0)).to.eventually.be.rejectedWith(InternalServerError);
  });


  it(`Test the totalReservedSeats get updated`, async() => {
    const stubMysql = sandbox.stub(SeatReservationService.prototype, 'reserveSeat');
    stubMysql.returns(true);

    obj = new SeatService();
    await obj.reserveSeats(1, 10);
    expect(obj.totalReservedSeats).to.eq(10);
  });

});