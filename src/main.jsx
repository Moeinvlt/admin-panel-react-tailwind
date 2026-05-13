import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminContextContainer from "./context/AdminContextContainer";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextContainer>
      <App />
    </AdminContextContainer>
  </BrowserRouter>
);
