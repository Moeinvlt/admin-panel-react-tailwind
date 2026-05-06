import { useLocation } from "react-router";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/authLayout/AuthLayout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname.includes("/auth") ? <AuthLayout /> : <AdminLayout />}
      <ToastContainer rtl={true} toastClassName="font_vazir"/>
    </>
  );
}

export default App;
