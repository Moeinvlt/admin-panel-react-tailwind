import { useContext } from "react";
import { AdminContext } from "../../../../context/AdminContextContainer";
import { useHasPermission } from "../../../../hooks/permissionsHook";

const SidebarGroupTitle = ({ title, pTitles }) => {
  const { isSidebarOpen } = useContext(AdminContext);
  const hasPerm = useHasPermission(pTitles);

  return (
    hasPerm && (
      <li
        className={` py-2 pr-4 text-gray-400 text-[12px] transition-all duration-150 ${!isSidebarOpen ? "scale-x-0" : "scale-x-100"}`}
      >
        {title}
      </li>
    )
  );
};

export default SidebarGroupTitle;
