import { combineReducers } from "redux";
import Mint from "./Mint";
import Auth from "./Auth";

const reducers = combineReducers({
  auth: Auth,
  mint: Mint,
});
export default reducers;
