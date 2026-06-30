import httpService from "../httpService";

export const getPaginatedCartsApi = (page, countOnPage, searchChar) => {
  return httpService(
    `/admin/carts?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,
    "get",
  );
};

export const createCartApi = (data) => {
  return httpService("/admin/carts", "post", data);
};

export const getSinglrCartApi = (cartId) => {
  return httpService(`/admin/carts/${cartId}`, "get");
};

export const editCartApi = (cartId, data) => {
  return httpService(`/admin/carts/${cartId}`, "put", data);
};

export const deleteCartApi = (cartId) => {
  return httpService(`/admin/carts/${cartId}`, "delete");
};
