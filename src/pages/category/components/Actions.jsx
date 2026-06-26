import { FaReceipt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { FaSitemap } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { CategoryContext } from "../../../context/CategoryContext";
import { AdminContext } from "../../../context/AdminContextContainer";
import ActionBtn from "../../../components/ActionBtn";

const Actions = ({ rowData, handleDelete }) => {
  const navigate = useNavigate();
  const params = useParams();

  const { setEditId } = useContext(CategoryContext);
  const { setModalOpen } = useContext(AdminContext);

  const handleOnOpen = () => {
    setModalOpen(true);
    setEditId(rowData.id);
  };

  return (
    <>
      {!params.categoryId ? (
        <ActionBtn
          pTitle="read_categor"
          actionTitle="زیر مجموعه ها"
          color="blue"
          iconColor="text-sky-500"
          icon={<FaSitemap />}
          onClick={() => {
            navigate(`/categories/${rowData.id}`, {
              state: { parentData: rowData },
            });
          }}
        />
      ) : null}
      <ActionBtn
        pTitle="update_category"
        actionTitle="ویرایش گروه محصول"
        color="purple"
        iconColor="text-purple-500"
        icon={<FiEdit2 />}
        onClick={handleOnOpen}
      />
      {params.categoryId ? (
        <ActionBtn
          pTitle="create_category_attr"
          actionTitle="ویژگی های دسته بندی"
          color="green"
          iconColor="text-green-500"
          icon={<FaReceipt />}
          onClick={() =>
            navigate(`/categories/${rowData.id}/attributes`, {
              state: {
                categoryData: rowData,
              },
            })
          }
        />
      ) : null}
      <ActionBtn
        pTitle="delete_category"
        actionTitle="حذف گروه محصول"
        color="red"
        iconColor="text-red-400"
        icon={<FaTrash />}
        onClick={() => handleDelete(rowData)}
      />
    </>
  );
};

export default Actions;
