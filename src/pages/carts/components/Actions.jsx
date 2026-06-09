import { useContext } from "react";
import ActionBtn from "../../../components/ActionBtn";
import { AdminContext } from "../../../context/AdminContextContainer";
import { FiEdit2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

const Actions = ({ rowData, handleDelete }) => {
  const { setModalOpen } = useContext(AdminContext);
  const handleOpenOnEdit = () => {
    setModalOpen(true);
    // setBrandToEdit(rowData);
  };
  return (
    <>
      <ActionBtn
        actionTitle="ویرایش سبد خرید"
        color="purple"
        iconColor="text-purple-500"
        // onClick={handleOpenOnEdit}
        icon={<FiEdit2 />}
      />

      <ActionBtn
        actionTitle="حذف سبد خرید"
        color="red"
        iconColor="text-red-400"
        onClick={() => handleDelete(rowData)}
        icon={<FaTrash />}
      />
    </>
  );
};

export default Actions;
