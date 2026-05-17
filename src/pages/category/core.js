import * as Yup from "yup";

export const initialValues = {
  title: "",
  descriptions: "",
  parent_id: "",
  is_active: false,
  show_in_menu: false,
  image: null,
};

export const onSubmit = (values, actions) => {
  console.log(values);
};

export const validationSchema = Yup.object({
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  descriptions: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  parent_id: Yup.number(),
  is_active: Yup.boolean(),
  show_in_menu: Yup.boolean(),
  image: Yup.mixed()
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
