import { FaCheck } from "react-icons/fa";

const Checkbox = ({ name, label }) => {
  return (
    <div className="mt-5">
      <label htmlFor={name} className="flex gap-2 defaultText">
        {label}
        <div className="flex w-5 h-5 border border-gray-500 rounded-[3px] cursor-pointer">
          <input
            type="checkbox"
            name={name}
            id={name}
            className="sr-only w-full h-full peer"
          />
          <FaCheck className="text-green-500 hidden peer-checked:inline" />
        </div>
      </label>
    </div>
  );
};

export default Checkbox;