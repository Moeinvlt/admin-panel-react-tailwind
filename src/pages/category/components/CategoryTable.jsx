import { Outlet, useParams } from "react-router";
import DataTable from "../../../components/DataTable";
import { Toasty } from "../../../utils/customToast";
import Actions from "./Actions";
import ShowInMenue from "./tableAdditions/ShowInMenu";
import { convertToDateToJalali } from "../../../utils/convertDate";
import { useGetCategories } from "../../../api/category/hooks/useCategories";

const CategoryTable = () => {
  const { categoryId } = useParams();
  const { data, loading, error } = useGetCategories(categoryId);

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
