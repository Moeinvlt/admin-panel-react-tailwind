import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router";

const AddPageBtn = ({ linkPath }) => {
  return (
    <NavLink
      to={linkPath}
      className=" bg-[#28d785] text-[18px] px-4 cursor-pointer text-white flex items-center rounded-md"
    >
      <FaPlus />
    </NavLink>
  );
};

export default AddPageBtn;
