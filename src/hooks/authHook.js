import axios from "axios";
import { useEffect, useState } from "react";
import { Toasty } from "../utils/customToast";

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenRaw = localStorage.getItem("loginToken");
    let loginToken = null;

    if (tokenRaw) {
      try {
        loginToken = JSON.parse(tokenRaw);
      } catch (error) {
        Toasty("خطا در parse کردن توکن:", "error");
        localStorage.removeItem("loginToken");
      }
    }

    if (loginToken && loginToken.token) {
      axios
        .get("https://ecomadminapi.azhadev.ir/api/auth/user", {
          headers: {
            Authorization: `Bearer ${loginToken.token}`,
          },
        })
        .then((res) => {
          setIsLogin(res.status === 200);
          setLoading(false);
        })
        .catch((e) => {
          localStorage.removeItem("loginToken");
          setIsLogin(false);
          setLoading(false);
        });
    } else {
      setIsLogin(false);
      setLoading(false);
    }
  }, []);

  return [loading, isLogin];
};