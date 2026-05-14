import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { getCategoriesApi } from "../../../api/category/categoryApi";
import DataTable from "../../../components/DataTable";
import { Toasty } from "../../../utils/customToast";
import Actions from "./Actions";
import ShowInMenue from "./tableAdditions/ShowInMenu";
import { convertToDateToJalali } from "../../../utils/convertDate";

const CategoryTable = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      setError(false);
      setLoading(true);
      try {
        const res = await getCategoriesApi(categoryId);
        if (res.status === 200) {
          setData(res.data.data || []);
        } else {
          Toasty(res.data?.message || "خطا در دریافت داده ها", "error");
          setError(true);
        }
      } catch (error) {
        Toasty(error.message || "خطای شبکه یا سرور", "error");
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [categoryId]);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان دسته" },
    { field: "parent_id", title: "والد" },
  ];

  const additionalField = [
    {
      title: "تاریخ",
      elements: (rowData) => convertToDateToJalali(rowData.created_at),
    },
    {
      title: "نمایش در منو",
      elements: (rowData) => <ShowInMenue rowData={rowData} />,
    },
    {
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} />,
    },
  ];

  return (
    <>
      <Outlet />
      <DataTable
        title="مدیریت دسته بندی محصول"
        data={data}
        dataInfo={dataInfo}
        additionalField={additionalField}
        limit={5}
        isLoading={loading}
        error={error}
      />
    </>
  );
};

export default CategoryTable;
