class product {
  constructor(id, pname, price, amount) {
    this.id = id;
    this.pname = pname;
    this.price = price;
    this.amount = amount;
  }
  total() {
    return this.price * this.amount;
  }
}
export default product;
