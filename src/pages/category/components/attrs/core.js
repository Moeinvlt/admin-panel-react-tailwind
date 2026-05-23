import * as Yup from "yup";
import { addCategoryAttrsApi, editCategoryAttrsApi } from "../../../../api/category/categoryAttr";
import { Toasty } from "../../../../utils/customToast";

export const initialValues = {
  title: "",
  unit: "",
  in_filter: false,
};

export const onSubmit = async (
  values,
  actions,
  categoryDataId,
  setData,
  attrToEdit,
  setAttrToEdit
) => {
  values = {
    ...values,
    in_filter: values.in_filter ? 1 : 0,
  };

  try {
    if (attrToEdit) {
      const res = await editCategoryAttrsApi(attrToEdit.id, values);

      if (res.status === 200) {
        Toasty("عملیات با موفقیت انجام شد", "success");
        setData((oldData) => {
          const newData = [...oldData];
          const index = newData.findIndex(d=>d.id === attrToEdit.id);
          newData[index] = res.data.data;
          return newData;
        });
        setAttrToEdit(null)
      } else {
        Toasty("خطای غیرمنتظره از سرور", "error");
      }
    } else {
      const res = await addCategoryAttrsApi(categoryDataId, values);

      if (res.status === 201) {
        Toasty("عملیات با موفقیت انجام شد", "success");
        setData((oldData) => [...oldData, res.data.data]);
        actions.resetForm();
      } else if (res.status === 202) {
        Toasty("درخواست شما ثبت و در حال پردازش است", "info");
        actions.resetForm();
      } else {
        Toasty("خطای غیرمنتظره از سرور", "error");
      }
    }
  } catch (err) {
    const msg = err.res?.data?.message || err.message || "خطای شبکه یا سرور";
    Toasty(msg, "error");
  } finally {
    actions.setSubmitting(false);
  }
};

export const validationSchema = Yup.object({
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  unit: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  in_filter: Yup.boolean(),
});
