import { FastField } from "formik";
import { FaCheck } from "react-icons/fa";

const Checkbox = ({ name, label }) => {
  return (
    <div className="mt-5">
      <label className="flex gap-2 defaultText cursor-pointer items-center">
        <span>{label}</span>
        <div className="relative w-5 h-5 border border-gray-500 rounded-[3px]">
          <FastField name={name}>
            {({ field }) => (
              <>
                <input
                  type="checkbox"
                  id={name}
                  {...field}
                  checked={
                    field.value === true ||
                    field.value === 1 ||
                    field.value === "1"
                  }
                  className="sr-only peer"
                />
                <FaCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500 hidden peer-checked:block" />
              </>
            )}
          </FastField>
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
