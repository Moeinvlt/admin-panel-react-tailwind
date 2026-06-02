import { ErrorMessage, Field } from "formik";
import FormErrorMessage from "./FormErrorMessage";

const Select = ({ options, name, label, firstItem, handleOnChange }) => {
  return (
    <>
      <div className="customBox flex w-full max-w-130 mt-5">
        <label
          htmlFor={name}
          className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center"
        >
          {label}
        </label>

        <Field name={name}>
          {({ field, form }) => (
            <select
              id={name}
              className="w-full defaultText p-2 outline-none appearance-none bg-inherit"
              {...field}
              onChange={(e) => {
                field.onChange(e); // تغییرات استاندارد فرمیک
                if (handleOnChange) {
                  handleOnChange(e.target.value, form);
                }
              }}
            >
              <option value="">{firstItem}</option>
              {options.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.value}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>
      <ErrorMessage name={name} component={FormErrorMessage} />
    </>
  );
};

export default Select;
