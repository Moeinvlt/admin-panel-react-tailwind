import { FaSearch } from "react-icons/fa";
import ModalToggleBtn from "../../components/ModalToggleBtn";
import ColorsTable from "./components/ColorsTable";
import AddColor from "./components/AddColor";

const Colors = () => {
  return (
    <div className="px-8">
      <h3 className="text-center defaultText py-4">مدیریت رنگ ها</h3>

      <div className="flex w-full justify-between gap-4 xl:gap-0 pb-6">
        <div className="relative customBox w-full max-w-[320px]">
          <input
            type="text"
            placeholder="جستوجو..."
            className="border-none defaultText outline-none px-4 py-2 w-full placeholder:text-gray-500"
          />
          <button
            type="button"
            className="cursor-pointer top-1/2 -translate-y-1/2 absolute left-3 text-gray-400 dark:text-[#ffffff99]"
          >
            <FaSearch />
          </button>
        </div>

        <div>
          <ModalToggleBtn />
        </div>
      </div>

      <ColorsTable />

      <AddColor />
    </div>
  );
};

export default Colors;
