import { FaPlus } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { FaSitemap } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { CategoryContext } from "../../../context/CategoryContext";
import { AdminContext } from "../../../context/AdminContextContainer";

const Actions = ({ rowData, handleDelete }) => {
  const navigate = useNavigate();
  const params = useParams();

  const { setEditId } = useContext(CategoryContext);
  const { setModalOpen } = useContext(AdminContext);

  const handleOnOpen = () => {
    setModalOpen(true)
    setEditId(rowData.id)
  }

  return (
    <>
      {!params.categoryId ? (
        <button
          type="button"
          className="text-sky-500 cursor-pointer text-[16px] bg-sky-500/30 hover:bg-sky-500 hover:text-white transition-all duration-150 p-2 rounded-md"
          onClick={() =>
            navigate(`/categories/${rowData.id}`, {
              state: {
                parentData: rowData,
              },
            })
          }
        >
          <FaSitemap />
        </button>
      ) : null}
      <button
        type="button"
        className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
        onClick={handleOnOpen}
      >
        <FiEdit2 />
      </button>
      <button
        type="button"
        className="text-green-500 cursor-pointer text-[16px] mr-2 bg-green-500/30 hover:bg-green-500 hover:text-white transition-all duration-150 p-2 rounded-md"
      >
        <FaPlus />
      </button>
      <button
        type="button"
        className="text-red-400 cursor-pointer text-[16px] mr-2 bg-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-150 p-2 rounded-md"
        onClick={() => handleDelete(rowData)}
      >
        <FaTrash />
      </button>
    </>
  );
};

export default Actions;
