import * as Yup from "yup";
import { createBrandApi, editBrandApi } from "../../api/brands/brandsApi";
import { Toasty } from "../../utils/customToast";

export const initialValues = {
  original_name: "",
  persian_name: "",
  descriptions: "",
  logo: null,
};

export const onSubmit = async (
  values,
  actions,
  onSuccess,
  setData,
  brandToEdit,
  setBrandToEdit
) => {
  try {
    if (brandToEdit) {
      const res = await editBrandApi(brandToEdit.id, values);

      if (res.status === 200) {
        Toasty(res.data.message, "success");
        setData((lastData) => {
          let newData = [...lastData];
          let index = newData.findIndex((d) => d.id == brandToEdit.id);
          newData[index] = res.data.data;
          return newData;
        });
        setBrandToEdit(null);
        onSuccess && onSuccess();
      } else {
        Toasty("خطای غیرمنتظره از سرور", "error");
      }
    } else {
      const res = await createBrandApi(values);
      if (res.status === 201) {
        Toasty(res.data.message, "success");
        setData((lastData) => [...lastData, res.data.data]);
        actions.resetForm();
        onSuccess && onSuccess();
      }
    }
  } catch (error) {
    Toasty("عملیات با خطا مواجه شد", "error");
  }
};

export const validationSchema = Yup.object({
  original_name: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  persian_name: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده شود"
  ),
  descriptions: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده شود"
  ),
  logo: Yup.mixed()
    .nullable(true)
    .test("fileSize", "حجم فایل نباید بیشتر از 500 کیلوبایت باشد", (value) => {
      if (!value) return true;
      return value.size <= 500 * 1024;
    })
    .test("fileFormat", "فرمت فایل باید jpg باشد", (value) => {
      if (!value) return true;
      return value.type === "image/jpeg";
    }),
});
