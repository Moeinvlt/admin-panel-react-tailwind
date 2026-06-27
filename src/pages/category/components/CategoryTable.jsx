import { Outlet, useParams } from "react-router";
import DataTable from "../../../components/DataTable";
import { Toasty } from "../../../utils/customToast";
import Actions from "./Actions";
import ShowInMenue from "./tableAdditions/ShowInMenu";
import { convertToDateToJalali } from "../../../utils/convertDate";
import { useGetCategories } from "../../../api/category/hooks/useCategories";
import AddCategory from "./AddCategory";
import { useContext, useMemo } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";
import { CategoryContext } from "../../../context/CategoryContext";
import { Alert } from "../../../utils/alerts";
import { useDeleteCategory } from "../../../api/category/hooks/useDeleteCategory";
import IsActive from "./tableAdditions/IsActive";
import { useHasPermission } from "../../../hooks/permissionsHook";

const CategoryTable = () => {
  const { categoryId } = useParams();
  const { data, loading, error, refetch, setData } =
    useGetCategories(categoryId);
  const { setEditId } = useContext(CategoryContext);
  const { deleteCategory } = useDeleteCategory(setData);

  const { setModalOpen } = useContext(AdminContext);

  const hasAddCategoryPerm = useHasPermission("create_category");
  const hasActionPerm = useHasPermission([
    "read_category",
    "update_category",
    "create_category_attr",
    "delete_category",
  ]);

  const dataInfo = useMemo(() => {
    const basicColumns = [
      { field: "id", title: "#" },
      { field: "title", title: "عنوان دسته" },
      { field: "parent_id", title: "والد" },
      {
        field: null,
        title: "نمایش در منو",
        elements: (rowData) => <ShowInMenue rowData={rowData} />,
      },
      {
        field: null,
        title: "وضعیت",
        elements: (rowData) => <IsActive rowData={rowData} />,
      },
      {
        field: null,
        title: "تاریخ ساخت",
        elements: (rowData) => convertToDateToJalali(rowData.created_at),
      },
    ];

    if (hasActionPerm) {
      basicColumns.push({
        field: null,
        title: "عملیات",
        elements: (rowData) => (
          <Actions rowData={rowData} handleDelete={deleteCategory} />
        ),
      });
    }

    return basicColumns;
  }, [hasActionPerm, deleteCategory]);

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
        limit={5}
        isLoading={loading}
        error={error}
        addPageBtn={false}
        modalBtn={hasAddCategoryPerm ? true : false}
      />
      {hasAddCategoryPerm && <AddCategory onSuccess={handleOnSuccess} />}
    </>
  );
};

export default CategoryTable;
