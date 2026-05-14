import { useLocation } from "react-router";
import PrevPageBtn from "../../../components/PrevPageBtn";

const CategoryChildren = () => {
  const location = useLocation();

  return (
    <div className="w-full flex justify-between">
      <h5 className="text-center">
        <span className="defaultText">زیرگروه: </span>
        <span className="text-indigo-600">
          {location.state.parentData.title}
        </span>
      </h5>

      <PrevPageBtn/>
    </div>
  );
};

export default CategoryChildren;
