import { FaTrash } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import DataTable from "../../../components/DataTable";
import Actions from "./Actions";
import AddBrand from "./AddBrand";
import { useGetBrands } from "../../../api/brands/hooks/useGetBrands";
import { convertToDateToJalali } from "../../../utils/convertDate";
import { apiPath } from "../../../api/httpService";
import { HiX } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";
import { Alert } from "../../../utils/alerts";
import { deleteBrandApi } from "../../../api/brands/brandsApi";
import { Toasty } from "../../../utils/customToast";

const BrandsTable = () => {
  const { data, setData, loading, error } = useGetBrands();
  const { modalOpen, setModalOpen } = useContext(AdminContext);
  const [brandToEdit, setBrandToEdit] = useState(null);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "original_name", title: "عنوان برند (اینگیلیسی)" },
    { field: "persian_name", title: "عنوان برند (فارسی)" },
  ];

  const additionalField = [
    {
      title: "لوگو",
      elements: (rowData) =>
        rowData.logo ? (
          <img
            src={apiPath + "/" + rowData.logo}
            alt="logo"
            className="max-w-10 mx-auto"
          />
        ) : (
          <HiX className="text-red-500 text-2xl mx-auto" />
        ),
    },
    {
      title: "تاریخ ساخت",
      elements: (rowData) => convertToDateToJalali(rowData.created_at),
    },
    {
      title: "تاریخ آخرین آپدیت",
      elements: (rowData) => convertToDateToJalali(rowData.updated_at),
    },
    {
      title: "عملیات",
      elements: (rowData) => (
        <Actions
          rowData={rowData}
          setBrandToEdit={setBrandToEdit}
          handleDeleteBrand={handleDeleteBrand}
        />
      ),
    },
  ];

  const handleDeleteBrand = async (brand) => {
    const result = await Alert({
      title: "حذف دسته بندی",
      text: `آیا از حذف ${brand.original_name} اطمینان دارید؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteBrandApi(brand.id);
        if (res.status === 200) {
          setData((lastData) => lastData.filter((d) => d.id != brand.id));
          Toasty(res.data.message, "success");
        }
      } catch (err) {
        Toasty("مشکلی در انجام عملیات رخ داده است", "error");
      }
    }
  };

  const handleOnSuccess = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (!modalOpen) {
      setBrandToEdit(null);
    }
  }, [modalOpen]);

  return (
    <>
      <DataTable
        title="مدیریت برند ها"
        data={data}
        dataInfo={dataInfo}
        limit={5}
        additionalField={additionalField}
        isLoading={loading}
        error={error}
      />
      <AddBrand
        onSuccess={handleOnSuccess}
        setData={setData}
        brandToEdit={brandToEdit}
        setBrandToEdit={setBrandToEdit}
      />
    </>
  );
};

export default BrandsTable;
