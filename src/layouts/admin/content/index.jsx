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
import AddProduct from "../../../pages/product/components/AddProduct";
import SetProductAttr from "../../../pages/product/components/setAttr/SetProductAtrr";
import ProductGallery from "../../../pages/product/components/gallery/ProductGallery";
import AddDiscount from "../../../pages/discounts/components/AddDiscount";
import Carts from "../../../pages/carts/Carts";
import Permissions from "../../../pages/permissions/Permissions";
import Roles from "../../../pages/roles/Roles";
import AddRole from "../../../pages/roles/components/AddRole";
import Users from "../../../pages/users/Users";
import AddUser from "../../../pages/users/components/AddUser";
import { useHasPermission } from "../../../hooks/permissionsHook";
import PermComponent from "../../../components/PermComponent";

const Content = () => {
  const { sidebarOpen } = useContext(AdminContext);

  const hasCategoryPermission = useHasPermission("read_categories");
  const hasDiscountsPermission = useHasPermission("read_discounts")
  const hasUserPermission = useHasPermission("read_users")
  const hasRolesPermission = useHasPermission("read_roles")

  return (
    <main
      className={`h-screen pt-22 bg-body-light dark:bg-body-dark ${
        sidebarOpen ? "pr-60" : "pr-14"
      } transition-all duration-150`}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {hasCategoryPermission && (
          <Route path="/categories" element={<Category />}>
            <Route path=":categoryId" element={<CategoryChildren />} />
          </Route>
        )}
        <Route
          path="/categories/:categoryId/attributes"
          element={<PermComponent component={<AddAttributes/>} pTitle="read_category_attrs"/>}
        />
        <Route path="/product" element={<PermComponent component={<Product/>} pTitle="read_products"/>}/>
        <Route path="/products/add-product" element={<PermComponent component={<AddProduct/>} pTitle="create_product"/>}/>
        <Route path="/products/set-attr" element={<PermComponent component={<SetProductAttr/>} pTitle="create_product_attr"/>}/>
        <Route path="/products/gallery" element={<PermComponent component={<ProductGallery/>} pTitle="create_product_image"/>}/>
        <Route path="/brands" element={<PermComponent component={<Brands/>} pTitle="read_brands"/>}/>
        <Route path="/guarantees" element={<PermComponent component={<Guarantees/>} pTitle="read_guarantees"/>}/>
        <Route path="/colors" element={<PermComponent component={<Colors/>} pTitle="read_colors"/>}/>

        {hasDiscountsPermission && (
          <Route path="/discounts" element={<Discounts />}>
            <Route path="add-discount-code" element={<AddDiscount />} />
          </Route>
        )}

        {hasUserPermission && (
          <Route path="/users" element={<Users />}>
            <Route path="add-user" element={<AddUser />} />
          </Route>
        )}

        {hasRolesPermission && (
          <Route path="/roles" element={<Roles />}>
            <Route path="add-role" element={<AddRole />} />
          </Route>
        )}

        <Route path="/permissions" element={<PermComponent component={<Permissions/>} pTitle="read_permissions" />} />

        <Route path="/carts" element={<Carts />} />

        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
};

export default Content;
