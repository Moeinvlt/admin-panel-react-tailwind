import httpService from "../httpService"

export const getGuaranteesApi = () => {
    return httpService('/admin/guarantees', 'get');
}

export const createGuaranteesApi = (data) => {
    return httpService('/admin/guarantees', 'post', data);
}

export const editGuaranteesApi = (guarateeId, data) => {
    return httpService(`/admin/guarantees/${guarateeId}`, 'put', data);
}

export const deleteGuaranteesApi = (guarateeId) => {
    return httpService(`/admin/guarantees/${guarateeId}`, 'delete');
}
