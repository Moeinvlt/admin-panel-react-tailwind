import httpService from "../httpService"

export const getCategoriesApi = (id=null) => {
    return httpService(`/admin/categories${id ? `?parent=${id}` : ""}`, 'get')
}