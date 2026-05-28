import httpService from "../httpService"

export const getColorsApi = () => {
    return httpService('/admin/colors');
}

export const createColorApi = (data) => {
    return httpService('/admin/colors', 'post', data);
}

export const editColorApi = (colorId ,data) => {
    return httpService(`/admin/colors/${colorId}`, 'put', data);
}

export const deleteColorApi = (colorId) => {
    return httpService(`/admin/colors/${colorId}`, 'delete');
}