// (c) Anuflora Systems 
const creditscore = document.getElementById('csvalue');
const list = document.getElementById('list');
const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');
const b3 = document.getElementById('b3');

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

const TransactionDataAll = [
{ "transaction_id": 1,
  "user_id": 1,
  "bill_type": "Eire",
  "bill_amount": 67.32,
  "ontime": 1
},
{
  "transaction_id": 2,
  "user_id": 2,
  "bill_type": "Jabbersphere",
  "bill_amount": 67.52,
  "ontime": 0
},
{ "transaction_id": 3,
  "user_id": 1,
  "bill_type": "Trupe",
  "bill_amount": 49.16,
  "ontime": 0
},
{ "transaction_id": 4,
  "user_id": 2,
  "bill_type": "Katz",
  "bill_amount": 45.24,
  "ontime": 1
}
];

const AccountDataAll = [
  { "firstname": "Jon",
    "lastname": "Kratz",
    "username": "jk123",
    "password": "jk123",
    "user_id": 1,
    "cs_score": 555
  },
  {
    "firstname": "Flora",
    "lastname": "Kimchi",
    "username": "fk123",
    "password": "fk123",
    "user_id": 2,
    "cs_score": 666
  },
];

const all_username = AccountDataAll.map(person => person.username);

//td: copy of tda - modify instead of changing original copy
 var TransactionData = [...TransactionDataAll];

// Add transactions to DOM list
function updatetransaction(transaction) {
  if(transaction.ontime == 1){
    const ontime_item = document.createElement('li');
    ontime_item.classList.add('plus');
    ontime_item.innerHTML = `${transaction.bill_type} <span> $${transaction.bill_amount}</span>`;
    list.appendChild(ontime_item);
  }

  else if(transaction.ontime == 0){
  const late_item = document.createElement('li');
  late_item.classList.add('minus');
  late_item.innerHTML = `${transaction.bill_type} <span> $${transaction.bill_amount}</span>`;
  list.appendChild(late_item);
  }
}

function updatecsvalue(userid) {
  var cs_filter = AccountDataAll.filter(acc => acc.user_id == userid);
  var customer_cs = cs_filter.map(cust => cust.cs_score);
  creditscore.innerHTML = `${customer_cs}`;
}

function updateValues() {
  const ontime_transaction = TransactionData.filter(tran => tran.ontime==1);
  const ontime = ontime_transaction.map(transaction => transaction.bill_amount);
  const late_transaction = TransactionData.filter(tran => tran.ontime==0);
  const late = late_transaction.map(transaction => transaction.bill_amount);
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
  document.getElementById("welcome").style.display="none";
  document.getElementById("yourcs").style.display="none";
  document.getElementById("csvalue").style.display="none";
  document.getElementById("overview").style.display="none";
  document.getElementById("piechart").style.display="none";
  document.getElementById("details").style.display="none";
  document.getElementById("list").style.display="none";
  document.getElementById("b2").style.display="none";
  document.getElementById("b3").style.display="none"
}

function login(e) {
  e.preventDefault();
  if (all_username.includes(username.value)) {
    const user = AccountDataAll.filter(tran => tran.username == username.value);
    const user_fn = user.map(user => user.firstname);
    const userkey = user.map(user => user.password);
    const userid = user.map(user => user.user_id);
    if (userkey == password.value) {
      successlogin(user_fn, userid);
     } else {
      document.getElementById("error").innerHTML = "Your username and/or password is incorrect";
      document.getElementById("error").style.color = "red";
     }
  } else {
    document.getElementById("error").innerHTML = "Your username and/or password is incorrect";
    document.getElementById("error").style.color = "red";
  }
}

function successlogin(user_fn, userid) {
  document.getElementById("welcome").style.display="";
  document.getElementById("welcome").innerHTML = "Welcome back, ".concat(user_fn, "!");
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
  document.getElementById("b3").style.display=""; 
  document.getElementById("b2").style.display=""; 
  TransactionData = TransactionDataAll.filter(tran => tran.user_id == userid);  
  TransactionData.forEach(updatetransaction);
  updateValues();
  updatecsvalue(userid);

  //hide elements not needed after log-in
  document.getElementById("logo").style.display="none";
  document.getElementById("error").style.display="none";
  document.getElementById("customerlogin").style.display="none";
  document.getElementById("formc").style.display="none";
  document.getElementById("b1").style.display="none";
  
}

//init is the one initialising the data
init();
//form.addEventListener('submit', filterTransaction);
b1.addEventListener('click',login);
b2.addEventListener('click',init);  //no need to call init. when no event handler it will reload/referesh the page
