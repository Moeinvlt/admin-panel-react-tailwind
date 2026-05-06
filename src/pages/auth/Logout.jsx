import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { Toasty } from "../../utils/customToast";
import LoadingScreen from "../../components/loading/LoadingScreen";

const Logout = () => {
  const [loading, setLoading] = useState(true);

  const loginToken = JSON.parse(localStorage.getItem("loginToken"));

  useEffect(() => {
    axios
      .get("https://ecomadminapi.azhadev.ir/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${loginToken.token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("loginToken");
        } else {
          Toasty(res.data.message, "error");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Toasty("خطای سمت سرور", "error");
      });
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen/>
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
};

export default Logout;
