import {
  BALANCE_CHECK_SUCCESS,
  TWITTER_CHECK_SUCCESS,
  DISCORD_CHECK_SUCCESS,
  RETWEET_CHECK_SUCCESS,
  SIGNUP_SUCCESS,
  USER_CHECK_SUCCESS
} from "../shared/ActionTypes.js";

const INIT_STATE = {
  checkBalance: null,
  // checkTwitter: null,
  checkDiscord: null,
  checkRetweet: null,
  signup_success: null,
  user_check: true
  // loading: true,
  // user: '',
  // token: null
};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case BALANCE_CHECK_SUCCESS: {
      return {
        ...state,
        checkBalance: action.payload.checkBalance,
      };
    } 
    case TWITTER_CHECK_SUCCESS: {
      return {
        ...state,
        checkTwitter: action.payload.checkTwitter,
      };
    }
    case DISCORD_CHECK_SUCCESS: {
      return {
        ...state,
        checkDiscord: action.payload.checkDiscord,
      };
    }
    case RETWEET_CHECK_SUCCESS: {
      return {
        ...state,
        checkRetweet: action.payload.checkRetweet
      }
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        signup_success: action.payload.signup_success
      }
    }
    case USER_CHECK_SUCCESS: {
      return {
        ...state,
        user_check: action.payload.checkUser
      }
    }
    default:
      return state;
  }
};
export default authReducer;
