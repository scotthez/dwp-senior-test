const { Engine } = require("json-rules-engine");
const {rule1, rule2, rule3, rule4, rule5} = require('./rules');

module.exports = () => { 
  let engine = new Engine();

  // Ordering rules
  engine.addRule(rule1);
  engine.addRule(rule3);
  engine.addRule(rule5);
  engine.addRule(rule2);
  engine.addRule(rule4);
  return engine;
};
