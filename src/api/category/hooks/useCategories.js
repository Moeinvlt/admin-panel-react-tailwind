import { useCallback, useEffect, useState } from "react";
import { getCategoriesApi } from "../categoryApi";
import { Toasty } from "../../../utils/customToast";

export const useGetCategories = (categoryId = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await getCategoriesApi(categoryId);
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
  }, [categoryId]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { data, setData, loading, error, refetch: fetchCategories };
};