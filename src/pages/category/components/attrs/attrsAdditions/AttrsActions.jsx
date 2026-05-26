import { FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import ActionBtn from "../../../../../components/ActionBtn";

const AttrsActions = ({rowData, attrToEdit, setAttrToEdit, handleDelete}) => {
  return (
    <>
      <ActionBtn
        bgColor={`${attrToEdit && attrToEdit.id == rowData.id ? "bg-yellow-500 text-white" : "bg-purple-500"}`}
        iconColor="text-purple-500"
        icon={<FiEdit2 />}
        onClick={() => setAttrToEdit(rowData)}
      />
      <ActionBtn
        bgColor="bg-red-500"
        iconColor="text-red-400"
        icon={<FaTrash />}
        onClick={() => handleDelete(rowData)}
      />
    </>
  );
};

export default AttrsActions;