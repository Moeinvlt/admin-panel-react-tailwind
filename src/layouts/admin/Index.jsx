import LoadingScreen from "../../components/loading/LoadingScreen";
import { useIsLogin } from "../../hooks/authHook";
import Content from "./content";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Navigate } from "react-router";

const AdminLayout = () => {
  const [loading, isLogin] = useIsLogin();

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : isLogin ? (
        <div className="h-screen">
          <Navbar />
          <Sidebar />
          <Content />
        </div>
      ) : (
        <Navigate to={"/auth/login"} />
      )}
    </>
  );
};

export default AdminLayout;
