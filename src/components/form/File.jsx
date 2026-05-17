import { ErrorMessage, FastField } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import { FaTimes } from "react-icons/fa";

const File = ({ name, label, placeholder }) => {
  return (
    <FastField>
      {({ form }) => {
        const fileValue = form.values[name];
        const handleClear = () => {
          form.setFieldValue(name, null);
        };

        return (
          <>
            <div className="customBox flex w-full max-w-130 mt-5 items-center">
              <span className="bg-sky-400/20 text-sky-400 w-27 p-2 flex items-center justify-center">
                {label}
              </span>
              <input
                type="file"
                name={name}
                placeholder={placeholder}
                className="w-full defaultText p-2 outline-none"
                onChange={(e) => {
                  const file = e.target.files[0];
                  form.setFieldValue(name, file || null);
                }}
              />
              {fileValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <ErrorMessage name={name} component={FormErrorMessage} />
          </>
        );
      }}
    </FastField>
  );
};

export default File;