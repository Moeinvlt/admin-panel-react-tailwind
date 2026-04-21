import Content from "./content";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const AdminLayout = () => {
    return (
        <div className="h-screen">
            <Navbar/>
            <Sidebar/>
            <Content/>
        </div>
    )
}

export default AdminLayout;