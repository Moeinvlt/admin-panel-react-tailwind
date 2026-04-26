import DiscountsTable from "./components/DiscountsTable";
import AddDiscount from "./components/AddDiscount";

const Discounts = () => {
  return (
    <div className="px-8">

      <DiscountsTable />

      <AddDiscount />
    </div>
  );
};

export default Discounts;
