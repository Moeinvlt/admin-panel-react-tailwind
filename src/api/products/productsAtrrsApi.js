import httpService from "../httpService"

export const addProductAttrApi = (productId, data)=>{
  return httpService(`/admin/products/${productId}/add_attr`, 'post', data)
}