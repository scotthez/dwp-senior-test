const TicketService = require('../services/TicketService');
const SeatService = require('../services/SeatService');
const TicketTypeRequest = require('../lib/TicketTypeRequest');
const TicketRequest = require('../lib/TicketRequest');
const engine = require('../lib/ticket-rules');

const validatePurchaseTicketsRequest = async (adultTickets, accountId, totalTickets) => {
  await engine().run({  
    maxTicketsCheck: totalTickets,
    minAdultTicketCheck: adultTickets,
    sufficientFundsCheck: accountId
  });
  return;
};

const purchaseTickets = async (req, res, next) => {
  const { tickets, accountId } = req.body

  try { 
      if (!Number.isInteger(tickets.infants)) tickets.infants = 0; 
      if (!Number.isInteger(tickets.childrens)) tickets.childrens = 0;

      const ticketRequest = new TicketRequest()
      ticketRequest.addTickets([
        new TicketTypeRequest('ADULT', tickets.adults),
        new TicketTypeRequest('CHILD', tickets.childrens),
        new TicketTypeRequest('INFANT', tickets.infants) 
      ]);

      const seatService = new SeatService();
      
      await validatePurchaseTicketsRequest(tickets.adults, accountId, ticketRequest.totalNoOfTickets);
      const totalSeats = tickets.adults + tickets.childrens;
      await seatService.reserveSeats(accountId, totalSeats);
      await TicketService.purchaseTickets(accountId, ticketRequest.totalCost);
      res.status(200).json({
        orderId: ticketRequest.orderId,
        cost: ticketRequest.totalCost,
        totalSeats: seatService.totalReservedSeats,
        totalTickets: ticketRequest.totalNoOfTickets,
        ticketSummary: {
          adults: tickets.adults,
          children: tickets.childrens,
          infants: tickets.infants
        }
      });
  } catch (err){
      next(err);
  }
}


module.exports = {
  purchaseTickets,
};
