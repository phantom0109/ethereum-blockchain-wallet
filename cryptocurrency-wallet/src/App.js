import "./App.css";
import Web3 from "web3";
import { useEffect, useState } from "react";
import NiceToken from "./NiceToken.json";

function App() {
  const [balance, setbalance] = useState(0);
  const [account, setAccount] = useState("");
  const [niceContract, setContract] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const loadWeb3 = async () => {
      // Connect to Local blockchain network
      window.web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:7545")
      );
      // To Connect to MetaMask
      // window.web3 = new Web3(window.ethereum);
    };

    const loadBlockchainData = async () => {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const niceContractAddress = "0x9C9C4c2020B5F4aBf1cAfF46d6d68f80fff4E7ad"; // Contract Address Here
      const niceTokenContract = new web3.eth.Contract(
        NiceToken.abi,
        niceContractAddress
      );
      setContract(niceTokenContract);
      console.log(accounts);
      setAccounts(accounts);
      setAccountDetails(niceTokenContract, accounts[0]);
    };
    loadWeb3();
    loadBlockchainData();
  }, []);

  const setAccountDetails = async (niceContract, accountValue) => {
    const web3 = window.web3;
    setAccount(accountValue);
    const balance = await niceContract.methods.balanceOf(accountValue).call();
    setbalance(web3.utils.fromWei(balance.toString()));
  };

  const transfer = async (recipient, amount) => {
    console.log(recipient, amount);
    await niceContract.methods
      .transfer(recipient, amount)
      .send({ from: account });
    await setAccountDetails(niceContract, account);
  };

  const handleReceipient = (e) => {
    setRecipient(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const onSelectChange = (e) => {
    setAccountDetails(niceContract, e.target.value);
  };
  return (
    <div className="App">
      <div className="m-5" style={{ width: "600px" }}>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div>
          <h3> Select From Account: </h3>
          <select id="acc" onChange={(e) => onSelectChange(e)}>
            {accounts.map((accAddress) => (
              <option value={accAddress} key={accAddress}>
                {accAddress}
              </option>
            ))}
          </select>
        </div>
        <h1 className="mt-3">{balance + " Nice"}</h1>
        <p></p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const value = window.web3.utils.toWei(amount, "Ether");
            console.log(recipient, value);
            transfer(recipient, value);
          }}
        >
          <h4 className="mt-5"> Sent to </h4>
          <div>
            <input
              id="recipient"
              type="text"
              onChange={(e) => handleReceipient(e)}
              className="form-control"
              placeholder="Recipient Address"
              required
            />
          </div>
          <div className="mt-2">
            <input
              id="amount"
              type="text"
              onChange={(e) => handleAmount(e)}
              className="form-control"
              placeholder="Amount"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Send Nice
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
