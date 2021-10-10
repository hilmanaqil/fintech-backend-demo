import {getBalance, getCurrentAccount} from "./metamask.js";

// (c) Anuflora Systems 

const creditscore = document.getElementById('csvalue');
const list = document.getElementById('list');
const form = document.getElementById('form');
const custname = document.getElementById('custname');
const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');

var width = 400
var height = 300
var margin = 5
var radius = Math.min(width, height) / 2 - margin

var svg = d3.select("#piechart")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    
var g = svg.append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(['green','red']);
document.getElementById("b2").style.display='none';
/*
const TransactionDataAll = [
{ "transaction_id": 1,
  "customername": "jon",
  "user_id": 1,
  "bill_type": "Eire",
  "bill_amount": "$67.32",
  "ontime": "1"
},
{
  "customername": "flora",
  "transaction_id": 2,
  "user_id": 2,
  "bill_type": "Jabbersphere",
  "bill_amount": "$67.52",
  "ontime": "0"
},
{ "transaction_id": 3,
  "customername": "jon",
  "user_id": 1,
  "bill_type": "Trupe",
  "bill_amount": "$49.16",
  "ontime": "0"
},
{ "transaction_id": 4,
  "customername": "flora",
  "user_id": 2,
  "bill_type": "Katz",
  "bill_amount": "$45.24",
  "ontime": "1"
}
];
*/
const AccountDataAll = [
  {
      "user_id": 3,
      "customername": "erny",
      "cs_score": "520"
  },
  {
      "user_id": 2,
      "customername": "jane",
      "cs_score": "805"
  },
  {
      "user_id": 1,
      "customername": "valaree",
      "cs_score": "0"
  }
];


//td: copy of tda - modify instead of changing original copy
/* var TransactionData = [...TransactionDataAll];

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
const cname = TransactionData.map(tran => tran.customername.toUpperCase());
const ucname = cname.filter(onlyUnique);
*/


// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // add style class
  
  // var nett = Math.abs(transaction.ontime) - Math.abs(transaction.late);
  // if (nett >= 0) {
  //   const ontime_item = document.createElement('li');
  //   ontime_item.classList.add('plus');
  //   ontime_item.innerHTML = `${transaction.customername}-${transaction.bank}  <span> $ ${Math.abs(nett)}</span>`;
  //   list.appendChild(ontime_item);
  //   } else {
  //     const late_item = document.createElement('li');
  //     late_item.classList.add('minus');
  //     late_item.innerHTML = `
  //     ${transaction.customername}-${transaction.bank} <span> -$ ${Math.abs(nett)}</span> `;
  //     list.appendChild(late_item);
  if(transaction.ontime == "1"){
    const ontime_item = document.createElement('li');
    ontime_item.classList.add('plus');
    ontime_item.innerHTML = `${transaction.bill_type} <span> ${transaction.bill_amount}</span>`;
    list.appendChild(ontime_item);
  }

  else if(transaction.ontime == "0"){
  const late_item = document.createElement('li');
  late_item.classList.add('minus');
  late_item.innerHTML = `${transaction.bill_type} <span> ${transaction.bill_amount}</span>`;
  list.appendChild(late_item);
  }
}
/*
function getAccount(e) {
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  $.getJSON('http://localhost:3000/account/all', updatecsvalue);
}
*/
// Update the balance, deposit and loan
function updatecsvalue(username) {
  var cs_filter = AccountDataAll.filter(acc => acc.customername.toUpperCase()== username);
  var customer_cs = cs_filter.map(cust => cust.cs_score);
  creditscore.innerHTML = `${customer_cs}`;
}



function updateValues(TransactionData) {
  // => same as callback function
  // forEach and map is almost the same but map create a new array while forEach doesnt
  const ontime_transaction = TransactionData.filter(tran => tran.ontime=="1");
  const ontime = ontime_transaction.map(transaction => parseFloat(transaction.bill_amount.slice(1)));
  const late_transaction = TransactionData.filter(tran => tran.ontime=="0");
  const late = late_transaction.map(transaction => parseFloat(transaction.bill_amount.slice(1)));
  const total_ontime = ontime.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const total_late = late.reduce((acc, item) => (acc += item), 0).toFixed(2);

   
  var piechart_data = {"Ontime" : total_ontime , "Late" : total_late}

  // Compute the position of each group on the pie:   
  var pie = d3.pie().value(function(d) { return d.value ;});
  var data_ready = pie(d3.entries(piechart_data))
  //radius for the arc   
  var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)
  
  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  var arc = g.selectAll(".arc")
     .data(data_ready)
     .enter()
     .append("g")
  
  arc.append("path")
     .attr("d", arcGenerator)
     .attr("fill", function(d) { return color(d.data.value); })
     .attr("stroke", "black")
     .style("stroke-width", "2px")
     .style("opacity", 0.7)


  arc.append("text")
      .text(function(d) { return d.data.key + ': $' + d.data.value; })
      .attr("transform", function(d) { return "translate( "+ arcGenerator.centroid(d) +" )"; })
      .style("text-anchor", "middle")
      .style("font-size", 15)

}

function init() {
  document.getElementById("yourcs").style.display="none";
  document.getElementById("csvalue").style.display="none";
  document.getElementById("overview").style.display="none";
  document.getElementById("piechart").style.display="none";
  document.getElementById("details").style.display="none";
  document.getElementById("list").style.display="none";
  //...: copy array to array
  //TransactionData = [...TransactionDataAll];
  //TransactionData.forEach(addTransactionDOM);
  //updateValues();
}

function filterTransaction(e) {
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  $.getJSON('http://localhost:3000/transactions/all', mydata);
}

//function filterTransaction(e) {
//  e.preventDefault();  //to prevent form from submitting and refreshing the page
function mydata(data){  
    //display elements after log-in
    document.getElementById("logo").style.display="none";
    document.getElementById("yourcs").style.display="";
    document.getElementById("yourcs").innerHTML = "Your Credit Score"
    document.getElementById("overview").style.display="";
    document.getElementById("csvalue").style.display="";
    document.getElementById("csvalue").innerHTML = "";
    document.getElementById("overview").innerHTML = "Overview";
    document.getElementById("piechart").style.display="";
    document.getElementById("details").style.display="";
    document.getElementById("details").innerHTML = "Details";  
    document.getElementById("list").style.display="";
    list.innerHTML = "";
    document.getElementById("b2").style.display=""; 
    document.getElementById("customerlogin").style.display="none";
    document.getElementById("formc").style.display="none";
    document.getElementById("b1").style.display="none";
    document.getElementById("error").style.display="none";
    //TransactionData = TransactionDataAll.filter(tran => tran.customername.toUpperCase() == custname.value.toUpperCase());
    let TransactionData = data.filter(tran => tran.customername.toUpperCase() == custname.value.toUpperCase());    
    TransactionData.forEach(addTransactionDOM);
    updateValues(TransactionData);
    updatecsvalue(custname.value.toUpperCase());
    //updatecsvalue(custname.value.toUpperCase()); 
    //hide elements not needed after log-in
   
   
}

/* if ((custname = "Jack") && (pwd = "123")) {

  filterTransaction();
} */

//init is the one initialising the data
init();
//form.addEventListener('submit', filterTransaction);
b1.addEventListener('click',filterTransaction);
b2.addEventListener('click',init);  //no need to call init. when no event handler it will reload/referesh the page


//Token balance button
const tokenBalanceBtn = document.getElementById("balance").onclick = async () => {
  // const account = await getCurrentAccount()
  // console.log(account)
  let balance = await getBalance()
  console.log(`Balance is: ${balance/(10**18)}`)
}