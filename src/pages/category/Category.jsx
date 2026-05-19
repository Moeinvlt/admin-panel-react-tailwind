import CategoryTable from "./components/CategoryTable";
import AddCategory from "./components/AddCategory";
import CategoryContextContainer from "../../context/CategoryContext";


const Category = () => {

  return (
    <CategoryContextContainer>
      <div className="px-8">
        <CategoryTable />
      </div>
    </CategoryContextContainer>
  );
};

export default Category;
