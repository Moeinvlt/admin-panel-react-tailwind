import { useCallback, useEffect, useState } from "react";
import { Toasty } from "../../../utils/customToast";
import { getGuaranteesApi } from "../GuaranteesApi";

export const useGetGuarantees = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGuarantees = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await getGuaranteesApi();
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
    fetchGuarantees();
  }, [fetchGuarantees]);

  return { data, setData, loading, error, refetch: fetchGuarantees };
};
