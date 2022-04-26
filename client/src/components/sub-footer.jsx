import twitterIcon from "../assets/images/twitter_icon.png";
import discordIcon from "../assets/images/discord_icons.png";
import socialIcon from "../assets/images/social icon.png";
import { Link } from 'react-router-dom';

export const SubFooter = () => {
    return(
        <div id="sub-footer">
        <div className="container">
          <div className="col-sm-4 footer-1">
            <p>&copy; 2021 Master9eyes.</p>
            <p>All right reserved</p>
          </div>
          <div className="col-sm-4">
            <div className="footer-2">
              <a href="https://twitter.com/Master9Eyes" target="_blank" rel="noreferrer">
                <img src={twitterIcon} className="social-icons blue" alt="twitterIcon"></img>
              </a>
              <a href="https://discord.gg/m9e" target="_blank" rel="noreferrer">
                <img src={discordIcon} className="social-icons blue" alt="discordIcon"></img>
              </a>
              <a href="https://opensea.io/collection/master9eyes" target="_blank" rel="noreferrer">
                <img src={socialIcon} className="social-icons blue" alt="socialIcon"></img>
              </a>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="footer-right">
              <div className="footer-3">
                <Link to="/" rel="nofollow">
                  HOME
                </Link>
                <br />
                <Link to="/faq" rel="nofollow">
                  FAQ
                </Link>
              </div>
              <div className="footer-4">
                <a href="https://etherscan.io/address/0x7Cf7F5383496E17Cf742464606AeeA24F715DBdE#code" target="_blank" rel="noreferrer">
                  SMART CONTRACT
                </a>
                <br />
                <Link to="/terms" rel="nofollow">
                  TERMS & CONDITIONS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}