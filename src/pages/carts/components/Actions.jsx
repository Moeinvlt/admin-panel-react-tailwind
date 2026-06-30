import { useContext } from "react";
import { useNavigate } from "react-router";
import ActionBtn from "../../../components/ActionBtn";
import { AdminContext } from "../../../context/AdminContextContainer";
import { FiEdit2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

const Actions = ({ rowData, handleDelete }) => {
  const { setModalOpen } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleOpenOnEdit = () => {
    setModalOpen(true);
    navigate("/carts/add-cart", {
      state: { cartId: rowData.id },
    });
  };

  return (
    <>
      <ActionBtn
        pTitle="update_cart"
        actionTitle="ویرایش سبد خرید"
        color="purple"
        iconColor="text-purple-500"
        onClick={handleOpenOnEdit}
        icon={<FiEdit2 />}
      />

      <ActionBtn
        pTitle="delete_cart"
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