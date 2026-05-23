import httpService from "../httpService"

export const getCategoryAttrsApi = (categoryId) => {
    return httpService(`/admin/categories/${categoryId}/attributes`, 'get')
}

export const addCategoryAttrsApi = (categoryId, data) => {
    return httpService(`/admin/categories/${categoryId}/attributes`, 'post', data)
}

export const editCategoryAttrsApi = (attrId, data) => {
    return httpService(`/admin/categories/attributes/${attrId}`, 'put', data)
}

export const deleteCategoryAttrsApi = (attrId) => {
    return httpService(`/admin/categories/attributes/${attrId}`, 'delete')
}