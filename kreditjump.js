// (c) Anuflora Systems 
const balance = document.getElementById('balance');
const money_plus = document.getElementById('deposit');
const money_minus = document.getElementById('loan');
const form = document.getElementById('form');
const uid = document.getElementById('userid');
//const custname = document.getElementById('custname');

const reco = document.getElementById('reco');
const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');

var width = 300
var height = 400
var margin = 10
var radius = Math.min(width, height) / 2 - margin

var svg = d3.select("#pieDiv")
  .append("svg")
    .attr("width", width)
    .attr("height", height)

var g = svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(['green','red'
     ]);
/*
const TransactionDataAll =[
  {
    "transaction_id": 1,
    "user_id": 2,
    "bill_type": "Eire",
    "bill_amount": 67.32,
    "ontime": "1"
},
{
    "transaction_id": 2,
    "user_id": 10,
    "bill_type": "Jabbersphere",
    "bill_amount": 67.52,
    "ontime": "0"
},
{
    "transaction_id": 3,
    "user_id": 7,
    "bill_type": "Trupe",
    "bill_amount": 49.16,
    "ontime": "0"
},
{
    "transaction_id": 4,
    "user_id": 9,
    "bill_type": "Katz",
    "bill_amount": 45.24,
    "ontime": "0"
},
{
    "transaction_id": 5,
    "user_id": 5,
    "bill_type": "Bubbletube",
    "bill_amount": 21.82,
    "ontime": "1"
},
{
    "transaction_id": 6,
    "user_id": 6,
    "bill_type": "DabZ",
    "bill_amount": 25.45,
    "ontime": "0"
},
{
    "transaction_id": 7,
    "user_id": 9,
    "bill_type": "Jabbercube",
    "bill_amount": 43.71,
    "ontime": "1"
},
{
    "transaction_id": 8,
    "user_id": 7,
    "bill_type": "Tagtune",
    "bill_amount": 61.60,
    "ontime": "1"
},
{
    "transaction_id": 9,
    "user_id": 8,
    "bill_type": "Brightbean",
    "bill_amount": 90.73,
    "ontime": "1"
},
{
    "transaction_id": 10,
    "user_id": 9,
    "bill_type": "Teklist",
    "bill_amount": 50.98,
    "ontime": "1"
}
];
*/

/*
const TransactionDataAll = [
   { "id": 1, customername: 'Flora', bank: 'DBS', "deposit": 3000, loan: 2000 },
   { "id": 1, customername: 'Flora', bank: 'OCBC', "deposit": 4000, loan: 2000 },
   { "id": 2, customername: 'Mikhil', bank: 'DBS', "deposit": 3000, loan: 2000 },
   { "id": 3, customername: 'Sashil', bank: 'UOB', "deposit": 6000, loan: 1000 },
   { "id": 4, customername: 'Jack', bank: 'UOB', "deposit": 6000, loan: 8000 },
   { "id": 5, customername: 'Jill', bank: 'UOB', "deposit": 7000, loan: 4000 },

  ];
*/
 var TransactionData = null;

function filterTransaction(e) {
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  $.getJSON('http://localhost:3000/transactions/all', mydata);
}

