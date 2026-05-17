import { ErrorMessage, FastField } from "formik";
import FormErrorMessage from "./FormErrorMessage";

const Select = ({ options, name, label }) => {
  return (
    <>
      <div className="customBox flex w-full max-w-130 mt-5">
        <label htmlFor={name} className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
          {label}
        </label>
        <FastField
          as="select"
          name={name}
          id={name}
          className="w-full defaultText p-2 outline-none appearance-none bg-inherit"
        >
          <option value="">دسته والد را انتخواب کنید</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.value}
            </option>
          ))}
        </FastField>
      </div>
      <ErrorMessage name={name} component={FormErrorMessage} />
    </>
  );
};

export default Select;
