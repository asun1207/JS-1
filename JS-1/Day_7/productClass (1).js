class product {
  constructor(id, pname, price, amount) {
    this.id = id;
    this.pname = pname;
    this.price = price;
    this.amount = amount;
    this.total = parseFloat(this.price * this.amount).toFixed(2);

    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.type = "button";
    this.delBtn = delBtn;

    // Function to delete rows. It needs event to know which button you are clicking.
    const deletePress = (e) => {

      // Get the sum/prodsum information from storage
      let sum = sessionStorage.getItem("Pay");
      let prodsum = sessionStorage.getItem("Products");

      // Update the sum/prodsum amounts and store it again
      sum = sum - this.total;
      prodsum = prodsum - this.amount;
      sessionStorage.setItem("Pay", parseFloat(sum).toFixed(2));
      sessionStorage.setItem("Products", parseInt(prodsum));

      // Update the Total columns in the table with the new amounts
      document.querySelector("tfoot tr").children[1].innerText = prodsum;
      document.querySelector("tfoot tr").children[2].innerText = "$" + sum.toFixed(2);

      // Remove the row from the table
      e.target.parentElement.parentElement.style.display = "none";
    }

    // Event listener for the button which will perform the deletePress func
    delBtn.addEventListener("click", deletePress)
  }

  // Method to create a table row with the products properties
  toRow() {
    const tr = document.createElement("tr");

    // For each property values of the product object, create a table column
    for (let prop of Object.values(this)) {
      const td = document.createElement("td");
      // If the property is an object (button), append it to the column
      // Else, take that property's value and use it as innerText for the column
      (prop instanceof Object) ? td.append(prop) : td.innerText = prop;

      // Append the columns to the product row
      tr.append(td);
    }
    return tr;
  }


}

export default product;