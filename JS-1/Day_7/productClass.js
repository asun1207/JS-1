
class product {
    constructor(pid, pname, amount, price) {
        this.pid = pid;
        this.pname = pname;
        // I changed the order amount and price so that it can be seen easier
        this.amount = amount;
        this.price = price;

        // eachPrice means a price of total of one product
        this.eachPrice = parseFloat(this.amount * this.price).toFixed(2);

        // delete button created and function added
        const deleteBt = document.createElement("button");
        deleteBt.innerText = "Delete";
        deleteBt.type = "button";
        const deleteHandler = (e) => {
            let sum = parseFloat(sessionStorage.getItem("sum"))
            sum = (parseFloat(sum) - parseFloat(this.eachPrice)).toFixed(2);
            document.querySelector("tfoot tr").children[1].innerText = sum;
            sessionStorage.setItem("sum", sum);
            // e.target.parentElement.parentElement.style.display = "none";
        }
        deleteBt.addEventListener("click", deleteHandler)
        this.deleteBt = deleteBt;

        // Following is for edit part
        const editBt = document.createElement("button");
        editBt.innerText = "Edit";
        editBt.type = "button";
        const modifyHandler = (editForm, productObj) => {
            let inputs = editForm.querySelectorAll("input");
            for (let input of inputs) {
                let prop = input.name
                productObj[prop] = input.value;
            }
            productObj.eachPrice = parseFloat(productObj.amount * productObj.price).toFixed(2);
            const fullProduct = JSON.parse(sessionStorage.getItem("p"))
            //considering the case which changed id doesn't exist in fullProduct
            let findFlag = false;
            let tr = productObj.toTr();
            for (let pr in fullProduct) {
                if (fullProduct[pr].pid == productObj.pid) {
                    fullProduct[pr] = productObj;
                    findFlag = true;
                    let trOrg = document.querySelectorAll("tbody tr")[pr]
                    trOrg.replaceWith(productObj.toTr())
                    break;
                }
            }
            if (!findFlag) {
                fullProduct.push(productObj);
                document.querySelectorAll("tbody")[0].appendChild(tr)
            }
            // calculate sum and insert it
            let sum = parseFloat(sessionStorage.getItem("sum"))
            for (let pr of fullProduct) {
                sum = (parseFloat(sum) + parseFloat(pr.eachPrice)).toFixed(2);
            }
            document.querySelector("tfoot tr").children[1].innerText = sum;
            sessionStorage.setItem("sum", sum);
        }

        const editHandler = (productObj) => {
            const editForm = document.createElement("form")
            for (let prop in productObj) {
                if (prop != "eachPrice" && typeof (productObj[prop]) !== "object") {
                    let editEle = document.createElement("input");
                    // console.log(this[ele]);
                    editEle.value = productObj[prop];
                    editEle.name = prop;
                    editEle.type = "text"
                    editForm.appendChild(editEle);
                }
            }
            const modifyBt = document.createElement("button");
            modifyBt.innerText = "Modify";
            modifyBt.type = "button";
            modifyBt.addEventListener("click", () => modifyHandler(editForm, productObj))
            editForm.appendChild(modifyBt)
            document.querySelectorAll("div")[0].appendChild(editForm)
        }
        editBt.addEventListener("click", () => editHandler(this))
        this.editBt = editBt;
    }

    toTr() {
        const tr = document.createElement("tr");
        for (let pr of Object.values(this)) {
            // Object.values(this) means this classe's array of values
            // console.log(Object.values(this))
            const td = document.createElement("td");
            (pr instanceof Object) ? td.append(pr) : td.innerText = pr;
            tr.append(td);
        }
        return tr;
    }
}
export default product;