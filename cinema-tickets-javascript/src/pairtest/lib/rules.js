const InvalidPurchaseException = require('./errors/InvalidPurchaseException.js');

export const rule1 = {
    conditions: {
      all: [{
        fact: "minTicketsCheck",
        operator: "greaterThanInclusive",
        value: 1
      }]
    },
    event: { type: 'min-tickets-check' },
    onFailure(){ throw new InvalidPurchaseException("A minimum of 1 adult ticket must be selected") },
  };

  export const rule2 = {
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

  export const rule3 = {
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


  export const rule4 = {
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

  // This was not a requirement but if you dont want to limit a 1:1 ratio of adult to infant remove this rule.
  // Would usually clarify with business on this requirement, but common sense prevails.
  export const rule5 = {
    conditions: {
      all: [{
        fact: "sufficientAdultsCheck",
        operator: "equal",
        value: true
      }]
    },
    event: { type: 'sufficient-adults-check' },
    onFailure(){ throw new InvalidPurchaseException("To many infants, not enough parents purchased.") },
  }