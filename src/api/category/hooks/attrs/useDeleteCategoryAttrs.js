import { useCallback } from "react";
import { Alert } from "../../../../utils/alerts";
import { Toasty } from "../../../../utils/customToast";
import { deleteCategoryAttrsApi } from "../../categoryAttr";

export const useDeleteCategoryAttrs = (setData) => {
  const deleteCategoryAttr = useCallback(async (attr) => {
    const result = await Alert({
      title: `حذف ${attr.title}`,
      text: `آیا از حذف ${attr.title} اطمینان دارید؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteCategoryAttrsApi(attr.id);
        if (res.status === 200) {
          setData((lastData) => [...lastData].filter((d) => d.id != attr.id));
          Toasty(res.data.message, "success");
        }
      } catch (err) {
        Toasty("مشکلی در انجام عملیات رخ داده است", "error");
      }
    }
  }, [setData]);

  return { deleteCategoryAttr };
};
