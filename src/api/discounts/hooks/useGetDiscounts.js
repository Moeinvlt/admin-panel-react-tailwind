import { useCallback, useEffect, useState } from "react";
import { getDiscountsApi } from "../discountsApi";
import { Toasty } from "../../../utils/customToast";

export const useGetDiscounts = () => {
  const [discountsData, setDiscountsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const fetchDiscounts = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await getDiscountsApi();
      if (res.status === 200) {
        setDiscountsData(res.data.data || []);
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
    fetchDiscounts();
  }, [fetchDiscounts]);

  return { discountsData, setDiscountsData, loading, error, refetch: fetchDiscounts };
};