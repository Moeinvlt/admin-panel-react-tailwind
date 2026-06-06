import { FaList, FaPlus } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { FaSitemap } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import ActionBtn from "../../../components/ActionBtn";
import { useNavigate } from "react-router";

const Actions = ({ rowData, handleDelete }) => {
  const navigate = useNavigate()

  return (
    <>
      <ActionBtn
        bgColor="bg-purple-500"
        icon={<FiEdit2 />}
        iconColor="text-purple-500"
        onClick={() => navigate('/products/add-product', {state: {productToEdit:rowData}})}
      />
      <ActionBtn
        bgColor="bg-green-500"
        icon={<FaList />}
        iconColor="text-green-500"
      />
      <ActionBtn
        bgColor="bg-red-500"
        icon={<FaTrash />}
        iconColor="text-red-400"
        onClick={() => handleDelete(rowData)}
      />
    </>
  );
};

export default Actions;
