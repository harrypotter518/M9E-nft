import { Faq_Header } from "../components/faq/faq-header";
import { Banner2 } from "../components/banner2";
import { SubFooter } from "../components/sub-footer";
import { FaqContent } from "../components/faq/faq-content";

const Register = (props) => {
  const { metamaskConnected, account, setMetamaskConnnected } = props;
  return (
    <div>
      <Faq_Header metamaskConnected={metamaskConnected} setMetamaskConnnected={setMetamaskConnnected} account={account}/>
      <FaqContent />
      <Banner2 />
      <SubFooter />
    </div>
  );
};

export default Register;
