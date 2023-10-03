/* Immutable Object */
class TicketTypeRequest {
  #type;
  #cost;
  #noOfTickets;

  constructor(type, noOfTickets) {
    if (!this.#Type.includes(type)) {
      throw new TypeError(`type must be ${this.#Type.slice(0, -1).join(', ')}, or ${this.#Type.slice(-1)}`);
    }

    if (!Number.isInteger(noOfTickets)) {
      throw new TypeError('noOfTickets must be an integer');
    }

    this.#type = type;
    this.#noOfTickets = noOfTickets;
    this.#cost = Number(this.#Prices[type]) * noOfTickets;

    Object.freeze(this);
  }

  get noOfTickets() {
    return this.#noOfTickets;
  }

  get ticketType() {
    return this.#type;
  }

  get totalCost(){
    return this.#cost;
  }

  #Type = ['ADULT', 'CHILD', 'INFANT'];
  #Prices = {'ADULT': 20, 'CHILD': 10, 'INFANT':0 };
}

module.exports = TicketTypeRequest;