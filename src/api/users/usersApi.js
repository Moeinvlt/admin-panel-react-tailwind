import httpService from "../httpService";

export const getPermissionsApi = () => {
  return httpService("/admin/permissions", "get");
};