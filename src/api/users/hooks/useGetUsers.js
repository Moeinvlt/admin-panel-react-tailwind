import { useEffect, useState } from "react";
import { Toasty } from "../../../utils/customToast";
import { getPaginatedUserseApi } from "../usersApi";

export const useGetUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchChar, setSearchChar] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countOnPage, setCountOnPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const fetchUsers = async (page, count, char) => {
    setError(null);
    setLoading(true);
    try {
      const res = await getPaginatedUserseApi(page, count, char);
      if (res.status === 200) {
        setUsersData(res.data.data.data);
        setPageCount(res.data.last_page);
        setError(null);
      } else {
        const msg = res.data?.message || "خطا در دریافت داده‌ها";
        Toasty(msg, "error");
        setError(msg);
        setUsersData([]);
      }
    } catch (err) {
      const msg = err.message || "خطای شبکه یا سرور";
      Toasty(msg, "error");
      setError(msg);
      setUsersData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (char) => {
    setSearchChar(char);
    fetchUsers(1, countOnPage, char);
  };

  useEffect(() => {
    fetchUsers(currentPage, countOnPage, searchChar);
  }, [currentPage]);

  return {
    usersData,
    setUsersData,
    loading,
    error,
    searchChar,
    currentPage,
    setCurrentPage,
    countOnPage,
    pageCount,
    fetchUsers,
    refetch: fetchUsers,
    handleSearch,
  };
};