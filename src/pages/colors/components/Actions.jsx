import { FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import ActionBtn from "../../../components/ActionBtn";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";

const Actions = ({ rowData, setColorToEdit, handleDelete }) => {
  const { setModalOpen } = useContext(AdminContext);

  const handleOnOpen = () => {
    setColorToEdit(rowData);
    setModalOpen(true)
  };

  return (
    <>
      <ActionBtn
        bgColor="bg-purple-500"
        iconColor="text-purple-500"
        icon={<FiEdit2 />}
        onClick={handleOnOpen}
      />

      <ActionBtn
        bgColor="bg-red-500"
        iconColor="text-red-400"
        icon={<FaTrash />}
        onClick={() => handleDelete(rowData)}
      />
    </>
  );
};

export default Actions;
