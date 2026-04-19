import { createContext, useState } from "react";

export const AdminContext = createContext({
    sidebarOpen: false,
    setSidebarOpen: ()=>{}
})

const AdminContextContainer = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return(
        <AdminContext.Provider value={{sidebarOpen, setSidebarOpen}}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextContainer;