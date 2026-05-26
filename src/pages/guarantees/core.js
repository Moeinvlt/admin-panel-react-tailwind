import * as Yup from "yup";
import { Toasty } from "../../utils/customToast";
import {
  createGuaranteesApi,
  editGuaranteesApi,
} from "../../api/guarantees/GuaranteesApi";

export const initialValues = {
  title: "",
  descriptions: "",
  length: "",
  length_unit: "",
};

export const onSubmit = async (
  values,
  actions,
  onSuccess,
  setData,
  guaranteeToEdit,
  setGuaranteeToEdit
) => {
  try {
    if (guaranteeToEdit) {
      const res = await editGuaranteesApi(guaranteeToEdit.id, values);
      if (res.status === 200) {
        Toasty(res.data.message, "success");
        setData((lastData) => {
          let newData = [...lastData];
          let index = newData.findIndex((d) => d.id == guaranteeToEdit.id);
          newData[index] = res.data.data;
          return newData;
        });
        setGuaranteeToEdit(null)
        onSuccess && onSuccess();
      } else {
        Toasty("خطای غیرمنتظره از سرور", "error");
      }
    } else {
      const res = await createGuaranteesApi(values);
      if (res.status === 201) {
        Toasty(res.data.message, "success");
        setData((lastData) => [...lastData, res.data.data]);
        actions.resetForm();
        onSuccess && onSuccess();
      } else {
        Toasty(res.data.message, "error");
      }
    }
  } catch (error) {
    Toasty("عملیات با خطا مواجه شد", "error");
  }
};

export const validationSchema = Yup.object({
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف لاتین و اعداد استفاده شود"
    ),
  descriptions: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده شود"
  ),
  length: Yup.number(),
  length_unit: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف لاتین و اعداد استفاده شود"
  ),
});
