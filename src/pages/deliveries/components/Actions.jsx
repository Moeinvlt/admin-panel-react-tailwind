import { FiEdit2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import ActionBtn from "../../../components/ActionBtn";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";

const Actions = ({ rowData, handleDelete, setDeliveryToEdit }) => {
  const { setModalOpen } = useContext(AdminContext);

  const handleOpenOnEdit = () => {
    setModalOpen(true)
    setDeliveryToEdit(rowData)
  }

  return (
    <>
      <ActionBtn
        pTitle="update_delivery"
        actionTitle="ویرایش نحوه ارسال"
        color="purple"
        iconColor="text-purple-500"
        icon={<FiEdit2 />}
        onClick={handleOpenOnEdit}
      />
      <ActionBtn
        pTitle="delete_delivery"
        actionTitle="حذف نحوه ارسال"
        color="red"
        iconColor="text-red-400"
        icon={<FaTrash />}
        onClick={() => handleDelete(rowData)}
      />
    </>
  );
};

export default Actions;
