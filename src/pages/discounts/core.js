import * as Yup from "yup";
import {
  createDiscountApi,
  updateDiscountApi,
} from "../../api/discounts/discountsApi";
import { convertFormDateToMiladi } from "../../utils/convertDate";
import { Toasty } from "../../utils/customToast";

export const initialValues = {
  title: "",
  code: "",
  percent: 0,
  expire_at: "",
  for_all: true,
  product_ids: "",
};

export const onSubmit = async (
  values,
  actions,
  setDiscountsData,
  discountToEdit,
  onSuccess,
) => {
  values = {
    ...values,
    expire_at: convertFormDateToMiladi(values.expire_at),
  };
  if (discountToEdit) {
    const res = await updateDiscountApi(discountToEdit.id, values);
    if (res.status == 200) {
      Toasty(res.data.message, "success");
      onSuccess && onSuccess();
      setDiscountsData((lastData) => {
        let newData = [...lastData];
        let index = newData.findIndex((d) => d.id == discountToEdit.id);
        newData[index] = res.data.data;
        return newData;
      });
    }
  } else {
    const res = await createDiscountApi(values);
    if (res.status == 201) {
      Toasty(res.data.message, "success");
      actions.resetForm();
      onSuccess && onSuccess();
      setDiscountsData((old) => [...old, res.data.data]);
    }
  }
};

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود",
    ),
  expire_at: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[0-9/\ \s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
  code: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[a-zA-Z0-9\s@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  percent: Yup.number().required("لطفا این قسمت را پر کنید"),
  for_all: Yup.boolean(),
  product_ids: Yup.string().when("for_all", {
    is: false,
    then: (schema) =>
      schema
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[0-9\s-]+$/, "فقط از اعداد و خط تیره استفاده شود"),
    otherwise: (schema) => schema.notRequired().nullable(), // اضافه شود
  }),
});
