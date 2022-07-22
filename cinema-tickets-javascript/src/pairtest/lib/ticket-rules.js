const { Engine } = require("json-rules-engine");
const InvalidPurchaseException = require('./errors/InvalidPurchaseException.js');

module.exports = () => { 
  let engine = new Engine();

  const rule1 = {
      conditions: {
          all: [{
              fact: 'minAdultTicketCheck',
              operator: 'greaterThanInclusive',
              value: 1
          }]
      },
      event: { type: 'adult-ticket-check' },
      onFailure(){ throw new InvalidPurchaseException("Child and Infant tickets cannot be purchased without purchasing an Adult ticket") },
  }

  const rule2 = {
      conditions: {
        all: [{
          fact: "maxTicketsCheck",
          operator: "lessThanInclusive",
          value: 20
        }]
      },
      event: { type: 'max-tickets-check' },
      onFailure(){ throw new InvalidPurchaseException("A maximum of 20 tickets can be purchased at any one time") },
  };

  const rule3 = {
    conditions: {
      all: [{
        fact: "sufficientFundsCheck",
        operator: "greaterThanInclusive",
        value: 1
      }]
    },
    event: { type: 'sufficient-funds-check' },
    onFailure(){ throw new InvalidPurchaseException("Insufficient funds found for this account") },
  };


  engine.addRule(rule1);
  engine.addRule(rule2);
  engine.addRule(rule3);
  return engine;
};
