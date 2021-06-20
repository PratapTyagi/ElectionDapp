import { useEffect } from "react";
import "./App.css";
import Electionabi from "./contracts/Election.json";
import Web3 from "web3";

function App() {
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
    const web3 = window.web3;

    const accounts = web3.eth.getAccounts();
    const account = accounts[0];

    const networkId = await web3.eth.net.getId();
    const networkData = Electionabi.networks[networkId];

    if (networkData) {
      const election = new web3.eth.Contract(
        Electionabi.abi,
        networkData.address
      );
      console.log(election);
    } else {
      window.alert("Smart contract not deployed on current network");
    }
  };

  return (
    <div className="app">
      <h1>Starter</h1>
    </div>
  );
}

export default App;
