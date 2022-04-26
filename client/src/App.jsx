import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./pages/main";
// import Register from "./pages/register";
import WaitList from "./pages/waitlist";
import Mint from "./pages/mint";
import FAQ from "./pages/faq";
import Terms from "./pages/terms";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";
import Web3 from "web3";
import "./App.css";

const App = () => {
  const [metamaskConnected, setMetamaskConnnected] = useState(false);
  const [account, setAccount] = useState();
  const [networkId, setNetworkId] = useState();

  useEffect(async () => {
    await loadWeb3();
    await loadBlockchainData();
  });

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
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
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    setNetworkId(networkId);

    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) setAccount(accounts[0]);
      else setAccount();
    });
    window.ethereum.on("networkChanged", (networkId) => {
      setNetworkId(networkId);
    });

    if (accounts.length == 0) {
      setMetamaskConnnected(false);
    } else {
      setMetamaskConnnected(true);
      setAccount(accounts[0]);
    }
  };

  return (
    <Provider store={store}>
      {networkId != 1 && metamaskConnected && (
        <div className="network-err-msg">
          <h1>To use master9eyes, please switch to main network</h1>
        </div>
      )}
      <Router>
        <ScrollToTop />
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Main
                  metamaskConnected={metamaskConnected}
                  setMetamaskConnnected={setMetamaskConnnected}
                  account={account}
                />
              }
            />
            {/* <Route exact path="/register" element={<Register />} /> */}
            <Route
              exact
              path="/waitlist"
              element={
                <WaitList
                  metamaskConnected={metamaskConnected}
                  account={account}
                  setMetamaskConnnected={setMetamaskConnnected}
                />
              }
            />
            <Route
              exact
              path="/mint"
              element={
                <Mint
                  metamaskConnected={metamaskConnected}
                  setMetamaskConnnected={setMetamaskConnnected}
                  account={account}
                />
              }
            />
            <Route
              exact
              path="/faq"
              element={
                <FAQ
                  metamaskConnected={metamaskConnected}
                  setMetamaskConnnected={setMetamaskConnnected}
                  account={account}
                />
              }
            />
            <Route
              exact
              path="/terms"
              element={
                <Terms
                  metamaskConnected={metamaskConnected}
                  account={account}
                  setMetamaskConnnected={setMetamaskConnnected}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
