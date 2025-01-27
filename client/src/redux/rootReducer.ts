import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import userReducer from "./slices/userSlice";
import courseEditorReducer from "./slices/courseEditorSlice";
import courseDetailReducer from "./slices/courseDetailSlice";

const userPersistConfig = {
  key: "user",
  storage,
  blacklist: ["temporaryState"], // Blacklist specific keys
};

const courseDetailConfig = {
  key: "courseDetail",
  storage,
  blacklist: ["temporaryState"],
};

const courseEditorConfig = {
  key: "courseEditor",
  storage,
  blacklist: ["temporaryState"],
};

const combinedReducer = combineReducers({
  users: persistReducer(userPersistConfig, userReducer),
  courseEditor: persistReducer(courseEditorConfig, courseEditorReducer),
  courseDetail: persistReducer(courseDetailConfig, courseDetailReducer),
});

const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === "RESET") {
    // Reset the entire state
    storage.removeItem("persist:user"); // Clear specific reducer
    // state = undefined;
    return combinedReducer(undefined, action);
  }

  return combinedReducer(state, action);
};

export default rootReducer;
