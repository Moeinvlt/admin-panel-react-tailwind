import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { Toasty } from "../../utils/customToast";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { logoutApi } from "../../api/auth/auth";

const Logout = () => {
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      const res = await logoutApi();

      if (res.status === 200) {
        localStorage.removeItem("loginToken");
      } else {
        Toasty(res.data.message, "error");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toasty("خطای سمت سرور", "error");
    }
  };

  useEffect(() => {
    handleLogout()
  }, []);

  return <>{loading ? <LoadingScreen /> : <Navigate to="/auth/login" />}</>;
};

export default Logout;
