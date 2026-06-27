import * as Yup from "yup";
import { Toasty } from "../../utils/customToast";
import {
  createDeliveryApi,
  updateDeliveryApi,
} from "../../api/deliveries/deliveriesApi";

export const initialValues = {
  title: "",
  amount: "",
  time: 1,
  time_unit: "روز",
};

export const onSubmit = async (
  values,
  actions,
  setData,
  deliveryToEdit,
  onSuccess,
) => {
  // تبدیل amount و time به عدد
  const submitValues = {
    ...values,
    amount: Number(values.amount),
    time: Number(values.time),
  };

  try {
    if (deliveryToEdit) {
      const res = await updateDeliveryApi(deliveryToEdit.id, submitValues);
      if (res.status === 200) {
        Toasty(res.data.message, "success");
        setData((lastData) => {
          let newData = [...lastData];
          let index = newData.findIndex((d) => d.id === deliveryToEdit.id);
          newData[index] = res.data.data;
          return newData;
        });
        onSuccess();
      }
    } else {
      const res = await createDeliveryApi(submitValues);
      if (res.status === 201) {
        Toasty(res.data.message, "success");
        actions.resetForm();
        setData((old) => [...old, res.data.data]);
        onSuccess();
      }
    }
  } catch (error) {
    Toasty(
      error.response?.data?.message || "مشکلی در اجرای عملیات به وجود آمده است",
      "error",
    );
    actions.setSubmitting(false);
  }
};

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود",
    ),
  amount: Yup.number()
    .typeError("فقط عدد وارد کنید")
    .required("لطفا این قسمت را پر کنید"),
  time: Yup.number()
    .typeError("فقط عدد وارد کنید")
    .required("لطفا این قسمت را پر کنید"),
  time_unit: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود",
    ),
});
