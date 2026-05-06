import { Navigate, Route, Routes } from "react-router";
import Login from "../../pages/auth/Login";
import { useIsLogin } from "../../hooks/authHook";
import LoadingScreen from "../../components/loading/LoadingScreen";

const AuthLayout = () => {
  const [loading, isLogin] = useIsLogin();

  return (
    <>
      {loading ? (
        <LoadingScreen/>
      ) : !isLogin ? (

      <Routes>
        <Route path="/auth/login" element={<Login />} />
      </Routes>
      ) : (
        <Navigate to={"/"} />
      )}

    </>
  );
};

export default AuthLayout;
