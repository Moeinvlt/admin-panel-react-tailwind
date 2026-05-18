import * as Yup from "yup";
import { Toasty } from "../../utils/customToast";
import { createCategoryApi } from "../../api/category/categoryApi";


export const initialValues = {
  title: "",
  descriptions: "",
  parent_id: "",
  is_active: false,
  show_in_menu: false,
  image: null,
};

export const onSubmit = async (values, actions, onSuccess) => {
  try {
    values = {
      ...values,
      is_active: values.is_active ? 1 : 0,
      show_in_menu: values.show_in_menu ? 1 : 0,
    };

    const res = await createCategoryApi(values);

    // بررسی خطای اعتبارسنجی در بدنه پاسخ (حتی با status 202)
    if (res.data && res.data.title && Array.isArray(res.data.title)) {
      // فرض می‌کنیم آرایه title حاوی پیام خطاست
      const errorMessage = res.data.title[0] || "خطای اعتبارسنجی در عنوان دسته";
      Toasty(errorMessage, "error");
      return;
    }

    // اگر خطای اعتبارسنجی نبود و status 201 بود، موفقیت
    if (res.status === 201) {
      Toasty('عملیات با موفقیت انجام شد', 'success');
      actions.resetForm();
      onSuccess && onSuccess();
      // در صورت نیاز، بستن مودال یا رفرش جدول
    } 
    // اگر status 202 بود ولی خطای اعتبارسنجی نداشتیم (یعنی احتمالاً در صف پردازش)
    else if (res.status === 202) {
      Toasty('درخواست شما ثبت و در حال پردازش است', 'info');
      actions.resetForm();
    }
    else {
      Toasty('خطای غیرمنتظره از سرور', 'error');
    }
  } catch (err) {
    // خطای شبکه یا خطای سرور که در catch می‌افتد
    const msg = err.response?.data?.message || err.message || 'خطای شبکه یا سرور';
    Toasty(msg, 'error');
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
