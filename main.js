function checkCashRegister(price, cash, cid) {
    let status = "OPEN" //status default OPEN
    let output = { }; //output format initialized
    const currencyVals = [ //currency without float so don't need toFixed(2)
        ["ONE HUNDRED", 10000],
        ["TWENTY", 2000],
        ["TEN", 1000],
        ["FIVE", 500],
        ["ONE", 100],
        ["QUARTER", 25],
        ["DIME", 10],
        ["NICKEL", 5],
        ["PENNY", 1]
    ];
    let changeBasket =[]; //initialize changeBasket

    var fullCash = cid.reduce((accu, item) => { //overall amout of $ in drawer
        accu[item[0]] = Math.round(item[1] * 100);
        accu.total += accu[item[0]];
        return accu;
    }, { total: 0 }); //calculate drawers cash storage with default value 0
         
    var change = Math.round((cash - price) * 100); //change convert to cent
      
    if (change == fullCash.total) { //easiest condition first!
        status = 'CLOSED';
        changeBasket = cid;
    }
         
    else if (change > fullCash.total) { //2nd easiest condition!
        status = 'INSUFFICIENT_FUNDS';
    }
    else
    { //the last one is complicted a bit!
        for (let item of currencyVals) {
          var value = 0;
          while (fullCash[item[0]] > 0 && change >= item[1]) {
              change -= item[1];
              fullCash[item[0]] -= item[1];
              value += item[1];
          }
          if (value > 0) {
              changeBasket.push([item[0], value / 100]);
          }
        }

        if (change > 0) { // (change < fullCash.total) but there is not      enought small coin to payback! so change cant'be 0. so there is again insufficient fund! don't forget to empty basket!
        status = 'INSUFFICIENT_FUNDS';
        changeBasket = [];
        }
    }
    output = { "status": status, change: changeBasket}; //output format finalized!
    return output; //it's done gg!
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
