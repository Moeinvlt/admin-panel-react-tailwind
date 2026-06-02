import httpService from "../httpService";

export const getProductsApi = (page, countOnPage, searchChar) => {
  return httpService(`/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}`, "get");
};

export const deleteProductApi = (productId)=>{
  return httpService(`/admin/products/${productId}`, "delete");
}