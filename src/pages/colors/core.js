import { createColorApi, editColorApi } from "../../api/colors/colorsApi";
import * as Yup from "yup";
import { Toasty } from "../../utils/customToast";

export const initialValues = {
  title: "",
  code: "#563d7c",
};

export const onSubmit = async (
  values,
  actions,
  setData,
  colorToEdit,
  setColorToEdit,
  onSuccess,
) => {
  if (colorToEdit) {
    const res = await editColorApi(colorToEdit.id, values);
    if (res.status === 200) {
      Toasty(res.data.message, "success");
      setData((lastData) => {
        let newData = [...lastData];
        let index = newData.findIndex((d) => d.id == colorToEdit.id);
        newData[index] = res.data.data;
        return newData;
      });
      setColorToEdit(null);
      onSuccess && onSuccess();
    }
  } else {
    const res = await createColorApi(values);
    if (res.status === 201) {
      Toasty(res.data.message, "success");
      setData((lastData) => [...lastData, res.data.data]);
      actions.resetForm();
      onSuccess && onSuccess();
    }
  }
};

export const validationSchema = Yup.object({
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از اعداد و حروف لاتین استفاده شود",
    ),
  code: Yup.string().matches(
    /^[a-zA-Z0-9@!%$#?&]+$/,
    "فقط از اعداد و حروف استفاده شود",
  ),
});
