import { combineReducers } from "redux";
import errorReducer from "./error";
import useProfilerData from "./userData";
export const rootReducer = combineReducers({
  useProfilerData,
  errorReducer
});
