import LoadingScreen from "../../components/loading/LoadingScreen";
import NotFoundPage from "../../components/NotFoundPage";
import { useIsLogin } from "../../hooks/authHook";
import Content from "./content";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Navigate, useLocation } from "react-router";

const AdminLayout = () => {
  const [loading, isLogin] = useIsLogin();

  const { pathname } = useLocation();
  const isNotFound = pathname === "/404";

  if(isNotFound) {
    return <NotFoundPage/>
  }

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
