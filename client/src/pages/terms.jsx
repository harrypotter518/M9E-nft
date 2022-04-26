import { Header } from "../components/terms/terms-header";
import { Banner2 } from "../components/banner2";
import { SubFooter } from "../components/sub-footer";
import { TermsContent } from "../components/terms/terms-content";

const Terms = (props) => {
  const { metamaskConnected, account, setMetamaskConnnected } = props;
  return (
    <div>
      <Header metamaskConnected={metamaskConnected} setMetamaskConnnected={setMetamaskConnnected} account={account}/>
      <TermsContent />
      <Banner2 />
      <SubFooter />
    </div>
  );
};

export default Terms;
