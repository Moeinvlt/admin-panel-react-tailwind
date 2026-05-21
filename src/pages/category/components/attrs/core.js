import * as Yup from "yup";
import { addCategoryAttrsApi } from "../../../../api/category/categoryAttr";
import { Toasty } from "../../../../utils/customToast";

export const initialValues = {
  title: "",
  unit: "",
  in_filter: false,
};

export const onSubmit = async (values, actions, categoryDataId, setData) => {
  values = {
    ...values,
    in_filter: values.in_filter ? 1 : 0,
  };

  const res = await addCategoryAttrsApi(categoryDataId, values);

  try {
    if (res.status === 201) {
      Toasty("عملیات با موفقیت انجام شد", "success");
      setData( oldData => [...oldData, res.data.data])
      actions.resetForm();
    } else if (res.status === 202) {
      Toasty("درخواست شما ثبت و در حال پردازش است", "info");
      actions.resetForm();
    } else {
      Toasty("خطای غیرمنتظره از سرور", "error");
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
