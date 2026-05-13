import formImage from "../../assets/images/image1nobg.png";
import { FaMobileAlt } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import Input from "../../components/auth/Input";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import AuthSubmitBtn from "../../components/auth/AuthSubmitBtn";
import { Toasty } from "../../utils/customToast";
import AuthFormikControl from "../../components/auth/AuthFormikControl";
import { loginApi } from "../../api/auth/auth";

const initialValues = {
  phone: "",
  password: "",
  remember: false,
};

const onSubmit = async (values, submitMethods, navigate) => {
  const res = await loginApi(values);

  try {
    if (res.status === 200) {
      localStorage.setItem("loginToken", JSON.stringify(res.data));
      navigate("/");
      Toasty("ورود با موفقیت انجام شد", "success");
    } else {
      Toasty(res.data.message, "error");
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);
    Toasty("خطای سمت سرور", "error");
  }
};

const validationSchema = Yup.object({
  phone: Yup.number().required("لطفا این قسمت را پر کنید"),
  password: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[a-zA-Z0-9@!%$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  remember: Yup.boolean(),
});

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[#2d2e2d] flex flex-col gap-10 items-center justify-center">
      <div className="relative w-82.5 min-h-90 bg-amber-50 rounded-xl formShadow px-8.5 pb-6">
        <div className="bg-[#942a00] w-30 rounded-full border-7 border-[#e03f00] formAvatarShadow mx-auto mt-6">
          <img src={formImage} alt="image" className="w-full rounded-full" />
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, submitMethods) =>
            onSubmit(values, submitMethods, navigate)
          }
          validationSchema={validationSchema}
        >
          <Form>
            <AuthFormikControl
              control="input"
              label="شماره موبایل"
              type="text"
              name="phone"
              icon={
                <FaMobileAlt className="text-[20px] text-gray-500 absolute top-1/2 right-4 -translate-y-1/2" />
              }
            />

            <AuthFormikControl
              control="input"
              label="رمز عبور"
              type="password"
              name="password"
              icon={
                <MdLock className="text-[20px] text-gray-500 absolute top-1/2 right-4 -translate-y-1/2 " />
              }
            />

            <AuthFormikControl
              control="checkbox"
              label="مرا به خاطر بسپار"
              name="remember"
            />

            <AuthSubmitBtn />
          </Form>
        </Formik>
      </div>

      <p className="text-[12px] text-gray-500">
        حساب کاربری ندارید؟
        <a href="#" className="text-[#e03f00]">
          اینجا کیلیک کنید
        </a>
      </p>
    </div>
  );
};

export default Login;
