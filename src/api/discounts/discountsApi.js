import httpService from "../httpService"

export const getDiscountsApi = () => {
    return httpService('/admin/discounts', 'get')
}

export const createDiscountApi = (data) => {
    return httpService('/admin/discounts', 'post', data)
}

export const deleteDiscountApi = (discountId)=>{
  return httpService(`/admin/discounts/${discountId}`, 'delete')
}

export const updateDiscountApi = (discountId, data)=>{
  return httpService(`/admin/discounts/${discountId}`, 'put', data)
}