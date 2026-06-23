import { useContext } from "react";
import { NavLink } from "react-router";
import { AdminContext } from "../../../../context/AdminContextContainer";
import { useHasPermission } from "../../../../hooks/permissionsHook";

const SidebarItem = ({ title, icon, path, pTitle }) => {
  const { isSidebarOpen } = useContext(AdminContext);
  const hasPerm = useHasPermission(pTitle);

  return (
    hasPerm && (
      <li>
        <NavLink
          to={path}
          className={({ isActive }) =>
            `sidebarItem ${isActive ? "active" : ""}`
          }
        >
          <span className="text-[1.2rem] transition-all duration-150">
            {icon}
          </span>
          <span className={`${!isSidebarOpen ? "hidden" : "block"}`}>
            {title}
          </span>
        </NavLink>
      </li>
    )
  );
};

export default SidebarItem;
