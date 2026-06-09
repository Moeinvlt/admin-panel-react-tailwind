import { deleteCartApi } from "../../../api/carts/cartsApi";
import { useGetCarts } from "../../../api/carts/hooks/useGetCarts";
import PaginatedDataTable from "../../../components/PaginatedDataTable";
import { Alert } from "../../../utils/alerts";
import { Toasty } from "../../../utils/customToast";
import Actions from "./Actions";
import IsActive from "./tableAdditions/IsActive";

const CartsTable = () => {
  const {
    cartsData,
    setCartsData,
    loading,
    error,
    currentPage,
    setCurrentPage,
    pageCount,
    handleSearch,
  } = useGetCarts();

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "user_id", title: "آی دی کاربر" },
    {
      field: null,
      title: "نام کاربر",
      elements: (rowData) =>
        `${rowData.user.first_name || ""} ${rowData.user.last_name || ""}`,
    },
    {
      field: null,
      title: " شماره موبایل کاربر",
      elements: (rowData) => rowData.user.phone,
    },
    {
      field: null,
      title: "تعداد کالاها",
      elements: (rowData) => rowData.items.length,
    },
    {
      field: null,
      title: "وضعیت فعال",
      elements: (rowData) => <IsActive rowData={rowData} />,
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

  const handleDeleteProduct = async (cart) => {
    const result = await Alert({
      title: "حذف سبد خرید",
      text: "آیا از حذف این سبد خرید اطمینان دارید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteCartApi(cart.id);
        if (res.status === 200) {
          setCartsData((prevData) =>
            prevData.filter((item) => item.id !== cart.id),
          );
          Toasty(res.data.message, "success");
        }
      } catch (err) {
        Toasty("مشکلی در انجام عملیات رخ داده است", "error");
      }
    }
  };

  return (
    <PaginatedDataTable
      title="مدیریت محصول"
      tableData={cartsData}
      dataInfo={dataInfo}
      isLoading={loading}
      error={error}
      searchParams={searchParams}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageCount={pageCount}
      handleSearch={handleSearch}
      modalBtn={true}
    />
  );
};

export default CartsTable;
