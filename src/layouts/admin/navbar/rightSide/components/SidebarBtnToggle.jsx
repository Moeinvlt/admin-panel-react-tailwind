import { useContext } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { AdminContext } from "../../../../../context/AdminContextContainer";
import { HiX } from "react-icons/hi";

const SidebarBtnToggle = () => {
  const {sidebarOpen, setSidebarOpen} = useContext(AdminContext);

  return (
    <button
      type="button"
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="cursor-pointer text-[1.3rem] text-[#61748f] dark:text-dark-rgb"
    >
      {!sidebarOpen ? <HiOutlineMenu /> : <HiX />}
    </button>
  );
};

export default SidebarBtnToggle;
