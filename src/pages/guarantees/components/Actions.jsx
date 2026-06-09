import { FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import ActionBtn from "../../../components/ActionBtn";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";

const Actions = ({ rowData, setGuaranteeToEdit, handleDelete }) => {
  const { setModalOpen } = useContext(AdminContext);

  const handleOpenOnEdit = () => {
    setModalOpen(true)
    setGuaranteeToEdit(rowData);
  };

  return (
    <>
      <ActionBtn
        actionTitle="ویرایش گارانتی"
        color="purple"
        iconColor="text-purple-500"
        icon={<FiEdit2 />}
        onClick={handleOpenOnEdit}
      />

      <ActionBtn
        actionTitle="حذف گارانتی"
        color="red"
        iconColor="text-red-400"
        icon={<FaTrash />}
        onClick={() =>  handleDelete(rowData)}
      />
    </>
  );
};

export default Actions;
