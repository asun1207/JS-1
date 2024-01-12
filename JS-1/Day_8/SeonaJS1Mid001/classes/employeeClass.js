//Create the class with constructor
class employee {
  constructor(id, fname, lname, years, married, children, salary) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.years = years;
    this.married = married;
    this.children = children;
    this.salary = salary;

    let married = true;
    let children = true;
    const deleteBt = document.createElement("button");
    deleteBt.innerText = "Delete";
    deleteBt.type = "button";
    const deleteHandler = (e) => {
      let salarysum = parseFloat(sessionStorage.getItem("salarysum"));
      salarysum = 40000;
      if (this.married) {
        salary *= 0.15;
      }
      if (this.children) {
        salary *= 0.15;
      }
      if (this.years > 4) {
        salary *= 0.1;
      }
      document.querySelector("tbody td").children[1].innerText = salarysum;
      sessionStorage.setItem("salarysum", salarysum);
      // e.target.parentElement.parentElement.style.display = "none";
    };
    deleteBt.addEventListener("click", deleteHandler);
    this.deleteBt = deleteBt;
  }
  toTr() {
    const tr = document.createElement("tr");
    for (let em of Object.values(this)) {
      // Object.values(this) means this classe's array of values
      // console.log(Object.values(this))
      const td = document.createElement("td");
      em instanceof Object ? td.append(em) : (td.innerText = em);
      tr.append(td);
    }
    return tr;
  }
}
export default employee;
