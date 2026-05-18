import { Outlet, useParams } from "react-router";
import DataTable from "../../../components/DataTable";
import { Toasty } from "../../../utils/customToast";
import Actions from "./Actions";
import ShowInMenue from "./tableAdditions/ShowInMenu";
import { convertToDateToJalali } from "../../../utils/convertDate";
import { useGetCategories } from "../../../api/category/hooks/useCategories";
import AddCategory from "./AddCategory";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";

const CategoryTable = () => {
  const { categoryId } = useParams();
  const { data, loading, error, refetch } = useGetCategories(categoryId);

  const { setModalOpen } = useContext(AdminContext);

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

  const handleOnSuccess = () => {
    refetch();
    setModalOpen(false);
  };

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
      <AddCategory onSuccess={handleOnSuccess} />
    </>
  );
};

export default CategoryTable;
