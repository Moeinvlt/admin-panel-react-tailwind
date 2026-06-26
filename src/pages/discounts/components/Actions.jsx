import { FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import ActionBtn from "../../../components/ActionBtn";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";

const Actions = ({ rowData, handleDelete }) => {
  const { setModalOpen } = useContext(AdminContext);

  const navigate = useNavigate();

  const handleOnOpenModal = () => {
    setModalOpen(true);
    navigate("/discounts/add-discount-code", {
      state: { discountToEdit: rowData },
    });
  };

  return (
    <>
      <ActionBtn
        pTitle="update_discount"
        actionTitle="ویرایش تخفیف"
        color="purple"
        iconColor="text-purple-500"
        icon={<FiEdit2 />}
        onClick={handleOnOpenModal}
      />
      <ActionBtn
        pTitle="delete_discount"
        actionTitle="حذف تخفیف"
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
