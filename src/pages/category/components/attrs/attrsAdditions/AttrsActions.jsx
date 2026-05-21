import { FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

const AttrsActions = () => {
  return (
    <>
      <button
        type="button"
        className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
      >
        <FiEdit2 />
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

export default AttrsActions;