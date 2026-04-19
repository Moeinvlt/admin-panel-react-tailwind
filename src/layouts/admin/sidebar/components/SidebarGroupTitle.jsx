
const SidebarGroupTitle = ({ title, isSidebarOpen }) => {

    return(
        <li className={` py-2 pr-4 text-gray-400 text-[12px] transition-all duration-150 ${!isSidebarOpen ? "scale-x-0" : "scale-x-100"}`}>
          {title}
        </li>
    )
}

export default SidebarGroupTitle;