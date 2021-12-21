// import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";


const amounts  = {
    "PENNY": .01,
    "NICKEL": .05,
    "DIME": .10,
    "QUARTER": .25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
  }

function checkCashRegister(price, cash, cid) {
  let change = Number((cash-price).toFixed(2));
  const totalCid = Number(
    cid.reduce((prev,curr)=>{
    return prev + curr[1];
    },0
  ).toFixed(2))
  if(change > totalCid){
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }
  if(change === totalCid){
    return {status: "CLOSED", change: cid};
  }
  cid = cid.reverse()
  const tmp = [];
  for(const arr of cid){
    change = Number(change.toFixed(2))
    if(!arr[1] > 0) continue;
    if(change === amounts[arr[0]]){
      tmp.push(arr);
      break;
    }
    if(change < amounts[arr[0]]){
      continue;
    }
    if(change > amounts[arr[0]]){
      const mod = change%amounts[arr[0]];
      const amountCur = change/amounts[arr[0]];
      if(mod === 0){
        const amountDol = amountCur*amounts[arr[0]];
        change -= amountDol;
        tmp.push([arr[0],amountDol]);
        continue;
      } else {
        const remainder = amountCur%1
        const whole = amountCur-remainder;
        const amountDol = whole*amounts[arr[0]]
        if(amountDol > arr[1]){
          change -= arr[1]
          tmp.push([arr[0],arr[1]]);
        continue;
        } else {
          change -= amountDol;
          tmp.push([arr[0],amountDol]);
          continue;
        }
      }
    }else break
  }
  if(change !== 0) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }
  return {status: "OPEN", change: tmp};
}


// const test = (name,fn,expected) => {
//   return Deno.test(
//     {
//       name: name,
//       fn(){
//         assertEquals(fn,expected)
//       }
//     }
//   )
// }

checkCashRegister(19.09, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

// checkCashRegister(19.56, 25, [["PENNY", .37], ["NICKEL", 1.05], ["DIME", .30], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])

// test("test1",checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]),{status: "OPEN", change: [["QUARTER", 0.5]]})

// test("test2",checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]),{status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]})

// test('test3',checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]),{status: "INSUFFICIENT_FUNDS", change: []})

// test('test4',checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]),{status: "INSUFFICIENT_FUNDS", change: []})

// test('test5',checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]),{status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]})

// test('test6',checkCashRegister(146.72, 200, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]),{status: "INSUFFICIENT_FUNDS", change: []})

// test('test7',checkCashRegister(146.72, 200, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]),{status: "OPEN", change: [["TWENTY", 40], ["TEN", 10], ["ONE", 3], ["QUARTER", 0.25], ["PENNY", 0.03]]})

// test('test8',checkCashRegister(46.72, 200, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]),{status: "OPEN", change: [["ONE HUNDRED",100],["TWENTY", 40], ["TEN", 10], ["ONE", 3], ["QUARTER", 0.25], ["PENNY", 0.03]]})

// test('test9',checkCashRegister(41.13, 200, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]),{status: "OPEN", change: [["ONE HUNDRED",100], ["TWENTY", 40], ["TEN", 10], ["FIVE",5], ["ONE", 3], ["QUARTER", 0.75],["DIME",.10],["PENNY", 0.02]]})

// test('test10',checkCashRegister(41.13, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]),{status: "INSUFFICIENT_FUNDS", change: []})

// test('test11',checkCashRegister(17000, 20000, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]),{status: "INSUFFICIENT_FUNDS", change: []})

// test('test12',checkCashRegister(17.97, 18, [["PENNY", .03], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]),{status: "CLOSED", change: [["PENNY", .03], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]})

// test('test13',checkCashRegister(17.97, 18, [["PENNY", .02], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]),{status: "INSUFFICIENT_FUNDS", change: []})

// test('test14',checkCashRegister(17.97, 18, [["PENNY", .04], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]),{status: "OPEN", change: [["PENNY", 0.03]]})