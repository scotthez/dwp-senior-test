const { purchaseTickets } = require('../controllers/ticket-controller.js');
const { validatePurchaseTicketInputs } = require('../middlewares/validators/purchase-ticket-validator');

module.exports = (router) => {
  router.post('/purchase', validatePurchaseTicketInputs, purchaseTickets);
};