

const InternalServerError = require("./errors/InternalServerError");
const OrderRequest = require("./OrderRequest");
const TicketTypeRequest = require("./TicketTypeRequest");

/*  Immutable Object */
class TicketRequest extends OrderRequest{
  #totalNoOfTickets;

  constructor() {
    super();
    this.#totalNoOfTickets = 0;

    Object.seal(this);
  }

  get totalNoOfTickets() {
    return this.#totalNoOfTickets;
  }

  addTickets(ticketRequests = []){
    if (ticketRequests.length === 0 || 
      ticketRequests.filter(obj => !(obj instanceof TicketTypeRequest)).length > 0) {
      throw new InternalServerError(`Requests must be of type TicketTypeRequest`);
    }

    const totalCost = ticketRequests.reduce((a,req)=> a + req.totalCost, 0);

    this.addToOrder(totalCost);

    this.#totalNoOfTickets += ticketRequests.reduce((a,req)=> a + req.noOfTickets, 0);
  }
}

module.exports = TicketRequest;