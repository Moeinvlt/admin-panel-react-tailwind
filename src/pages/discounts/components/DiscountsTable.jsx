import { Outlet, useLocation, useNavigate } from "react-router";
import { useGetDiscounts } from "../../../api/discounts/hooks/useGetDiscounts";
import DataTable from "../../../components/DataTable";
import { convertToDateToJalali } from "../../../utils/convertDate";
import Actions from "./Actions";
import AddDiscount from "./AddDiscount";
import IsActive from "./tableAdditions/IsActive";
import { useContext, useEffect } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";
import ModalPageBtn from "../../../components/ModalPageBtn";
import { deleteDiscountApi } from "../../../api/discounts/discountsApi";
import { Toasty } from "../../../utils/customToast";
import { Alert } from "../../../utils/alerts";

const DiscountsTable = () => {
  const { discountsData, setDiscountsData, loading, error } = useGetDiscounts();
  const navigate = useNavigate();
  const {  modalOpen, setModalOpen } = useContext(AdminContext);
  const location = useLocation();
  const discountToEdit = location.state?.discountToEdit;

  const handleDeleteDiscount = async (discount) => {
    const result = await Alert({
      title: `حذف ${discount.title}`,
      text: 'آیا از حذف این کد تخفیف اطمینان دارید؟',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteDiscountApi(discount.id);
        if (res.status === 200) {
          setDiscountsData((lastData) => lastData.filter((d) => d.id != discount.id));
          Toasty(res.data.message, "success");
        }
      } catch (err) {
        Toasty("مشکلی در انجام عملیات رخ داده است", "error");
      }
    }
  };

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان تخفیف" },
    { field: "code", title: "کد تخفیف" },
    { field: "percent", title: "درصد تخفیف" },
  ];

  const additionalField = [
    {
      title: "تاریخ انقضا",
      elements: (rowData) => convertToDateToJalali(rowData.expire_at),
    },
    {
      title: "مربوط به",
      elements: (rowData) =>
        rowData.for_all ? "برای همه" : "تعدادی از محصولات",
    },
    {
      title: "وضعیت فعال",
      elements: (rowData) => <IsActive rowData={rowData} />,
    },
    {
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} handleDelete={handleDeleteDiscount} />,
    },
  ];

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
        additionalField={additionalField}
        modalBtn={false}
        addPageBtn={<ModalPageBtn linkPath="/discounts/add-discount-code" />}
      />
      <AddDiscount onClose={onModalClose} setDiscountsData={setDiscountsData} />
    </>
  );
};

export default DiscountsTable;
