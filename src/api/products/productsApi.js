import { convertDataToFormdata } from "../../utils/convertData";
import httpService from "../httpService";

export const getProductsApi = (page, countOnPage, searchChar) => {
  return httpService(`/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}`, "get");
};

export const createProductApi = (data)=>{
  return httpService('/admin/products', 'post', data.image ? convertDataToFormdata(data) : data)
}

export const editProductApi = (productId, data)=>{
  return httpService(`/admin/products/${productId}`, 'put', data)
}

export const deleteProductApi = (productId)=>{
  return httpService(`/admin/products/${productId}`, "delete");
}

export const getProductTitlesApi = () => {
  return httpService(`/admin/products/all_titles`, "get");
};

export const getOneProductApi= (productId)=>{
  return httpService(`/admin/products/${productId}`, "get");
}