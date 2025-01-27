import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ToastContainer className="mt-10" />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
