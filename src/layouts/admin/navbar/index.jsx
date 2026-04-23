import RightSide from "./rightSide";
import LeftSide from "./leftSide/Index";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";

const Navbar = () => {
  const { sidebarOpen } = useContext(AdminContext);

  return (
    <header
      className={`fixed top-0 w-full h-17 ${
        sidebarOpen ? "pr-60" : "pr-14"
      } transition-all duration-150 border-b border-border-light dark:border-border-dark bg-white dark:bg-gray-800 box-shadow z-40`}
    >
      <nav className="h-full w-full flex justify-between items-center bg-inherit">
        <RightSide />

        <LeftSide />
      </nav>
    </header>
  );
};

export default Navbar;
