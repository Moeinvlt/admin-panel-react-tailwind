import { useCallback, useEffect, useState } from "react";
import { Toasty } from "../../../utils/customToast";
import { getDeliveriesApi } from "../deliveriesApi";

export const useGetDeliveries = () => {
  const [deliveriesData, setDeliveriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDeliveries = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await getDeliveriesApi();
      if (res.status === 200) {
        setDeliveriesData(res.data.data || []);
      } else {
        const msg = res.data?.message || "خطا در دریافت داده‌ها";
        Toasty(msg, "error");
        setError(msg);
      }
    } catch (err) {
      const msg = err.message || "خطای شبکه یا سرور";
      Toasty(msg, "error");
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  return { deliveriesData, setDeliveriesData, loading, error, refetch: fetchDeliveries };
};
