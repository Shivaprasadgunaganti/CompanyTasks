import { configureStore } from "@reduxjs/toolkit";
import { reducer as todoReducer } from "./redux/slice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
