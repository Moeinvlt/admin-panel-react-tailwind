import httpService from "../httpService"

export const getCategoriesApi = (id=null) => {
    return httpService(`/admin/categories${id ? `?parent=${id}` : ""}`, 'get')
}

export const createCategoryApi = (data) => {
    if (data.image) {
        let formdata = new FormData();

        formdata.append('title', data.title)
        formdata.append('descriptions', data.descriptions)
        formdata.append('parent_id', data.parent_id)
        formdata.append('is_active', data.is_active)
        formdata.append('show_in_menu', data.show_in_menu)
        formdata.append('image', data.image)

        data = formdata
    }

    return httpService('/admin/categories', 'post', data);
}