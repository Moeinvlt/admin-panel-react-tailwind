import { Outlet, useLocation, useNavigate } from "react-router";
import { useGetDiscounts } from "../../../api/discounts/hooks/useGetDiscounts";
import DataTable from "../../../components/DataTable";
import { convertToDateToJalali } from "../../../utils/convertDate";
import Actions from "./Actions";
import AddDiscount from "./AddDiscount";
import IsActive from "./tableAdditions/IsActive";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";
import ModalPageBtn from "../../../components/ModalPageBtn";
import { deleteDiscountApi } from "../../../api/discounts/discountsApi";
import { Toasty } from "../../../utils/customToast";
import { Alert } from "../../../utils/alerts";
import { useHasPermission } from "../../../hooks/permissionsHook";

const DiscountsTable = () => {
  const { discountsData, setDiscountsData, loading, error } = useGetDiscounts();
  const navigate = useNavigate();
  const { setModalOpen } = useContext(AdminContext);

  const hasAddDiscountPerm = useHasPermission("create_discount");
  const hasActionPerm = useHasPermission([
    "update_discount",
    "delete_discount",
  ]);

  const handleDeleteDiscount = useCallback(
    async (discount) => {
      const result = await Alert({
        title: `حذف ${discount.title}`,
        text: "آیا از حذف این کد تخفیف اطمینان دارید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
      });

      if (result.isConfirmed) {
        try {
          const res = await deleteDiscountApi(discount.id);
          if (res.status === 200) {
            setDiscountsData((lastData) =>
              lastData.filter((d) => d.id != discount.id),
            );
            Toasty(res.data.message, "success");
          }
        } catch (err) {
          Toasty("مشکلی در انجام عملیات رخ داده است", "error");
        }
      }
    },
    [setDiscountsData],
  );

  const dataInfo = useMemo(() => {
    const basicColumns = [
      { field: "id", title: "#" },
      { field: "title", title: "عنوان تخفیف" },
      { field: "code", title: "کد تخفیف" },
      { field: "percent", title: "درصد تخفیف" },
      {
        field: null,
        title: "تاریخ انقضا",
        elements: (rowData) => convertToDateToJalali(rowData.expire_at),
      },
      {
        field: null,
        title: "مربوط به",
        elements: (rowData) =>
          rowData.for_all ? "برای همه" : "تعدادی از محصولات",
      },
      {
        field: null,
        title: "وضعیت فعال",
        elements: (rowData) => <IsActive rowData={rowData} />,
      },
    ];

    if (hasActionPerm) {
      basicColumns.push({
        field: null,
        title: "عملیات",
        elements: (rowData) => (
          <Actions rowData={rowData} handleDelete={handleDeleteDiscount} />
        ),
      });
    }

    return basicColumns;
  }, [hasActionPerm, handleDeleteDiscount]);

  const onModalClose = () => {
    setModalOpen(false);
    navigate(-1);
  };

  return (
    <>
      <DataTable
        title="مدیریت تخفیف ها"
        data={discountsData}
        isLoading={loading}
        error={error}
        dataInfo={dataInfo}
        limit={5}
        modalBtn={false}
        addPageBtn={
          hasAddDiscountPerm ? (
            <ModalPageBtn linkPath="/discounts/add-discount-code" />
          ) : (
            false
          )
        }
      />
      {hasAddDiscountPerm && (
        <AddDiscount
          onClose={onModalClose}
          setDiscountsData={setDiscountsData}
        />
      )}
    </>
  );
};

export default DiscountsTable;
