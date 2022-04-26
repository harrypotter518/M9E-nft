import { SubFooter } from "./sub-footer";
import arrow from "../assets/images/arrow.png";

export const Footer = (props) => {
  return (
    <div>
      <div id="footer">
        <div className="container">
          <h1>
            <img src={arrow} className="arrow-icon" alt="arrow-icon"></img>THE
            TEAM
          </h1>
          <div className="team">
            <div className="row">
              <div className="col-md-3">
                <a href="https://twitter.com/dayton3r" target="_blank" rel="noreferrer">
                  <div className="data-list art">
                    <div className="footer-title">
                      <p>
                        <span>ART LEAD:</span>
                        <br /> @DAYTONER
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="https://twitter.com/Arnaud_M9E" target="_blank" rel="noreferrer">
                  <div className="data-list project">
                    <div className="footer-title">
                      <p>
                        <span>PROJECT LEAD:</span>
                        <br /> @ARNAUD
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a
                  href="https://www.linkedin.com/in/ken-yamada-17b27721b"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="data-list development">
                    <div className="footer-title">
                      <p>
                        <span>DEVELOPMENT LEAD:</span>
                        <br /> @KEN
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="https://twitter.com/Krip50x" target="_blank" rel="noreferrer">
                  <div className="data-list community">
                    <div className="footer-title">
                      <p>
                        <span>COMMUNITY LEAD:</span>
                        <br /> @HUNTER
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubFooter />
    </div>
  );
};
