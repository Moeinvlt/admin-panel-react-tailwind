import { useNavigate } from "react-router";
import { RiArrowLeftLine } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

const PrevPageBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="cursor-pointer bg-gray-500 text-white px-3 py-2 rounded-md"
      onClick={() => navigate(-1)}
    >
      <FaArrowLeft />
    </button>
  );
};

export default PrevPageBtn;
