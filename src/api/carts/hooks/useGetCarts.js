import { useEffect, useState } from "react";
import { getPaginatedCartsApi } from "../cartsApi";
import { Toasty } from "../../../utils/customToast";

export const useGetCarts = () => {
  const [cartsData, setCartsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchChar, setSearchChar] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countOnPage, setCountOnPage] = useState(100);
  const [pageCount, setPageCount] = useState(0);

  const fetchCarts = async (
    page = currentPage,
    count = countOnPage,
    char = searchChar,
  ) => {
    setError(null);
    setLoading(true);
    try {
      const res = await getPaginatedCartsApi(page, count, char);
      if (res.status === 200) {
        const items = res.data.data?.data || []; 
        const lastPage = res.data.data?.last_page || 1; 
        setCartsData(items); // ← ذخیره آرایه
        setPageCount(lastPage);
        setError(null);
      } else {
        const msg = res.data?.message || "خطا در دریافت داده‌ها";
        Toasty(msg, "error");
        setError(msg);
        setCartsData([]);
      }
    } catch (err) {
      const msg = err.message || "خطای شبکه یا سرور";
      Toasty(msg, "error");
      setError(msg);
      setCartsData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (char) => {
    setSearchChar(char);
    fetchCarts(1, countOnPage, char);
  };

  useEffect(() => {
    fetchCarts(currentPage, countOnPage, searchChar);
  }, [currentPage]);

  return {
    cartsData,
    setCartsData,
    loading,
    error,
    searchChar,
    currentPage,
    setCurrentPage,
    countOnPage,
    pageCount,
    fetchCarts,
    refetch: fetchCarts,
    handleSearch,
  };
};
