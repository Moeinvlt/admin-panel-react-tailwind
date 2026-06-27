import { FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import ActionBtn from "../../../../../components/ActionBtn";

const AttrsActions = ({rowData, attrToEdit, setAttrToEdit, handleDelete}) => {
  return (
    <>
      <ActionBtn
        pTitle="update_category_attr"
        actionTitle="ویرایش ویژگی"
        color={attrToEdit && attrToEdit.id == rowData.id ? "amberNoHover" : "purple"}
        iconColor="text-purple-500"
        icon={<FiEdit2 />}
        onClick={() => setAttrToEdit(rowData)}
      />
      <ActionBtn
        pTitle="delete_category_attr"
        actionTitle="حذف ویژگی"
        color="red"
        iconColor="text-red-400"
        icon={<FaTrash />}
        onClick={() => handleDelete(rowData)}
      />
    </>
  );
};

export default AttrsActions;