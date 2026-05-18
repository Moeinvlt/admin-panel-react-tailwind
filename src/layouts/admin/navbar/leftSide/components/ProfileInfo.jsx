import { useEffect, useRef } from "react";
import { FiTag } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import { Alert } from "../../../../../utils/alerts";

const ProfileInfo = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    const result = await Alert({
      title: "هشدار",
      text: "آیا میخواهید از حساب کاربری خود خارج شوید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
    });

    if (result.isConfirmed) {
      navigate("/logout");
    }
  };

  return (
    <div
      className={`customBox w-50 fixed top-14 left-12.5 transition-all duration-200 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      ref={menuRef}
    >
      <ul className="w-full flex flex-col gap-3 pb-4 px-4">
        <li className="w-full py-5 border-b border-border-light dark:border-border-dark">
          <p className="text-center defaultText text-[17px]">نام کاربری</p>
        </li>
        <li className="w-full flex gap-2 items-center text-[14px] defaultText">
          <a href="#" className="flex gap-2 items-center w-full cursor-pointer hover:text-sky-500 hover:bg-sky-500/20 hover:dark:bg-gray-900/80 transition-colors duration-150 p-2 rounded-md">
            <FiUser className="text-[20px]" />
            حساب کاربری
          </a>
        </li>
        <li className="w-full flex gap-2 items-center text-[14px] defaultText">
          <a href="#" className="flex gap-2 items-center w-full cursor-pointer hover:text-sky-500 hover:bg-sky-500/20 hover:dark:bg-gray-900/80 transition-colors duration-150 p-2 rounded-md">
            <FiTag className="text-[20px]" />
            تیکت ها
          </a>
        </li>
        <li className="w-full flex gap-2 items-center text-[14px] defaultText">
          <button
            type="button"
            onClick={handleLogout}
            className="flex gap-2 items-center w-full cursor-pointer text-red-500 hover:bg-red-500/30 transition-colors duration-150 p-2 rounded-md"
          >
            <MdLogout className="text-[20px]" />
            خروج
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileInfo;
