import { FaGripVertical } from "react-icons/fa";

const SettingBtn = () => {
  return (
    <li className="h-full flex items-center justify-center border-border-light dark:border-border-dark px-4 border-r">
      <button
        type="button"
        className="cursor-pointer text-[1.3rem] text-[#61748f] dark:text-dark-rgb"
      >
        <FaGripVertical />
      </button>
    </li>
  );
};

export default SettingBtn;
