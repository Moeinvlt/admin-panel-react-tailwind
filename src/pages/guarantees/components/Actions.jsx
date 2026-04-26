import { FaTrash } from "react-icons/fa";

const Actions = ({itemId}) => {
    return(
    <>
        <button
        type="button"
        className="text-red-400 cursor-pointer text-[16px] mr-2 bg-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-150 p-2 rounded-md"
        >
        <FaTrash />
        </button>
    </>
    )
};

export default Actions;