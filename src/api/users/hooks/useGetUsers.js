import { useEffect, useState } from "react";
import { Toasty } from "../../../utils/customToast";
import { getPaginatedUserseApi } from "../usersApi";

export const useGetUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchChar, setSearchChar] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countOnPage, setCountOnPage] = useState(100);
  const [pageCount, setPageCount] = useState(0);

const fetchUsers = async (page, count, char) => {
  setError(null);
  setLoading(true);
  try {
    const res = await getPaginatedUserseApi(page, count, char);
    if (res.status === 200) {

      const usersArray = res.data.data.data || [];
      console.log("📦 Users array after refetch:", usersArray);
      setUsersData(usersArray);
      setPageCount(res.data.data.last_page || 1);
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

  const refetchUsers = () => {
    fetchUsers(currentPage, countOnPage, searchChar);
  };

  const handleSearch = (char) => {
    setSearchChar(char);
    setCurrentPage(1); // reset page to 1 on new search
    fetchUsers(1, countOnPage, char);
  };

  useEffect(() => {
    fetchUsers(currentPage, countOnPage, searchChar);
  }, [currentPage, countOnPage, searchChar]);

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
    refetch: refetchUsers,
    handleSearch,
  };
};