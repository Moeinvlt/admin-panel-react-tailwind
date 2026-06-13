import { FaTrash, FaFingerprint } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import ActionBtn from "../../../components/ActionBtn";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";

const Actions = ({ rowData, handleDelete }) => {
  const { setModalOpen } = useContext(AdminContext);

  const navigate = useNavigate();

  const handleOnOpenEditMolad = () => {
    setModalOpen(true);
    navigate("/roles/add-role", {
      state: { roleIdToEdit: rowData.id, editType: "role" },
    });
  };
  const handleOnOpenPermissionsMolad = () => {
    setModalOpen(true);
    navigate("/roles/add-role", {
      state: { roleIdToEdit: rowData.id, editType: "permissions" },
    });
  };

  return (
    <>
      <ActionBtn
        actionTitle="ویرایش نقش"
        color="purple"
        iconColor="text-purple-500"
        icon={<FiEdit2 />}
        onClick={handleOnOpenEditMolad}
      />
      <ActionBtn
        actionTitle="ویرایش دسترسی ها"
        color="blue"
        iconColor="text-sky-500"
        icon={<FaFingerprint />}
        onClick={handleOnOpenPermissionsMolad}
      />
      <ActionBtn
        actionTitle="حذف نقش"
        color="red"
        bgColor="bg-red-500"
        iconColor="text-red-400"
        icon={<FaTrash />}
        onClick={() => handleDelete(rowData)}
      />
    </>
  );
};

export default Actions;
