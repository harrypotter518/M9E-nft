import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { onCheckUser } from "../redux/actions";
import { Header } from "../components/register/register-header";
import { Banner2 } from "../components/banner2";
import { SubFooter } from "../components/sub-footer";
import { Verify } from "../components/register/verify";

const Register = (props) => {
  const { metamaskConnected, account, setMetamaskConnnected } = props;
  const verify = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (account) {
      dispatch(
        onCheckUser({
          address: account,
        })
      );
    }
  }, [account]);

  return (
    <div>
      <Header
        flag={verify.user_check && !verify.signup_success ? true : false}
        activateBrowserWallet = {activateBrowserWallet}
        metamaskConnected={metamaskConnected} setMetamaskConnnected={setMetamaskConnnected} account={account}
      />
      {verify.user_check && !verify.signup_success ? (
        <>
          <Verify metamaskConnected={metamaskConnected} setMetamaskConnnected={setMetamaskConnnected} account={account}/>
          <Banner2 />
        </>
      ) : (
        <div style={{ height: "100px" }}></div>
      )}
      <SubFooter />
    </div>
  );
};

export default Register;
