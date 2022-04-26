import {
  BALANCE_CHECK_SUCCESS,
  TWITTER_CHECK_SUCCESS,
  DISCORD_CHECK_SUCCESS,
  RETWEET_CHECK_SUCCESS,
  SIGNUP_SUCCESS,
  USER_CHECK_SUCCESS
} from "../shared/ActionTypes.js";
import authAxios from "../apis/axios";
import swal from 'sweetalert';

export const onBalanceCheck = ({
  address
}) => {
  return async (dispatch) => {
    const body = {
      address
    };
    try {
      const res = await authAxios.post("/checkBalance", body);
      if (res.data.success == false) {
        swal("Sorry!", res.data.msg, "error");
      }
      dispatch({
        type: BALANCE_CHECK_SUCCESS,
        payload: {
          checkBalance: res.data.success,
        },
      });
    } catch (err) {
      console.log("error!!!!", err);
    }
  };
};

export const onTwitterVerify = ({
  twitterUserName
}) => {
  return async (dispatch) => {
    const body = {
      twitterUserName
    };
    try {
      const res = await authAxios.post("/twitterVerify", body);
      if (res.data.success == false) {
        swal("Sorry!", res.data.msg, "error");
      }
      dispatch({
        type: TWITTER_CHECK_SUCCESS,
        payload: {
          checkTwitter: res.data.success,
        },
      });

    } catch (err) {
      console.log('error!!!!', err)
    }
  }
}

export const onRetweetVerify = ({
  twitterUserName
}) => {
  return async (dispatch) => {
    const body = {
      twitterUserName
    };
    try {
      const res = await authAxios.post("/retweetVerify", body);
      if (res.data.success == false) {
        swal("Sorry!", res.data.msg, "error");
      }
      dispatch({
        type: RETWEET_CHECK_SUCCESS,
        payload: {
          checkRetweet: res.data.success,
        },
      });

    } catch (err) {
      console.log('error!!!!', err)
    }
  }
}

export const onDiscordVerify = ({
  discordUserName
}) => {
  return async (dispatch) => {
    const body = {
      discordUserName
    };
    try {
      const res = await authAxios.post("/discordVerify", body);
      if (res.data.success == false) {
        swal("Sorry!", res.data.msg, "error");
      }
      dispatch({
        type: DISCORD_CHECK_SUCCESS,
        payload: {
          checkDiscord: res.data.success,
        },
      });

    } catch (err) {
      console.log('error!!!!', err)
    }
  }
}

export const onSignUp = ({
  address,
  twitterUserName,
  discordUserName,
  email
}) => {
  return async (dispatch) => {
    const body = {
      address,
      twitterUserName,
      discordUserName,
      email
    };
    try {
      const res = await authAxios.post("/signup", body);
      if (res.data.success == false) {
        swal("Sorry!", res.data.msg, "error");
      } else {
        swal("Good job!", "You are successfully registered to the whitelist!", "success");
      }
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: {
          signup_success: res.data.success,
        },
      });

    } catch (err) {
      console.log('error!!!!', err)
    }
  }
}

export const onCheckUser = ({
  address
}) => {
  return async (dispatch) => {
    const body = {
      address
    };
    try {
      const res = await authAxios.post("/checkUser", body);
      if (res.data.success == false) {
        swal("Warning!", res.data.msg, "info");
      }
      dispatch({
        type: USER_CHECK_SUCCESS,
        payload: {
          checkUser: res.data.success,
        },
      });
    } catch (err) {
      console.log("error!!!!", err);
    }
  };
};