class course{
    constructor(cid,cname,fname,lname){
        this.cid=cid;
        this.cname=cname;
        this.fname=fname;
        this.lname=lname;
        const bt = document.createElement("button");
        bt.innerText = "SELECT";
        bt.type = "button";
        bt.addEventListener("click",()=>{
            const stid = JSON.parse(sessionStorage.getItem("u")).stid;
            const sc = JSON.parse(localStorage.getItem("sc"));
            let flag = false;
            function localRefresh(idx,cid,item=null){
                if(item!=null){
                    // console.log(Object.values(stItem)[0]);
                    Object.values(item)[0].push(cid);
                    sc[idx] = item;
                }else{
                    const scObj = {
                        [stid]:[cid]
                    }
                    sc.push(scObj);
                }
                localStorage.setItem("sc",JSON.stringify(sc));
            }

            for(let idx in sc){
                if(Object.keys(sc[idx])[0] == stid){
                   localRefresh(idx,this.cid,sc[idx]);
                   flag = true;
                   break; 
                }
            }
            if(!flag)
                localRefresh(0,this.cid);
            
        })
        this.selectBt = bt;
    }
    toTr(){
        const tr = document.createElement("tr");
        for(let pr of Object.values(this)){
            // console.log(pr,typeof(pr)); //typeof will return the data type of the variable in parameter 1
            // console.log(pr,(pr instanceof Object)) //instanceof will return true or false if the data type of pr will be of the same type of data type after the instanceof
            const td = document.createElement("td");
            (pr instanceof Object) ? td.append(pr) : td.innerText = pr;
            tr.append(td);
        }
        return tr;
    }
}
export default course;