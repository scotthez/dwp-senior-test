const { v4: uuidv4 } = require('uuid');

/* Immutable Object */
class OrderRequest {
  #orderId;
  #cost;

  constructor(cost = 0) {
    this.#orderId = uuidv4() //Random ID
    this.#cost = cost;

    Object.seal(this);
  }

  addToOrder(cost){
    this.#cost += cost;
  }

  get totalCost(){
    return this.#cost;
  }

  get orderId(){
    return this.#orderId;
  }
}

module.exports = OrderRequest;