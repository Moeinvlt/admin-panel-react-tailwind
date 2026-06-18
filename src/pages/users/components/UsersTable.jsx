import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { FaSitemap } from "react-icons/fa";
import Actions from "./Actions";
import PaginatedDataTable from "../../../components/PaginatedDataTable";
import { Alert } from "../../../utils/alerts";
import { Toasty } from "../../../utils/customToast";
import { useGetUsers } from "../../../api/users/hooks/useGetUsers";
import { deleteUserApi } from "../../../api/users/usersApi";
import Roles from "./tableAdditions/Roles";
import AddUser from "./AddUser";
import ModalPageBtn from "../../../components/ModalPageBtn";

const UsersTable = () => {
  const {
    usersData,
    setUsersData,
    loading,
    error,
    currentPage,
    handleSearch,
    pageCount,
    setCurrentPage,
    refetch,
  } = useGetUsers();


  const dataInfo = [
    { field: "id", title: "#" },
    { field: "user_name", title: "نام کاربری" },
    { field: "first_name", title: "نام" },
    { field: "last_name", title: "نام خانوادگی" },
    { field: "phone", title: "شماره همراه" },
    { field: "email", title: "ایمیل" },
    {
      field: null,
      title: "نقش",
      elements: (rowData) => <Roles rowData={rowData} />,
    },
    {
      field: null,
      title: "جنسیت",
      elements: (rowData) => (rowData.gender == 1 ? "آقا" : "خانم"),
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => (
        <Actions rowData={rowData} handleDelete={handleDeleteProduct} />
      ),
    },
  ];
  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
  };

  const handleDeleteProduct = async (user) => {
    const result = await Alert({
      title: "حذف دسته کاربر",
      text: `آیا از حذف ${user.phone} اطمینان دارید؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteUserApi(user.id);
        if (res.status === 200) {
          setUsersData((prevData) =>
            prevData.filter((item) => item.id !== user.id),
          );
          Toasty(res.data.message, "success");
        }
      } catch (err) {
        Toasty("مشکلی در انجام عملیات رخ داده است", "error");
      }
    }
  };

  return (
    <>
      <PaginatedDataTable
        title="مدیریت محصول"
        tableData={usersData}
        dataInfo={dataInfo}
        isLoading={loading}
        error={error}
        searchParams={searchParams}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        handleSearch={handleSearch}
        modalBtn={false}
        addPageBtn={<ModalPageBtn linkPath="/users/add-user" />}
      />
      <AddUser setUsersData={setUsersData} refetchUsers={refetch} />
    </>
  );
};

export default UsersTable;
