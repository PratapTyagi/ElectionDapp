import { useEffect, useState } from "react";
import "./App.css";
import Electionabi from "./contracts/Election.json";
import Web3 from "web3";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    setLoader(true);
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentAccount(account);

    const networkId = await web3.eth.net.getId();
    const networkData = Electionabi.networks[networkId];

    if (networkData) {
      const election = new web3.eth.Contract(
        Electionabi.abi,
        networkData.address
      );
      setLoader(false);
      console.log(election);
    } else {
      window.alert("Smart contract not deployed on current network");
    }
  };

  if (loader) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar currentAccount={currentAccount} />
    </div>
  );
}

export default App;
