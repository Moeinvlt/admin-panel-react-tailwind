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
      className={`customBox w-full md:w-50 fixed top-17 md:left-12.5 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      ref={menuRef}
    >
      <ul className="w-full">
        <li className="w-full py-5 border-b border-border-light dark:border-border-dark">
          <p className="text-center defaultText text-[17px]">نام کاربری</p>
        </li>
        <li className="w-full flex gap-2 items-center text-[14px] py-3 px-4 defaultText">
          <FiUser />
          حساب کاربری
        </li>
        <li className="w-full flex gap-2 items-center text-[14px] py-3 px-4 defaultText">
          <FiTag />
          تیکت ها
        </li>
        <li className="w-full flex gap-2 items-center text-[14px] py-3 px-4 defaultText border-t border-border-light dark:border-border-dark">
          <button
            type="button"
            onClick={handleLogout}
            className="flex gap-2 items-center cursor-pointer"
          >
            <MdLogout />
            خروج
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileInfo;
