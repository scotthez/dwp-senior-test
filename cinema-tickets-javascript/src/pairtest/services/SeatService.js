import SeatReservationService from '../../thirdparty/seatbooking/SeatReservationService';
const InternalServerError = require('../lib/errors/InternalServerError.js');

class SeatService {
  #totalReservedSeats;
  constructor(seats = 0) {
    this.#totalReservedSeats = seats;
  }

  async reserveSeats(accountId, totalSeats) {
    if(!Number.isInteger(totalSeats) || totalSeats === 0) {
      throw new InternalServerError("Need to reserve at least 1 seat")
    }
    this.#totalReservedSeats += totalSeats;
    const seatReservationService = new SeatReservationService();
    await seatReservationService.reserveSeat(accountId, totalSeats);
    console.log(`Reserved ${totalSeats} Seats`);
  }

  get totalReservedSeats() {
    return this.#totalReservedSeats;
  }

}

module.exports = SeatService;
