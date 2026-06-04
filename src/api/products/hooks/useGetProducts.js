import { useEffect, useState } from "react";
import { getProductsApi } from "../productsApi";
import { Toasty } from "../../../utils/customToast";

export const useGetProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchChar, setSearchChar] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countOnPage, setCountOnPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const fetchProducts = async (page, count, char) => {
    setError(null);
    setLoading(true);
    try {
      const res = await getProductsApi(page, count, char);
      if (res.status === 200) {
        setData(res.data.data);
        setPageCount(res.data.last_page);
        setError(null); // پاک کردن خطا در صورت موفقیت
      } else {
        const msg = res.data?.message || "خطا در دریافت داده‌ها";
        Toasty(msg, "error");
        setError(msg);
        setData([]);
      }
    } catch (err) {
      const msg = err.message || "خطای شبکه یا سرور";
      Toasty(msg, "error");
      setError(msg);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (char) => {
    setSearchChar(char);
    fetchProducts(1, countOnPage, char);
  };

  useEffect(() => {
    fetchProducts(currentPage, countOnPage, searchChar);
  }, [currentPage]);

  return {
    data,
    setData,
    loading,
    error,
    searchChar,
    currentPage,
    setCurrentPage,
    countOnPage,
    pageCount,
    fetchProducts,
    refetch: fetchProducts,
    handleSearch,
  };
};