//Token balance button
const ERC20_Bal = document.getElementById("balance")
const tokenBalanceBtn = document.getElementById("balanceBtn").onclick = async () => {
  // const account = await getCurrentAccount()
  // console.log(account)
  let balance = await getBalance()
  console.log(`Balance is: ${balance/(10**18)}`)
  ERC20_Bal.innerHTML = `Your ERC20 tokens balance is ${balance/(10**18)}`
}

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
}

const ERCTokenAdd = '0x55Db1a523218d2f598D89B45674F7A5dc2eC7abB'

const ABI_for_balanceOf = [{
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  }]

async function getBalance() {
    await loadWeb3();
    const tokenInst = new web3.eth.Contract(ABI_for_balanceOf, ERCTokenAdd);
    const balance = await tokenInst.methods.balanceOf('0xE48B5ada7538037B591B3245F433BF99b0Ca42BE').call()
    return balance;
}

async function getCurrentAccount() {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
}

export {getBalance, getCurrentAccount}