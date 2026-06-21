import * as Yup from "yup";
import { Toasty } from "../../utils/customToast";
import { convertFormDateToMiladi } from "../../utils/convertDate";
import { addNewUserApi, editUserApi } from "../../api/users/usersApi";

export const initialValues = {
  user_name: "",
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  password: "",
  birth_date: "",
  gender: 1,
  roles_id: [],
  // national_code: "",
};

export const onSubmit = async (
  values,
  actions,
  setUsersData,
  userId,
  refetchUsers,
  onSuccess,
) => {
  const rawDate = values.birth_date
    ? convertFormDateToMiladi(values.birth_date)
    : null;

  const submitValues = {
    ...values,
    // national_code: values.national_code ? Number(values.national_code) : null,
    birth_date: rawDate ? rawDate + " 00:00:00" : null,
  };

  try {
    if (userId) {
      const res = await editUserApi(userId, submitValues);
      if (res.status === 200) {
        Toasty(res.data.message, "success");
        if (res.data.data) {
          setUsersData((prev) => {
            if (!Array.isArray(prev)) return prev;
            return prev.map((u) => (u.id === userId ? res.data.data : u));
          });
        }
        onSuccess && onSuccess();
      }
    } else {
      const res = await addNewUserApi(submitValues);
      if (res.status === 201) {
        Toasty(res.data?.message || "کاربر با موفقیت اضافه شد", "success");
       
        setUsersData((prev) => {
          if (!Array.isArray(prev)) return [res.data.data];
          return [...prev, res.data.data];
        });

        if (refetchUsers) refetchUsers();
        actions.resetForm();
        actions.setSubmitting(false);
        onSuccess && onSuccess();
      }
    }
  } catch (error) {
    Toasty(
      error.response?.data?.message || "مشکلی در انجام عملیات به وجود آمده است",
    );
    actions.setSubmitting(false);
  }
};

export const validationSchema = Yup.object().shape({
  user_name: Yup.string()
    .required("نام کاربری الزامی است")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/,
      "فقط حروف و اعداد مجاز است",
    ),
  first_name: Yup.string()
    .required("نام الزامی است")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/,
      "فقط حروف و اعداد مجاز است",
    ),
  last_name: Yup.string()
    .required("نام خانوادگی الزامی است")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/,
      "فقط حروف و اعداد مجاز است",
    ),
  phone: Yup.string()
    .matches(/^[0-9]{11}$/, "شماره موبایل باید 11 رقم باشد")
    .required("شماره موبایل الزامی است"),
  email: Yup.string().email("فرمت ایمیل صحیح نیست"),
  password: Yup.string().when("isEditing", (isEditing, schema) => {
    if (isEditing) {
      return schema
        .nullable()
        .notRequired()
        .matches(
          /^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]*$/,
          "فقط حروف و اعداد مجاز است",
        );
    }
    return schema
      .required("کلمه عبور الزامی است")
      .min(8, "حداقل 8 کاراکتر")
      .matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/,
        "فقط حروف و اعداد مجاز است",
      );
  }),
  birth_date: Yup.string()
    .nullable()
    .matches(/^[0-9/\ \s-]*$/, "فقط اعداد و خط تیره مجاز است"),
  gender: Yup.number(),
  roles_id: Yup.array().min(1, "حداقل یک نقش انتخاب کنید"),
  // national_code: Yup.number()
  //   .typeError("کد ملی باید عدد باشد")
  //   .required("کد ملی الزامی است"),
});
