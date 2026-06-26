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
        pTitle="update_color"
        actionTitle="ویرایش رنگ"
        color="purple"
        iconColor="text-purple-500"
        icon={<FiEdit2 />}
        onClick={handleOnOpen}
      />

      <ActionBtn
        pTitle="delete_color"
        actionTitle="حذف رنگ"
        color="red"
        iconColor="text-red-400"
        icon={<FaTrash />}
        onClick={() => handleDelete(rowData)}
      />
    </>
  );
};

export default Actions;
