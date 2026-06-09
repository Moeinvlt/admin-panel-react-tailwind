import { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router";
import { AdminContext } from "../context/AdminContextContainer";

const ModalPageBtn = ({ linkPath }) => {
    const { setModalOpen } = useContext(AdminContext);
  
  return (
    <NavLink
      to={linkPath}
      className=" bg-[#28d785] text-[18px] px-4 h-full cursor-pointer text-white flex items-center rounded-md"
      onClick={() => setModalOpen(true)}
    >
      <FaPlus />
    </NavLink>
  );
};

export default ModalPageBtn;