function mydata(data){
  const list = document.getElementById('list');
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = data.filter(tran => tran.user_id == uid.value);  
  TransactionData.forEach(addTransactionDOM);
  updateValues(); 
} 
/*
function filterTransaction(e) {
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  const list = document.getElementById('list');
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = TransactionDataAll.filter(tran => tran.user_id == uid.value);  
  TransactionData.forEach(addTransactionDOM);
  updateValues(); 
} 
*/
// Add transactions to DOM list
function addTransactionDOM(transaction) {
  if (transaction.ontime == 1){
  const deposit_item = document.createElement('li');
  deposit_item.classList.add('plus');
  deposit_item.innerHTML = `
  ${transaction.user_id}                <span> $ ${
    transaction.bill_amount
  }</span> 
  `;
  list.appendChild(deposit_item);
  }

  else if (transaction.ontime == 0){
    const deposit_item = document.createElement('li');
    deposit_item.classList.add('minus');
    deposit_item.innerHTML = `
    ${transaction.user_id}              <span> $ ${
      transaction.bill_amount
    }</span> 
    `;
    list.appendChild(deposit_item);
    }
}

  /*const loan_item = document.createElement('li');

  loan_item.classList.add('minus');
  loan_item.innerHTML = `
  ${transaction.customername}-${transaction.bank} <span> -$ ${Math.abs(
    transaction.loan  
  )}</span> 
  `;

  list.appendChild(loan_item);

  /*var data = [total_deposit, total_loan]; //4,8
  
  var svg = d3.select("body")
    .append('svg')
    .attr("width", 500) //500
    .attr("height",200); //200
  
  svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("transform",function(d, i) { return "translate("+160+","+i*25+")"  }) //20 ,25
    .attr("fill", 'cyan')
    .attr("height",20) 
    .attr("width", function(d) { return d /100 + "px"; });//*10
  
  svg.selectAll("text")
  .data([`DEPOSIT: $${total_deposit}`, `LOAN: $${total_loan}`]) //insert bar label
  .enter().append("text")
  .attr("transform",function(d, i) { return "translate(0,"+Number(i*25+15)+")" })
  .attr("fill",'black')
  .text(function(d) { return d });*/

  function updateValues() {
    const transaction_ontime = TransactionData.filter(tran => tran.ontime == 1);
    const transaction_late = TransactionData.filter(tran => tran.ontime == 0);
    const ontime = transaction_ontime.map(transaction => transaction.bill_amount);
    const late = transaction_late.map(transaction => transaction.bill_amount);
    const total_ontime = ontime.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const total_late = late.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const bal = total_ontime - total_late;
    balance.innerText = `$${bal}`;
    //money_plus.innerText = `$${total_deposit}`;
    //money_minus.innerText = `$${total_loan}`;
    reco.innerText = (bal >= 0)? "You Have Sound Financial Health": "Your Financial Health is Weak";
    
    
    var piedata = {"Ontime" : total_ontime , "Late" : total_late}

/*
// Update the balance, deposit and loan
function updateValues() {
  const deposits = TransactionData.map(transaction => transaction.deposit);//**
  const loans = TransactionData.map(transaction => transaction.loan);//** 
  const total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(2);//**
  const total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(2);//** 
  const bal = total_deposit - total_loan;//change to credit score
  balance.innerText = `$${bal}`;//change to credit score
  //money_plus.innerText = `$${total_deposit}`;
  //money_minus.innerText = `$${total_loan}`;
  reco.innerText = (bal >= 0)? "You Have Sound Financial Health": "Your Financial Health is Weak";
  
  
  var piedata = {"Deposits" : total_deposit , "Loans" : total_loan}
*/
  // Compute the position of each group on the pie:   
    var pie = d3.pie().value(function(d) { 
    return d.value;});
    var data_ready = pie(d3.entries(piedata))
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
       .style("opacity", 1.0)
  
       //console.log(arc);
  
    arc.append("text")
        .text(function(d) { return d.data.key + ':' + d.data.value; })
        .attr("transform", function(d) { return "translate( "+ arcGenerator.centroid(d) +" )"; })
        .style("text-anchor", "middle")
       
        
     
    if (total_deposit == 0 && total_loan == 0) {
    document.getElementById("pieDiv").innerHTML = "<p> User not found </p>";
  }
  
}

function init() {
  
  list.innerHTML = '';
  list.innerHTML = '';
  reco.innerHTML = '';
  //TransactionData = [...TransactionDataAll];
  //TransactionData.forEach(addTransactionDOM);
  //updateValues();
}

/* if ((custname = "Jack") && (pwd = "123")) {

  filterTransaction();
} */

init();
//form.addEventListener('submit', filterTransaction);
b1.addEventListener('click',filterTransaction);
b2.addEventListener('click',init);  //no need to call init. when no event handler it will reload/referesh the page
//////////////////////////////////////////////////////////////////////////////////////////
