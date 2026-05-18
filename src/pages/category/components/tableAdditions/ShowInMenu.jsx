import { FaCheck } from "react-icons/fa";
import { HiX } from "react-icons/hi";

const ShowInMenue = ({ rowData }) => {
  return (
    <span className={`px-5 py-1 rounded-md ${rowData.show_in_menu ? "bg-green-500/30 text-green-500" : "bg-red-500/30 text-red-500"}`}>
      {rowData.show_in_menu ? (
        <FaCheck className="inline-block" />
      ) : (
        <HiX className="inline-block" />
      )}
    </span>
  );
};

export default ShowInMenue;
