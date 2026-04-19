import { FaBell } from "react-icons/fa";

const NotificationBtn = () => {
  return (
    <li className="h-full flex items-center justify-center border-border-light dark:border-border-dark px-4 border-r">
      <button
        type="button"
        className="cursor-pointer text-[1.3rem] text-[#61748f] dark:text-dark-rgb"
      >
        <FaBell />
      </button>
    </li>
  );
};

export default NotificationBtn;