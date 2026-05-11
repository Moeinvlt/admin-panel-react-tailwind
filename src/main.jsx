import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminContextContainer from "./context/AdminContextContainer";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AdminContextContainer>
        <App />
      </AdminContextContainer>
    </BrowserRouter>
  </QueryClientProvider>
);
