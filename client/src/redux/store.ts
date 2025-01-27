import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore redux-persist actions
        ignoredPaths: ["users.temporaryState"], // Ignore non-serializable paths
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
