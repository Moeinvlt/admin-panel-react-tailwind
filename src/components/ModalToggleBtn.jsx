import { useContext } from "react";
import { AdminContext } from "../context/AdminContextContainer";
import { FaPlus } from "react-icons/fa";

const ModalToggleBtn = () => {
    const { setModalOpen } = useContext(AdminContext);

    return(
        <button
        type="button"
        className="bg-[#28d785] text-[18px] px-4 py-2 cursor-pointer text-white inline-block rounded-md"
        onClick={() => setModalOpen(true)}
      >
        <FaPlus />
      </button>
    )
}

export default ModalToggleBtn;