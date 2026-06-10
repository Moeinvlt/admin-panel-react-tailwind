
import { useCallback, useEffect, useState } from "react";
import { Toasty } from "../../../utils/customToast";
import { getPermissionsApi } from "../usersApi";

export const useGetPermissions = () => {
  const [permissionsData, setPermissionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const fetchPermissions = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await getPermissionsApi();
      if (res.status === 200) {
        setPermissionsData(res.data.data || []);
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
    fetchPermissions();
  }, [fetchPermissions]);

  return { permissionsData, setPermissionsData, loading, error, refetch: fetchPermissions };
};