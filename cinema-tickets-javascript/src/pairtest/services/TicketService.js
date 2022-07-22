import TicketPaymentService from '../../thirdparty/paymentgateway/TicketPaymentService';
const InternalServerError = require('../lib/errors/InternalServerError.js');

class TicketService {

  static async purchaseTickets(accountId, cost) {
    if(!Number.isInteger(cost) || cost === 0) {
      throw new InternalServerError("The cost of the purchase order must be more than £0.00")
    }
    const paymentService = new TicketPaymentService();
    await paymentService.makePayment(accountId, cost);
    console.log(`£${cost} purchase order successful`);
  }

}


module.exports = TicketService;
