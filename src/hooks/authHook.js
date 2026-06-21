import axios from "axios";
import { useEffect, useState } from "react";
import { Toasty } from "../utils/customToast";
import { getUserApi } from "../api/auth/auth";
import { useDispatch } from "react-redux";
import { receiveUserResponse } from "../redux/users/userActions";

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispath = useDispatch()

  const handleCheckLogin = async () => {
    try {
      const res = await getUserApi();

      setIsLogin(res.status === 200 ? true : false);
      setLoading(false);
      dispath(receiveUserResponse(res.data))
    } catch (error) {
      localStorage.removeItem("loginToken");
      setIsLogin(false);
      setLoading(false);
    }
  }

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
      handleCheckLogin()

    } else {
      setIsLogin(false);
      setLoading(false);
    }

  }, []);

  return [loading, isLogin];
};