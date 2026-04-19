
const SidebarItem = ({title, icon, isSidebarOpen}) => {

    return(
        <li>
            <a href="#" className="sidebarItem">
                <span className="text-[1.2rem] transition-all duration-150">{icon}</span> <span className={`${!isSidebarOpen ? "hidden" : "block"}`}>{title}</span>
            </a>
        </li>
    )
}

export default SidebarItem;