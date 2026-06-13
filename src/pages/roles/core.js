import * as Yup from "yup";
import { Toasty } from "../../utils/customToast";
import {
  createRoleApi,
  editRoleApi,
  editRolePermissionsApi,
} from "../../api/users/usersApi";

export const initialValues = {
  title: "",
  description: "",
  permissions_id: [],
  editPermissions: false,
};

export const onSubmit = async (
  values,
  actions,
  setRolesData,
  roleIdToEdit,
  editType,
  onSuccess,
) => {
  try {
    if (editType == "role") {
      const res = await editRoleApi(roleIdToEdit, values);
      if (res.status === 200) {
        Toasty(res.data.message, "success");
        setRolesData((lastData) => {
          let newData = [...lastData];
          let index = newData.findIndex((d) => d.id == roleIdToEdit);
          newData[index] = res.data.data;
          return newData;
        });
        onSuccess();
      }
    } else if (editType == "permissions") {
      const res = await editRolePermissionsApi(roleIdToEdit, values);
      if (res.status === 200) {
        Toasty(res.data.message, "success");
        onSuccess();
      }
    } else {
      const res = await createRoleApi(values);
      console.log(values)
      if (res.status === 201 || res.status === 202) {
        Toasty(res.data.message, "success");
        setRolesData((old) => [...old, res.data.data]);
        actions.resetForm();
        actions.setSubmitting(false);
        onSuccess();
      }
    }
  } catch (error) {
    console.error("Submit error:", error);
    Toasty("عملیات با خطا مواجه شد", "error");
    actions.setSubmitting(false);
  }
};

export const validationSchema = Yup.object().shape({
  title: Yup.string().when("editPermissions", (editPermissions, schema) => {
    if (editPermissions) {
      return schema.notRequired(); // در حالت ویرایش مجوزها، عنوان الزامی نیست
    }
    return schema
      .required("لطفا این قسمت را پر کنید")
      .matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/,
        "فقط از حروف و اعداد استفاده شود",
      );
  }),
  description: Yup.string().when(
    "editPermissions",
    (editPermissions, schema) => {
      if (editPermissions) {
        return schema.notRequired();
      }
      return schema
        .required("لطفا این قسمت را پر کنید")
        .matches(
          /^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/,
          "فقط از حروف و اعداد استفاده شود",
        );
    },
  ),
  permissions_id: Yup.array().min(1, "حد اقل یک مورد انتخاب کنید"),
});
