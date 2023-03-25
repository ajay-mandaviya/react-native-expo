import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./info.slice";

export const store = configureStore({
  reducer: {
    userReducer,
  },
});

export type ApplicationStateType = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
