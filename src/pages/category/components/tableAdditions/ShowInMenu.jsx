import { FaCheck } from "react-icons/fa";
import { HiX } from "react-icons/hi";

const ShowInMenue = ({ rowData }) => {
  return (
    <span>
      {rowData.show_in_menu ? (
        <FaCheck className="inline-block text-green-500" />
      ) : (
        <HiX className="inline-block bg-red-500" />
      )}
    </span>
  );
};

export default ShowInMenue;
