import { useParams } from "react-router";
import { Alert } from "../../../utils/alerts";
import { Toasty } from "../../../utils/customToast";
import { deleteCategoryApi } from "../categoryApi";

export const useDeleteCategory = (setData) => {
  const deleteCategory = async (rowData) => {
    const result = await Alert({
      title: "حذف دسته بندی",
      text: `آیا از حذف ${rowData.title} اطمینان دارید؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteCategoryApi(rowData.id);
        if (res.status === 200) {
          setData((prev) =>
            prev.filter((item) => String(item.id) !== String(rowData.id))
          );
          Toasty(res.data.message, "success");
        }
      } catch (err) {
        Toasty("مشکلی در انجام عملیات رخ داده است", "error");
      }
    }
  };

  return { deleteCategory };
};
