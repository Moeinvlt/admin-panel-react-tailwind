import formImage from "../../assets/images/image1nobg.png";
import { FaMobileAlt } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import Input from "../../components/auth/Input";
import { Form, Formik } from "formik";
import AuthFormikControl from "./AuthFormikControl";
import * as Yup from "yup";

const initialValues = {
  phone: "",
  password: "",
  remember: false,
};

const onSubmit = () => {
};

const validationSchema = Yup.object({
  phone: Yup.number().required("لطفا این قسمت را پر کنید"),
  password: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[a-zA-Z0-9@!%$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  remember: Yup.boolean(),
});

const Login = () => {
  return (
    <div className="w-full h-screen bg-[#2d2e2d] flex flex-col gap-10 items-center justify-center">
      <div className="relative w-82.5 min-h-90 bg-amber-50 rounded-xl formShadow px-8.5">
        <div className="bg-[#942a00] w-30 rounded-full border-7 border-[#e03f00] formAvatarShadow mx-auto mt-6">
          <img src={formImage} alt="image" className="w-full rounded-full" />
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit()}
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

            <div className="absolute bottom-0 translate-y-1/2  w-full right-0 flex justify-center">
              <button
                type="submit"
                className="flex items-center justify-center bg-[#e03f00] formBtnShadow text-white w-40 py-2 rounded-full cursor-pointer"
              >
                <MdArrowBack /> ورود
              </button>
            </div>
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
