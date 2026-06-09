import { ErrorMessage, FastField } from "formik";
import FormErrorMessage from "./FormErrorMessage";

const Input = ({ type, name, label, placeholder }) => {
  return (
    <>
      <div className="customBox flex w-full max-w-130 mt-5">
        <label className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center text-[14px]">
          {label}
        </label>
        <FastField
          type={type}
          name={name}
          className="w-full defaultText p-2 outline-none"
          placeholder={placeholder}
        />
      </div>

      <ErrorMessage name={name} component={FormErrorMessage} />
    </>
  );
};

export default Input;
