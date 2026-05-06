import { FastField } from "formik";
import { FaCheck } from "react-icons/fa";

const Checkbox = ({ name, label }) => {
  return (
    <div className="mt-5">
      <label className="flex gap-1 text-[14px] items-center cursor-pointer">
        <span>{label}</span>
        <div className="relative w-4 h-4 border border-gray-500 rounded-[3px] bg-[#242323] flex items-center justify-center">
          <FastField
            type="checkbox"
            name={name}
            className="absolute inset-0 opacity-0 peer z-10 cursor-pointer"
          />
          <FaCheck className="text-green-500 text-xs opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
      </label>
    </div>
  );
};

export default Checkbox;