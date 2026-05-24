import { useCallback, useEffect, useState } from "react";
import { Toasty } from "../../../utils/customToast";
import { getBrandsApi } from "../brandsApi";

export const useGetBrands = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBrands = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await getBrandsApi();
      if (res.status === 200) {
        setData(res.data.data || []);
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
    fetchBrands();
  }, [fetchBrands]);

  return { data, setData, loading, error, refetch: fetchBrands };
};