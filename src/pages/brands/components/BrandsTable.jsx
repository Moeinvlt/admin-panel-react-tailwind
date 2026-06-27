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
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";
import { Alert } from "../../../utils/alerts";
import { deleteBrandApi } from "../../../api/brands/brandsApi";
import { Toasty } from "../../../utils/customToast";
import { useHasPermission } from "../../../hooks/permissionsHook";

const BrandsTable = () => {
  const { data, setData, loading, error } = useGetBrands();
  const { setModalOpen } = useContext(AdminContext);
  const [brandToEdit, setBrandToEdit] = useState(null);

  const hasAddBrandPerm = useHasPermission("create_brand");
  const hasActionPerm = useHasPermission(["update_brand", "delete_brand"]);

  const handleDeleteBrand = useCallback(async (brand) => {
    const result = await Alert({
      title: "حذف دسته برند",
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
  }, [setData]);

  const dataInfo = useMemo(() => {
    const basicColumns = [
      { field: "id", title: "#" },
      { field: "original_name", title: "عنوان برند (اینگیلیسی)" },
      { field: "persian_name", title: "عنوان برند (فارسی)" },
      {
        field: null,
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
        field: null,
        title: "تاریخ ساخت",
        elements: (rowData) => convertToDateToJalali(rowData.created_at),
      },
      {
        field: null,
        title: "تاریخ آخرین آپدیت",
        elements: (rowData) => convertToDateToJalali(rowData.updated_at),
      },
    ];

    if (hasActionPerm) {
      basicColumns.push({
        field: null,
        title: "عملیات",
        elements: (rowData) => (
          <Actions
            rowData={rowData}
            setBrandToEdit={setBrandToEdit}
            handleDeleteBrand={handleDeleteBrand}
          />
        ),
      });
    }

    return basicColumns;
  }, [hasActionPerm, handleDeleteBrand]);

  const handleOnSuccess = () => {
    setModalOpen(false);
  };

  return (
    <>
      <DataTable
        title="مدیریت برند ها"
        data={data}
        dataInfo={dataInfo}
        limit={5}
        isLoading={loading}
        error={error}
        addPageBtn={false}
        modalBtn={hasAddBrandPerm ? true : false}
      />
      {hasAddBrandPerm && (
        <AddBrand
          onSuccess={handleOnSuccess}
          setData={setData}
          brandToEdit={brandToEdit}
          setBrandToEdit={setBrandToEdit}
        />
      )}
    </>
  );
};

export default BrandsTable;
