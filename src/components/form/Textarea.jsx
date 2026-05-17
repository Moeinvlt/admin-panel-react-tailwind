import { ErrorMessage, FastField } from "formik";
import FormErrorMessage from "./FormErrorMessage";

const Textarea = ({ name, label, placeholder }) => {
  return (
    <>
      <div className="customBox flex w-full max-w-130 mt-5">
        <label className="bg-sky-400/20 text-sky-400 w-27 p-2 flex items-center justify-center">
          {label}
        </label>
        <FastField
          as="textarea"
          name={name}
          className="w-full defaultText p-2 resize-none h-30 outline-none"
          placeholder={placeholder}
        />
      </div>
      <ErrorMessage name={name} component={FormErrorMessage} />
    </>
  );
};

export default Textarea;
