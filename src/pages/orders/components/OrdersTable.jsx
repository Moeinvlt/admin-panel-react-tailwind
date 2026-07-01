// import { Outlet } from "react-router";
import ModalPageBtn from "../../../components/ModalPageBtn";
import PaginatedDataTable from "../../../components/PaginatedDataTable";
import { useHasPermission } from "../../../hooks/permissionsHook";
import { Alert } from "../../../utils/alerts";
import { Toasty } from "../../../utils/customToast";
import Actions from "./Actions";
import { useCallback, useMemo } from "react";
import { useGetOrders } from "../../../api/orders/hooks/useGetOrders";
import { deleteOrderApi } from "../../../api/orders/ordersApi";
import { convertToDateToJalali } from "../../../utils/convertDate";
import { numberWithCommas } from "../../../utils/numbers";
import { Outlet } from "react-router";

const OrdersTable = () => {
  const {
    ordersData,
    setOrdersData,
    loading,
    error,
    currentPage,
    setCurrentPage,
    pageCount,
    handleSearch,
  } = useGetOrders();

  const hasAddOrderPerm = useHasPermission("create_order");
  const hasActionPerm = useHasPermission("delete_order");

  const handleDeleteCart = useCallback(
    async (cart) => {
      const result = await Alert({
        title: "حذف سفارش",
        text: "آیا از حذف این شفارش اطمینان دارید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
      });

      if (result.isConfirmed) {
        try {
          const res = await deleteOrderApi(cart.id);
          if (res.status === 200) {
            setOrdersData((prevData) =>
              prevData.filter((item) => item.id !== cart.id),
            );
            Toasty(res.data.message, "success");
          }
        } catch (err) {
          Toasty("مشکلی در انجام عملیات رخ داده است", "error");
        }
      }
    },
    [setOrdersData],
  );

  const dataInfo = useMemo(() => {
    const baseColumns = [
      { field: "id", title: "#" },
      { field: "user_id", title: "آی دی کاربر" },
      { field: "user_fullname", title: "نام کاربر" },
      { field: "cart_id", title: "آی دی سبد خرید" },
      { field: "email", title: "ایمیل" },
      { field: "phone", title: "شماره همراه" },
      {
        field: null,
        title: "مبلغ پرداختی",
        elements: (rowData) => numberWithCommas(rowData.pay_amount),
      },
      {
        field: null,
        title: "تاریخ پرداخت",
        elements: (rowData) =>
          rowData.pay_at ? convertToDateToJalali(rowData.pay_at) : "",
      },
    ];

    if (hasActionPerm) {
      baseColumns.push({
        field: null,
        title: "عملیات",
        elements: (rowData) => (
          <Actions rowData={rowData} handleDelete={handleDeleteCart} />
        ),
      });
    }

    return baseColumns;
  }, [hasActionPerm, handleDeleteCart]);

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
  };

  return (
    <>
      <PaginatedDataTable
        title="مدیریت سبد خرید"
        tableData={ordersData}
        dataInfo={dataInfo}
        isLoading={loading}
        error={error}
        searchParams={searchParams}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        handleSearch={handleSearch}
        modalBtn={false}
        addPageBtn={
          hasAddOrderPerm ? (
            <ModalPageBtn linkPath="/orders/add-order" />
          ) : (
            false
          )
        }
      />
      <Outlet context={{ setOrdersData }} />
    </>
  );
};

export default OrdersTable;
