import { ErrorMessage, Field } from "formik";
import FormErrorMessage from "./FormErrorMessage";

const MultiCheckbox = ({ name, label, options }) => {
  return (
    <div className="mt-5">
      <label className="block defaultText mb-2">{label}</label>
      <ErrorMessage name={name} component={FormErrorMessage} />
      <Field name={name}>
        {({ field, form }) => (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {options.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={field.value?.includes(option.id) || false}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    let newValue = field.value ? [...field.value] : [];
                    if (isChecked) {
                      newValue.push(option.id);
                    } else {
                      newValue = newValue.filter((v) => v !== option.id);
                    }
                    form.setFieldValue(name, newValue);
                  }}
                />
                <span className="defaultText text-sm">{option.title}</span>
              </label>
            ))}
          </div>
        )}
      </Field>
    </div>
  );
};

export default MultiCheckbox;
