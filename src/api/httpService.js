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
    const message = error?.response?.data?.message || "مشکلی رخ داده است";

    if (
      error?.response?.data &&
      typeof error.response.data === "object" &&
      !error.response.data.message
    ) {
      let errorMessage = "";
      for (const key in error.response.data) {
        // فرض می‌کنیم مقدار آرایه است و اولین عضو را می‌گیریم
        if (Array.isArray(error.response.data[key])) {
          errorMessage += `${key} : ${error.response.data[key][0]}\n`;
        } else {
          errorMessage += `${key} : ${error.response.data[key]}\n`;
        }
      }
      message = errorMessage.trim() || message;
    }

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

  const headers = {
    ...(tokenInfo?.token ? { Authorization: `Bearer ${tokenInfo.token}` } : {}),
  };
  if (!(data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  return axios({
    url: apiPath + "/api" + url,
    method,
    data,
    headers,
  });
};

export default httpService;
