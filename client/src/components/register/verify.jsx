import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  onBalanceCheck,
  // onTwitterVerify,
  onDiscordVerify,
  onRetweetVerify,
  onSignUp,
  onCheckUser,
} from "../../redux/actions";
import ReCAPTCHA from "react-google-recaptcha";
import swal from "sweetalert";
import ReactLoading from "react-loading";

export const Verify = (props) => {
  const { metamaskConnected, account, setMetamaskConnnected } = props;
  const verify = useSelector((state) => state.auth);
  //states
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "",
    captcha: "",
  });
  const [twitterUserName, setTwitterUserName] = useState("");
  const [discordUserName, setDiscordUserName] = useState("");
  const [captchaToken, setCaptchaToken] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [disable, setDisable] = useState(true);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [discordLoading, setDiscordLoading] = useState(false);
  // const [twitterLoading, setTwitterLoading] = useState(false);
  const [retweetLoading, setRetweetLoading] = useState(false);
  const [checkBalanceLoading, setCheckBalanceLoading] = useState(false);

  const dispatch = useDispatch();

  const handleConnectWallet = async () => {
    await window.ethereum.enable();
    setMetamaskConnnected(true);
    window.location.reload();
  };

  useEffect(() => {
    if (
      verify.checkBalance &&
      verify.checkDiscord &&
      verify.checkRetweet &&
      captchaToken != null
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    stopLoading();
  }, [verify, captchaToken]);

  useEffect(() => {
    if (account) {
      dispatch(
        onCheckUser({
          address: account,
        })
      );
    }
  }, [account]);

  const stopLoading = () => {
    setSignUpLoading(false);
    setDiscordLoading(false);
    setCheckBalanceLoading(false);
    setRetweetLoading(false);
    // setTwitterLoading(false);
  };

  const balanceCheck = () => {
    if (account) {
      setCheckBalanceLoading(true);
      dispatch(
        onBalanceCheck({
          address: account,
        })
      );
    } else {
      swal("Warning!", "Please connect wallet!", "warning");
      // alert("Please connect wallet");
    }
  };

  // const verifyTwitter = () => {
  //   if (twitterUserName == "") {
  //     swal("Warning!", "Please input your twitter username!", "warning");
  //   } else {
  //     setTwitterLoading(true);
  //     dispatch(
  //       onTwitterVerify({
  //         twitterUserName: twitterUserName,
  //       })
  //     );
  //   }
  // };

  const retweetVerify = () => {
    if (twitterUserName == "") {
      swal("Warning!", "Please input your twitter username!", "warning");
    } else {
      setRetweetLoading(true);
      dispatch(
        onRetweetVerify({
          twitterUserName: twitterUserName,
        })
      );
    }
  };

  const verifyDiscord = () => {
    if (discordUserName == "") {
      swal("Warning!", "Please input your discord username!", "warning");
    } else {
      setDiscordLoading(true);
      dispatch(
        onDiscordVerify({
          discordUserName: discordUserName,
        })
      );
    }
  };

  const signUp = () => {
    if (!disable) {
      if (twitterUserName == "") {
        swal("Warning!", "Please input your twitter username!", "warning");
      } else if (discordUserName == "") {
        swal("Warning!", "Please input your discord username!", "warning");
      } else {
        setSignUpLoading(true);
        dispatch(
          onSignUp({
            address: account,
            twitterUserName: twitterUserName,
            discordUserName: discordUserName,
            email: userEmail,
          })
        );
      }
    }
  };

  return (
    <div id="verify" className="text-center">
      <div className="verify-container">
        <div className="step1">
          <div className="row">
            <div className="col-md-3">
              <div className="step-title d-flex">
                <h1>STEP 1</h1>
              </div>
            </div>
            <div className="col-md-9 d-flex">
              <div className="step-content">
                <h4>CONNECT YOUR METAMASK WALLET.*</h4>
                <p>
                  *A balance verification will occur, you should have 0,1Ξ to be
                  whitelisted. This won't cost any gas fee.
                </p>
              </div>
              <div className="step-button">
                {account ? (
                  <div className="blue-address">
                    {account &&
                      `${account.substring(0, 6)}...${account.substring(
                        account.length - 4
                      )}`}
                  </div>
                ) : (
                  <button
                    className="btn btn-wallet-blue btn-lg page-scroll balance"
                    onClick={handleConnectWallet}
                  >
                    CONNECT WALLET
                  </button>
                )}
                {verify.checkBalance == true ? (
                  <span className="tickIcon">&#10003;</span>
                ) : (
                  <>
                    {!checkBalanceLoading ? (
                      <a
                        className="btn btn-wallet-blue btn-lg page-scroll balance mt-5"
                        onClick={balanceCheck}
                      >
                        Verify Balance
                      </a>
                    ) : (
                      <div className="mt-5 d-inline-block">
                        <ReactLoading type="spin" color="#0affff" />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="step2">
          <div className="row">
            <div className="col-md-3">
              <div className="step-title d-flex">
                <h1>STEP 2</h1>
              </div>
            </div>
            <div className="col-md-9">
              <div className="d-flex">
                <div className="step-content">
                  <h4 style={{ marginBottom: "50px" }}>
                    TWITTER AND DISCORD VERIFICATION.
                  </h4>
                  <p>
                    <span className="blue-color">2 - 1 </span>
                    <span>Click the "Follow" </span>
                    button below to follow our Twitter account. Use the
                    <span> `Verify`</span>
                    button to complete this step.
                  </p>
                </div>
                <div className="step-button social-btn">
                  <div className="d-flex">
                    <a className="verify-social twitter">
                      {/* <img
                        src="img/blue-twitter-icon.jpg"
                        alt="twitterIcon"
                        className="verify-social"
                      ></img> */}
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a className="verify-social discord">
                      {/* <img
                        src="img/blue-discord-icon.jpg"
                        alt="discordIcon"
                        className="verify-social"
                      ></img> */}
                      <i className="fab fa-discord"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="d-flex" style={{ marginTop: "50px" }}>
                <div className="step-content">
                  <p className="d-flex m-b">
                    <img src="img/blue-arrow-icon.jpg"></img>
                    <span className="blue-color url">
                      https://twitter.com/Master9eyes
                    </span>
                  </p>
                  {/* <p className="blue-color m-b">
                    <img
                      src="img/blue-twitter-icon.jpg"
                      style={{ marginRight: "10px" }}
                    ></img>
                    Type your username to Verify
                  </p> */}
                </div>
                <div className="step-button-special">
                  <a
                    href="https://twitter.com/Master9Eyes"
                    target="_blank"
                    className="btn btn-verify btn-lg page-scroll"
                  >
                    FOLLOW
                  </a>
                </div>
              </div>
              {/* <div className="d-flex">
                <div className="step-content d-flex" style={{ flex: 1 }}>
                  <p className="w-100" style={{ flex: 1 }}>
                    Your twitter username:
                  </p>
                  <input
                    type="text"
                    className="w-100 input-info"
                    style={{ flex: 1 }}
                    value={twitterUserName}
                    placeholder="ex: Tom_M9E"
                    onChange={(e) => {
                      setTwitterUserName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="step-button" style={{ margin: 0 }}>
                  {verify.checkTwitter == true ? (
                    <span className="tickIcon">&#10003;</span>
                  ) : (
                    <>
                      {!twitterLoading ? (
                        <a
                          className="btn btn-verify btn-lg page-scroll"
                          onClick={verifyTwitter}
                        >
                          Verify
                        </a>
                      ) : (
                        <ReactLoading type="spin" color="#0affff" />
                      )}
                    </>
                  )}
                </div>
              </div> */}
              <div
                className="d-flex"
                style={{ marginTop: "50px", marginBottom: "100px" }}
              >
                <div className="step-content">
                  <p className="step2-2">
                    <span className="blue-color">2 - 2 </span>
                    <span>Retweet </span>
                    the following tweet.
                    <span> Use the `Verify`</span>
                    button to complete this step.
                  </p>
                  {/* <p className="d-flex m-b">
                    <img src="img/blue-arrow-icon.jpg" className="url-arrow"></img>
                    <span className="blue-color retweet-url">
                      https://twitter.com/master9eyes/status/1463172357959389199
                    </span>
                  </p> */}
                  <p className="w-100" style={{ flex: 1 }}>
                    Your twitter username:
                  </p>
                  <input
                    type="text"
                    className="w-100 input-info"
                    style={{ flex: 1 }}
                    value={twitterUserName}
                    placeholder="ex: Tom_M9E"
                    onChange={(e) => {
                      setTwitterUserName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="step-button m-l-25">
                  <a
                    className="btn btn-twitter btn-lg page-scroll d-flex align-items-center"
                    href="https://twitter.com/intent/retweet?tweet_id=1465721850453975045&original_referer=https://master9eyes.com"
                    target="_blank"
                  >
                    <i className="fab fa-twitter"></i>
                    RETWEET
                  </a>
                  <h1>&</h1>
                  {verify.checkRetweet == true ? (
                    <span className="tickIcon">&#10003;</span>
                  ) : (
                    <>
                      {!retweetLoading ? (
                        <a
                          className="btn btn-verify btn-lg page-scroll float-right"
                          onClick={retweetVerify}
                        >
                          Verify
                        </a>
                      ) : (
                        <div className="d-inline-block">
                          <ReactLoading type="spin" color="#0affff" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="d-flex">
                <div className="step-content flex-5">
                  <p style={{ marginBottom: "40px" }}>
                    <span className="blue-color">2 - 3 </span>
                    <span>Join our Discord channel. </span>
                    Become a community member for platform updates, giveaways
                    and much more!
                  </p>
                  <p>
                    <span>Find your Discord ID </span>
                    through account options (on PC) or use the profile button
                    (on mobile). Your ID must include the # and numbers
                    included.
                  </p>
                </div>
                <div className="step-button flex-2"></div>
              </div>
              <div className="d-flex" style={{ marginTop: "50px" }}>
                <div className="step-content w-120">
                  <p style={{ marginBottom: "50px" }} className="d-flex">
                    <img src="img/blue-arrow-icon.jpg"></img>
                    <span className="blue-color url">
                      https://discord.gg/m9e
                    </span>
                  </p>
                  <p className="blue-color" style={{ marginBottom: "50px" }}>
                    <img
                      src="img/blue-discord-icon.jpg"
                      style={{ marginRight: "10px" }}
                    ></img>
                    Type your discord ID to Verify
                  </p>
                </div>
                <div className="step-button-special">
                  <a
                    className="btn btn-discord btn-lg page-scroll"
                    href="https://discord.gg/m9e"
                    target="_blank"
                  >
                    JOIN OUR DISCORD
                  </a>
                </div>
              </div>
              <div className="d-flex">
                <div className="step-content d-flex" style={{ flex: 1 }}>
                  <p className="w-100" style={{ flex: 1 }}>
                    Your Discord ID:
                  </p>
                  <input
                    type="text"
                    className="w-100 input-info"
                    value={discordUserName}
                    placeholder="ex: Tom#5019"
                    onChange={(e) => {
                      setDiscordUserName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="step-button" style={{ margin: 0 }}>
                  {verify.checkDiscord == true ? (
                    <span className="tickIcon">&#10003;</span>
                  ) : (
                    <>
                      {!discordLoading ? (
                        <a
                          className="btn btn-verify btn-lg page-scroll"
                          onClick={verifyDiscord}
                        >
                          Verify
                        </a>
                      ) : (
                        <ReactLoading type="spin" color="#0affff" />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="step3">
          <div className="row">
            <div className="col-md-3">
              <div className="step-title d-flex">
                <h1>STEP 3</h1>
              </div>
            </div>
            <div className="col-md-9">
              <div className="d-flex">
                <div className="step-content">
                  <h4>
                    OPTIONAL*: EMAIL ADDRESS FOR NOTIFICATIONS OR NEWSLETTERS,
                    ETC.
                  </h4>
                </div>
                <div className="step-button m-l-25">
                  <a className="btn btn-mail btn-lg page-scroll">
                    <i className="fa fa-envelope"></i>
                  </a>
                </div>
              </div>
              <div className="d-flex" style={{ marginTop: "30px" }}>
                <div className="step-content d-flex" style={{ flex: 1 }}>
                  <p className="w-100" style={{ flex: 1 }}>
                    *Your Email:
                  </p>
                  <input
                    type="text"
                    className="w-100 input-info"
                    style={{ flex: 3 }}
                    value={userEmail}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="step-button" style={{ margin: 0 }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="step4">
          <div className="row">
            <div className="col-md-3">
              <div className="step-title d-flex">
                <h1>STEP 4</h1>
              </div>
            </div>
            <div className="col-md-9">
              <div className="d-flex">
                <div className="step-content">
                  <h4>GOOGLE RECAPTCHA VERIFICATION.</h4>
                </div>
                <div className="step-button m-l-25">
                  <a className="btn btn-mail btn-lg page-scroll">
                    <i className="fab fa-google"></i>
                  </a>
                  <ReCAPTCHA
                    // sitekey="6LeiakodAAAAAPYiIUANfzhoIt4oxB9Vlh-jatmn"
                    // sitekey="6LcSjjQdAAAAAP28WSCrCr6qFsrWTYMS4ycwiSjp"
                    sitekey={process.env.REACT_APP_SITEKEY}
                    onChange={(token) => {
                      setCaptchaToken(token);
                      let copyErrors = { ...errors };
                      if (token) {
                        copyErrors.captcha = undefined;
                      } else {
                        copyErrors.captcha = "";
                      }
                      setErrors(copyErrors);
                    }}
                    onErrored={(e) => {
                      let copyErrors = { ...errors };
                      copyErrors.captcha = "";
                      setErrors(copyErrors);
                    }}
                    className="m-t-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sign_up">
          {verify.signup_success == true ? (
            <span className="tickIcon">&#10003;</span>
          ) : (
            <>
              {!signUpLoading ? (
                <a
                  className="btn btn-verify btn-lg page-scroll"
                  onClick={signUp}
                  disabled={disable}
                >
                  SIGN UP
                </a>
              ) : (
                <div className="d-inline-block">
                  <ReactLoading type="spin" color="#0affff" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
