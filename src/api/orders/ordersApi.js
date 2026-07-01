import httpService from "../httpService";

export const getPaginatedOrdersApi = (page, countOnPage, searchChar) => {
    return httpService(`/admin/orders?page=${page}&count=${countOnPage}&searchChar=${searchChar}`, "get");
  };
  
  export const createOrderApi = (data) => {
    return httpService("/admin/orders", "post", data);
  };
  
  export const getSinglrOrderApi = (orderId)=>{
    return httpService(`/admin/orders/${orderId}`, "get")
  }
  
  export const deleteOrderApi = (orderId) => {
    return httpService(`/admin/orders/${orderId}`, "delete");
  };
  
  export const getOrdersStatisticsApi = () => {
    return httpService(`/admin/orders/orders_statistics`, "get");
  };
  
  export const getThisYearOrdersApi = () => {
    return httpService(`/admin/orders/this_year_orders`, "get");
  };