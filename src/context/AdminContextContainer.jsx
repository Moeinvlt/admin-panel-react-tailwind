import { createContext, useState } from "react";

export const AdminContext = createContext({
    sidebarOpen: false,
    setSidebarOpen: ()=>{},

    isHover: false,
    setIsHover: () => {},

    isSidebarOpen: false,

    modalOpen: false,
    setModalOpen: ()=>{}
})

const AdminContextContainer = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const isSidebarOpen = sidebarOpen || isHover;

    const [modalOpen, setModalOpen] = useState(false)

    return(
        <AdminContext.Provider value={{ sidebarOpen, setSidebarOpen, modalOpen, setModalOpen, isHover, setIsHover, isSidebarOpen }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextContainer;