import httpService from "../httpService";

export const getPermissionsApi = () => {
  return httpService("/admin/permissions", "get");
};

export const getRolesApi = () => {
  return httpService("/admin/roles", "get");
};

export const createRoleApi = (data) => {
  return httpService("/admin/roles", "post", data);
};

export const editRoleApi = (roleId, data)=>{
  return httpService(`/admin/roles/${roleId}`, "put", data)
}

export const deleteRoleApi = (roleId)=>{
  return httpService(`/admin/roles/${roleId}`, "delete")
}

export const editRolePermissionsApi = (roleId, data)=>{
  return httpService(`/admin/roles/${roleId}/permissions`, "put", data)
}

export const getSinglrRoleApi = (roleId)=>{
  return httpService(`/admin/roles/${roleId}`, "get")
}

export const getPaginatedUserseApi = (page, countOnPage, searchChar) => {
  return httpService(`/admin/users?page=${page}&count=${countOnPage}&searchChar=${searchChar}`, "get");
};

export const addNewUserApi = (data) => {
  return httpService("/admin/users", "post", data);
};

export const getSinglrUserApi = (userId)=>{
  return httpService(`/admin/users/${userId}`, "get")
}

export const editUserApi = (userId, data) => {
  return httpService(`/admin/users/${userId}`, "put", data);
};

export const deleteUserApi = (userId) => {
  return httpService(`/admin/users/${userId}`, "delete");
};