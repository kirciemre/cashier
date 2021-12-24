function checkCashRegister(price, cash, cid) {
  let change = 0;
  let status = "OPEN";
  const currency = [
    ["PENNY" , 0.01],
    ["NICKEL" , 0.05],
    ["DIME" , 0.1],
    ["QUARTER", 0.25],
    ["ONE" , 1],
    ["FIVE", 5],
    ["TEN" , 10],
    ["TWENTY", 20],
    ["ONE HUNDRED" ,100]
  ].reverse();
  change = cash-price;
  let cashInDrawer = [...cid]
  let allCash = cashInDrawer.reduce(function(acc, val) { return acc + val[1]; }, 0).toFixed(2);
  if (change > allCash){
    status = "INSUFFICIENT_FUNDS";
    change = giveChange(change);
  }else if (change == allCash){
    status = "CLOSED"
    change = giveChange(change);
  }else {
    status = "OPEN"
    change = giveChange(change);
  }

  function giveChange(change){
    for(let i = 0; i < currency.length; i++){
      if(change/currency[i][1] >= 1 ){
        var money = currency[i][0];
        return paybackIsEnought(i,change)
      }
    }
  }

  function paybackIsEnought(index, changeVal) {
          
    let ustu = [];
    
    if(changeVal===cid.reverse()[index][1]){
      status = "CLOSED";
      ustu.push([cid.reverse()[index]]);
    }
    else{
      for(let j=index; j<cid.length; j++){
        if(changeVal<cid.reverse()[j][1]){
          console.log("changeVal");
          ustu.push([cid.reverse()[j][0], changeVal])
          
          break;
        }else{
          ustu.push(cid.reverse()[j][0], cid.reverse()[j][1]);
          changeVal = changeVal- cid.reverse()[index][1];
        }
      }
    }
    return ustu;

   
  }

  return {"status": status, "change": change};
}

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
