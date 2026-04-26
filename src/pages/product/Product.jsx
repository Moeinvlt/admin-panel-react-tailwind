import { FaSearch } from "react-icons/fa";
import ModalToggleBtn from "../../components/ModalToggleBtn";
import ProductTable from "./components/ProductTable";
import AddProduct from "./components/AddProduct";

const Product = () => {
  return (
    <div className="px-8">

      <ProductTable />

      <AddProduct />
    </div>
  );
};

export default Product;
