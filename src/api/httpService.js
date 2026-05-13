import axios from "axios";
import config from "./config.json";
import { Toasty } from "../utils/customToast";

export const apiPath = config.onlinePath;

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || "مشکلی رخ داده است";

    // 401 => logout + redirect
    if (status === 401) {
      // 1) پاک کردن توکن
      localStorage.removeItem("loginToken");

      // 2) هدایت به لاگین
      // اگر مسیر لاگین‌تان مثلاً /login است:
      window.location.href = "/auth/login";

      return Promise.reject(error);
    }

    if (status === 403) {
      Toasty(message, "error");
      return Promise.reject(error);
    }

    Toasty(status ?? message, "error");
    return Promise.reject(error);
  }
);

const httpService = (url, method, data = null) => {
  let tokenInfo = null;
  const tokenRaw = localStorage.getItem("loginToken");
  if (tokenRaw) {
    try {
      tokenInfo = JSON.parse(tokenRaw);
    } catch (e) {
      console.error("Invalid token in localStorage:", e);
      localStorage.removeItem("loginToken");
    }
  }

  return axios({
    url: apiPath + "/api" + url,
    method,
    data, 
    headers: {
      ...(tokenInfo?.token ? { Authorization: `Bearer ${tokenInfo.token}` } : {}),
      "Content-Type": "application/json",
    },
  });
};

export default httpService;
