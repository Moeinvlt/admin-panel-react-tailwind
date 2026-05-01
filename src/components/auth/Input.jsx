import { FastField } from "formik";

const Input = ({ type, name, icon, label }) => {
  return (
    <div className="relative bg-[#242323] mt-5.5 rounded-full">
      <label htmlFor="" className="sr-only">
       {label}
      </label>
      <FastField
        type={type}
        name={name}
        className="outline-none w-full h-full text-gray-500 py-2.5 rounded-full pr-12"
        placeholder={label}
      />
      {icon}
    </div>
  );
};

export default Input;
