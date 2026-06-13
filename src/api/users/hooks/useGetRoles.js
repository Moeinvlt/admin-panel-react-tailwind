import { useCallback, useEffect, useState } from "react";
import { Toasty } from "../../../utils/customToast";
import { getRolesApi } from "../usersApi";

export const useGetRoles = () => {
  const [rolesData, setRolesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRolesData = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await getRolesApi();

      if (res.status === 200) {
        setRolesData(res.data.data || []);
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
    fetchRolesData();
  }, [fetchRolesData]);

  return {
    rolesData,
    setRolesData,
    loading,
    error,
    refetch: fetchRolesData,
  };
};
