import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";
import Dashboard from "../../../pages/dashboard/Dashboard";
import Category from "../../../pages/category/Category";
import Product from "../../../pages/product/Product";
import Brands from "../../../pages/brands/Brands";
import { Navigate, Route, Routes } from "react-router";
import Guarantees from "../../../pages/guarantees/Guarantees";
import Colors from "../../../pages/colors/Colors";
import Discounts from "../../../pages/discounts/Discounts";
import Logout from "../../../pages/auth/Logout";
import NotFoundPage from "../../../components/NotFoundPage";
import CategoryChildren from "../../../pages/category/components/CategoryChildren";
import AddAttributes from "../../../pages/category/components/attrs/AddAttributes";

const Content = () => {
  const { sidebarOpen } = useContext(AdminContext);

  return (
    <main
      className={`h-screen pt-22 bg-body-light dark:bg-body-dark ${
        sidebarOpen ? "pr-60" : "pr-14"
      } transition-all duration-150`}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Category />}>
          <Route path=":categoryId" element={<CategoryChildren/>}/>
        </Route>
        <Route path="/categories/:categoryId/attributes" element={<AddAttributes />} />
        <Route path="/product" element={<Product />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/guarantees" element={<Guarantees />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/discounts" element={<Discounts />} />

        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
};

export default Content;
