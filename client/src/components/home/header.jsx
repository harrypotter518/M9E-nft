import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/M9E decals.png";
import twitterIcon from "../../assets/images/twitter_icon.png";
import discordIcon from "../../assets/images/discord_icons.png";
import socialIcon from "../../assets/images/social icon.png";
import mint from "../../assets/images/mint.png";

export const Header = (props) => {
  const navigate = useNavigate();
  const { metamaskConnected, account, setMetamaskConnnected } = props;

  const handleConnectWallet = async () => {
    await window.ethereum.enable();
    setMetamaskConnnected(true);
    window.location.reload();
  };

  const verificaton = () => {
    navigate("/register");
  };

  const waitlist = () => {
    navigate("/waitlist");
  };

  const goMint = () => {
    navigate("/mint");
  }
  return (
    <header id="header">
      <div className="intro intro-back">
        <div className="logo">
          <Link to="/" rel="nofollow">
            <img src={logo} alt="logo"></img>
          </Link>
        </div>
        <div className="navbar">
          <a
            href="https://twitter.com/Master9Eyes"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={twitterIcon}
              className="social-icons purple"
              alt="twitterIcon"
            ></img>
          </a>
          <a href="https://discord.gg/m9e" target="_blank" rel="noreferrer">
            <img
              src={discordIcon}
              className="social-icons"
              alt="discordIcon"
            ></img>
          </a>
          <a
            href="https://opensea.io/collection/master9eyes"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={socialIcon}
              className="social-icons"
              alt="socialIcon"
            ></img>
          </a>
          {metamaskConnected ? (
            <div className="address-purple">
              {account &&
                `${account.substring(0, 6)}...${account.substring(
                  account.length - 4
                )}`}
            </div>
          ) : (
            <button
              className="btn btn-wallet btn-lg page-scroll"
              onClick={handleConnectWallet}
            >
              CONNECT WALLET
            </button>
          )}
        </div>
        {/* <div className="registration text-center">
          <a
            className="btn btn-custom btn-lg page-scroll"
            href="https://opensea.io/collection/master9eyes"
            target="_blank"
          >
            COMING SOON
            <img src={mint} className="mint-script" alt="mint-script"></img>
          </a>{" "}
          <br />
        </div> */}
        {/* <div className="registration text-center">
          <a
            className="btn btn-custom btn-lg page-scroll"
            onClick={verificaton}
          >
            WHITELIST REGISTRATION
            <img src={mint} className="mint-script" alt="mint-script"></img>
          </a>{" "}
          <br />
        </div> */}
        {/* <div className="registration text-center">
          <button
            className="btn btn-custom btn-lg page-scroll"
            onClick={waitlist}
          >
            WAITLIST REGISTRATION
            <img src={mint} className="mint-script" alt="mint-script"></img>
          </button>{" "}
          <br />
        </div> */}
        <div className="registration text-center">
          <button
            className="btn btn-custom btn-lg page-scroll"
            onClick={goMint}
          >
            MINT
            <img src={mint} className="mint-script" alt="mint-script"></img>
          </button>{" "}
          <br />
        </div>
      </div>
    </header>
  );
};
