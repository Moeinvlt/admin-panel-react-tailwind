import { FaList, FaPlus, FaTrash, FaImages } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import ActionBtn from "../../../components/ActionBtn";
import { useNavigate } from "react-router";

const Actions = ({ rowData, handleDelete }) => {
  const navigate = useNavigate()

  return (
    <>
      <ActionBtn
        pTitle="update_product"
        actionTitle="ویرایش محصول"
        color="purple"
        icon={<FiEdit2 />}
        iconColor="text-purple-500"
        onClick={() => navigate('/products/add-product', {state: {productToEdit:rowData}})}
      />
      <ActionBtn
        pTitle="create_product_attr"
        actionTitle="ویژگی ها"
        color="green"
        icon={<FaList />}
        iconColor="text-green-500"
        onClick={() => navigate('/products/set-attr', {state: {selectedProduct: rowData}})}
      />
      <ActionBtn
        pTitle="create_product_image"
        actionTitle="گالری تصاویر"
        color="blue"
        icon={<FaImages />}
        iconColor="text-sky-400"
        onClick={() => navigate('/products/gallery', {state: {selectedProduct: rowData}})}
      />
      <ActionBtn
        pTitle="delete_product"
        actionTitle="حذف محصول"
        color="red"
        icon={<FaTrash />}
        iconColor="text-red-400"
        onClick={() => handleDelete(rowData)}
      />
    </>
  );
};

export default Actions;
