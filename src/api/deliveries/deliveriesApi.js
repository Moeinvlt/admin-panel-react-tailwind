import httpService from "../httpService";

export const getDeliveriesApi = () => {
  return httpService("/admin/deliveries", "get");
};

export const getOneDeliveryApi = (deliveryId) => {
  return httpService(`/admin/deliveries/${deliveryId}`, "get");
};

export const createDeliveryApi = (data)=>{
  return httpService("/admin/deliveries", 'post', data)
}

export const deleteDeliveryApi = (deliveryId)=>{
  return httpService(`/admin/deliveries/${deliveryId}`, 'delete')
}

export const updateDeliveryApi = (deliveryId, data)=>{
  return httpService(`/admin/deliveries/${deliveryId}`, 'put', data)
}