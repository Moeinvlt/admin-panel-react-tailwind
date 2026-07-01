import { useContext } from "react";
import { useNavigate } from "react-router";
import ActionBtn from "../../../components/ActionBtn";
import { AdminContext } from "../../../context/AdminContextContainer";
import { RiShoppingCartFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

const Actions = ({ rowData, handleDelete }) => {
  const { setModalOpen } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleOpenOnEdit = () => {
    setModalOpen(true);
    navigate("/orders/add-order", {
      state: { orderId: rowData.id },
    });
  };

  return (
    <>
      <ActionBtn
        pTitle="update_cart"
        actionTitle="جزئیات سفارش"
        color="blue"
        iconColor="text-sky-500"
        onClick={handleOpenOnEdit}
        icon={<RiShoppingCartFill />}
      />

      <ActionBtn
        pTitle="delete_cart"
        actionTitle="حذف سفارش"
        color="red"
        iconColor="text-red-400"
        onClick={() => handleDelete(rowData)}
        icon={<FaTrash />}
      />
    </>
  );
};

export default Actions;
