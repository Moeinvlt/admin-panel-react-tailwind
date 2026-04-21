import { createContext, useState } from "react";

export const AdminContext = createContext({
    sidebarOpen: false,
    setSidebarOpen: ()=>{},

    modalOpen: false,
    setModalOpen: ()=>{}
})

const AdminContextContainer = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [modalOpen, setModalOpen] = useState(false)

    return(
        <AdminContext.Provider value={{ sidebarOpen, setSidebarOpen, modalOpen, setModalOpen }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextContainer;