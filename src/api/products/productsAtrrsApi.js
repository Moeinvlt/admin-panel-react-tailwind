import httpService from "../httpService"

export const addProductAttrApi = (productId, data)=>{
  return httpService(`/admin/products/${productId}/add_attr`, 'post', data)
}

export const addProductImageApi = (productId, data)=>{
  return httpService(`/admin/products/${productId}/add_image`, 'post', data)
}

export const deleteProductImageApi = (imageId)=>{
  return httpService(`/admin/products/gallery/${imageId}`, 'delete')
}

export const setMainProductImageApi = (imageId)=>{
  return httpService(`/admin/products/gallery/set_main/${imageId}`, 'get')
}
