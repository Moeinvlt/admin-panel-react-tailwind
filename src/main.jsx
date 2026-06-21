import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminContextContainer from "./context/AdminContextContainer";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AdminContextContainer>
        <App />
      </AdminContextContainer>
    </BrowserRouter>
  </Provider>
);
