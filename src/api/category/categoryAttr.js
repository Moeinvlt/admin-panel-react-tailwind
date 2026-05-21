import httpService from "../httpService"

export const getCategoryAttrsApi = (categoryId) => {
    return httpService(`/admin/categories/${categoryId}/attributes`, 'get')
}

export const addCategoryAttrsApi = (categoryId, data) => {
    return httpService(`/admin/categories/${categoryId}/attributes`, 'post', data)
}