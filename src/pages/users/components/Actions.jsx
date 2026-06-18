import { FaTrash, FaFingerprint } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import ActionBtn from "../../../components/ActionBtn";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";

const Actions = ({ rowData, handleDelete  }) => {
  const { setModalOpen } = useContext(AdminContext);

  const navigate = useNavigate();

  const handleOnOpenEditMolad = () => {
    setModalOpen(true);
    navigate("/users/add-user", {
      state: { userId: rowData.id},
    });
  };

  return (
    <>
      <ActionBtn
        actionTitle="ویرایش کاربر"
        color="purple"
        iconColor="text-purple-500"
        icon={<FiEdit2 />}
        onClick={handleOnOpenEditMolad}
      />

      <ActionBtn
        actionTitle="حذف کاربر"
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
