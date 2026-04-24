import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";
import Dashboard from "../../../pages/dashboard/Dashboard";
import Category from "../../../pages/category/Category";
import Product from "../../../pages/product/Product";
import Brands from "../../../pages/brands/Brands";
import { Route, Routes } from "react-router";

const Content = () => {
  const { sidebarOpen } = useContext(AdminContext);

  return (
    <main
      className={`h-screen pt-22 bg-body-light dark:bg-body-dark ${
        sidebarOpen ? "pr-60" : "pr-14"
      } transition-all duration-150`}
    >
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/brands" element={<Brands/> }/>
      </Routes>
    </main>
  );
};

export default Content;
