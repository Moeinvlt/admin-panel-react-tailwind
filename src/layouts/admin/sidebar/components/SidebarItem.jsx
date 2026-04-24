import { NavLink } from "react-router";

const SidebarItem = ({ title, icon, isSidebarOpen, path }) => {
  return (
    <li>
      <NavLink to={path} className={({isActive}) => `sidebarItem ${isActive ? "active" : ""}`}>
        <span className="text-[1.2rem] transition-all duration-150">
          {icon}
        </span>
        <span className={`${!isSidebarOpen ? "hidden" : "block"}`}>
          {title}
        </span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
