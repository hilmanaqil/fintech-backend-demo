let users = [
  {
    first_name: "Dena",
    last_name: "Charle",
    email: "dcharle0@indiegogo.com",
    user_id: 1,
    phone: "98765433",
    plan_id: 1,
    signup_date: "2021-01-01T00:00:00.000Z",
  },
  {
    first_name: "Dynah",
    last_name: "Waiting",
    email: "dwaiting1@google.com.br",
    user_id: 2,
    phone: "98765434",
    plan_id: 1,
    signup_date: "2021-01-01T00:00:00.000Z",
  },
  {
    first_name: "Marc",
    last_name: "Conibeer",
    email: "mconibeer2@desdev.cn",
    user_id: 3,
    phone: "98765555",
    plan_id: 1,
    signup_date: "2021-01-01T00:00:00.000Z",
  },
];

let accounts = [
  {
    user_id: 1,
    account_id: 1,
    account_name: "Fred Nerk Cheque",
    account_type: "Cheque",
    balance: 200,
    credit_limit: 0,
  },
  {
    user_id: 1,
    account_id: 2,
    account_name: "Fred Nerk Savings",
    account_type: "Savings",
    balance: 10000,
    credit_limit: 0,
  },
  {
    user_id: 1,
    account_id: 3,
    account_name: "Fred Nerk Credit Card",
    account_type: "Credit",
    balance: -243,
    credit_limit: 10000,
  },
  {
    user_id: 2,
    account_id: 4,
    account_name: "Joe Bloggs Cheque",
    account_type: "Cheque",
    balance: 1400,
    credit_limit: 0,
  },
];

function get_all_users() {
  return users;
}
function get_user_by_user_id(user_id) {
  for (i = 0; i < users.length; i++) {
    if (users[i].user_id == user_id) {
      return users[i];
    }
  }
}

function get_all_accounts() {
  return accounts;
}

function get_account_by_account_id(account_id) {
  for (i = 0; i < accounts.length; i++) {
    if (accounts[i].account_id == account_id) {
      return accounts[i];
    }
  }
}

function add_user(user) {
  users.push(user);
}

function add_account(account) {
  users.push(account);
}

module.exports = {
  add_user,
  get_all_users,
  get_user_by_user_id,
  add_account,
  get_all_accounts,
  get_account_by_account_id,
};
