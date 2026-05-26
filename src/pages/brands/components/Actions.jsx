import { FaPlus, FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { AdminContext } from "../../../context/AdminContextContainer";
import { useContext } from "react";
import ActionBtn from "../../../components/ActionBtn";

const Actions = ({ rowData, setBrandToEdit, handleDeleteBrand }) => {
  const { setModalOpen } = useContext(AdminContext);
  const handleOpenOnEdit = () => {
    setModalOpen(true);
    setBrandToEdit(rowData);
  };

  return (
    <>
      <ActionBtn
        bgColor="bg-purple-500"
        iconColor="text-purple-500"
        onClick={handleOpenOnEdit}
        icon={<FiEdit2 />}
      />

      <ActionBtn
        bgColor="bg-red-500"
        iconColor="text-red-400"
        onClick={() => handleDeleteBrand(rowData)}
        icon={<FaTrash />}
      />
    </>
  );
};

export default Actions;
