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
import { CategoryContext } from "../../../context/CategoryContext";
import { Alert } from "../../../utils/alerts";
import { useDeleteCategory } from "../../../api/category/hooks/useDeleteCategory";
import IsActive from "./tableAdditions/IsActive";

const CategoryTable = () => {
  const { categoryId } = useParams();
  const { data, loading, error, refetch, setData } = useGetCategories(categoryId);
  const { setEditId } = useContext(CategoryContext);
  const { deleteCategory } = useDeleteCategory(setData)

  const { setModalOpen } = useContext(AdminContext);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان دسته" },
    { field: "parent_id", title: "والد" },
  ];

  const additionalField = [
    {
      title: "نمایش در منو",
      elements: (rowData) => <ShowInMenue rowData={rowData} />,
    },
    {
      title: "وضعیت",
      elements: (rowData) => <IsActive rowData={rowData} />,
    },
    {
      title: "تاریخ",
      elements: (rowData) => convertToDateToJalali(rowData.created_at),
    },
    {
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} handleDelete={deleteCategory} />,
    },
  ];

  const handleOnSuccess = () => {
    refetch();
    setModalOpen(false);
    setEditId(null);
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
