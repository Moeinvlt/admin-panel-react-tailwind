import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useDarkmode } from "../../../../../hooks/useDarkmode";

const DarkmodeBtn = () => {
  const { setDark, setLight } = useDarkmode();

  return (
    <li className="h-full flex items-center justify-center border-border-light dark:border-border-dark px-4 border-r">
      <button
        type="button"
        className="dark:hidden cursor-pointer text-[1.3rem] text-[#61748f] dark:text-dark-rgb"
        onClick={setDark}
      >
        <FaMoon />
      </button>
      <button
        type="button"
        className=" hidden dark:inline cursor-pointer text-[1.3rem] text-[#61748f] dark:text-dark-rgb"
        onClick={setLight}
      >
        <FaSun />
      </button>
    </li>
  );
};

export default DarkmodeBtn;
