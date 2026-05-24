import { FaPlus, FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { AdminContext } from "../../../context/AdminContextContainer";
import { useContext } from "react";

const Actions = ({ rowData, setBrandToEdit, handleDeleteBrand }) => {
  const { setModalOpen } = useContext(AdminContext);
  const handleOpenOnEdit = () => {
    setModalOpen(true);
    setBrandToEdit(rowData);
  };

  return (
    <>
      <button
        type="button"
        className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
        onClick={handleOpenOnEdit}
      >
        <FiEdit2 />
      </button>

      <button
        type="button"
        className="text-red-400 cursor-pointer text-[16px] mr-2 bg-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-150 p-2 rounded-md"
        onClick={() => handleDeleteBrand(rowData)}
      >
        <FaTrash />
      </button>
    </>
  );
};

export default Actions;
