import BrandsTable from "./components/BrandsTable";
import AddBrand from "./components/AddBrand";

const Brands = () => {
  return (
    <div className="px-8">
      <BrandsTable />

      <AddBrand />
    </div>
  );
};

export default Brands;
