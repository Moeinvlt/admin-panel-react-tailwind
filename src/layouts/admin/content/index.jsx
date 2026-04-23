import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";
import Dashboard from "../../../pages/dashboard/Dashboard";
import Category from "../../../pages/category/Category";
import Product from "../../../pages/product/Product";
import Brands from "../../../pages/brands/Brands";

const Content = () => {
  const { sidebarOpen } = useContext(AdminContext);

  return (
    <main
      className={`h-screen pt-22 bg-body-light dark:bg-body-dark ${
        sidebarOpen ? "pr-60" : "pr-14"
      } transition-all duration-150`}
    >
      {/* <Dashboard /> */}
      <Category/>
      {/* <Product/> */}
      {/* <Brands/> */}
    </main>
  );
};

export default Content;
