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