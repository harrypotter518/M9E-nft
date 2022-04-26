import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Header } from "../components/mint/mint-header";
import { Banner2 } from "../components/banner2";
import { SubFooter } from "../components/sub-footer";
import { MintSection } from "../components/mint/mintSection";
import { onCheckMintable } from "../redux/actions";

const Mint = (props) => {
  const dispatch = useDispatch();
  const { metamaskConnected, account, setMetamaskConnnected } = props;
  const [preLoading, setPreLoading] = useState(false);

  useEffect(() => {
    if (account) {
      setPreLoading(true);
      dispatch(
        onCheckMintable({
          address: account,
        })
      );
    }
  }, [account]);

  return (
    <div>
      <Header metamaskConnected={metamaskConnected} setMetamaskConnnected={setMetamaskConnnected} account={account}/>
      <MintSection setPreLoading={setPreLoading} preLoading={preLoading} account={account}/>
      <Banner2 />
      <SubFooter />
    </div>
  );
};

export default Mint;
