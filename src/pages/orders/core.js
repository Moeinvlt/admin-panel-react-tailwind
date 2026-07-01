import * as Yup from "yup";
import { convertFormDateToMiladi } from "../../utils/convertDate";
import { Toasty } from "../../utils/customToast";
import { createOrderApi } from "../../api/orders/ordersApi";

export const initialValues = {
  cart_id: "",
  discount_id: "",
  delivery_id: "",
  address: "",
  phone: "",
  email: "",
  pay_at: "",
  pay_card_number: "",
  pay_bank: "",
};

export const onSubmit = async (values, actions, onSuccess, setOrdersData) => {
  try {
    const submitValues = {
      ...values,
      pay_at: values.pay_at ? convertFormDateToMiladi(values.pay_at) : null,
    };

    const res = await createOrderApi(submitValues);
    if (res.status === 201) {
      Toasty(res.data.message, "success");

      if (setOrdersData && typeof setOrdersData === "function") {
        setOrdersData((prev) => [...prev, res.data.data]);
      }

      actions.resetForm();
      onSuccess();
    }
  } catch (error) {
    console.error(error);
    Toasty(error.response?.data?.message || "خطا در ایجاد سفارش", "error");
  } finally {
    actions.setSubmitting(false);
  }
};

export const validationSchema = Yup.object().shape({
  cart_id: Yup.number()
    .typeError("فقط عدد وارد کنید")
    .required("لطفا این قسمت را پر کنید"),
  discount_id: Yup.number().typeError("فقط عدد وارد کنید").nullable(),
  delivery_id: Yup.number()
    .typeError("فقط عدد وارد کنید")
    .required("لطفا این قسمت را پر کنید"),
  address: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود",
    ),
  phone: Yup.string()
    .matches(/^[0-9]{11}$/, "شماره تماس باید 11 رقم باشد")
    .required("لطفا این قسمت را پر کنید"),
  email: Yup.string().email("فرمت ایمیل را رعایت کنید").nullable(),
  pay_at: Yup.string()
    .nullable()
    .matches(/^[0-9/\ \s-]*$/, "فقط از اعداد و خط تیره استفاده شود"),
  pay_card_number: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[0-9]{16}$/, "شماره کارت باید 16 رقم باشد"),
  pay_bank: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]*$/,
      "فقط از حروف و اعداد استفاده شود",
    ),
});
