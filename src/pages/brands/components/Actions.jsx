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
        pTitle="update_brand"
        actionTitle="ویرایش برند"
        color="purple"
        iconColor="text-purple-500"
        onClick={handleOpenOnEdit}
        icon={<FiEdit2 />}
      />

      <ActionBtn
        pTitle="delete_brand"
        actionTitle="حذف برند"
        color="red"
        iconColor="text-red-400"
        onClick={() => handleDeleteBrand(rowData)}
        icon={<FaTrash />}
      />
    </>
  );
};

export default Actions;
