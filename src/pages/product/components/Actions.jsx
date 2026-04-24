import { FaPlus } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { FaSitemap } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const Actions = ({itemId}) => {

  return (
    <>
      <button
        type="button"
        className="text-sky-500 cursor-pointer text-[16px] mr-2 bg-sky-500/30 hover:bg-sky-500 hover:text-white transition-all duration-150 p-2 rounded-md"
      >
        <FaSitemap />
      </button>
      <button
        type="button"
        className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
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
      >
        <FaTrash />
      </button>
    </>
  );
};

export default Actions;
