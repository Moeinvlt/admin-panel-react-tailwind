import jMoment from "jalali-moment";
import { useEffect, useState } from "react";
import { convertToDateToJalali } from "../../../../../utils/convertDate";

const ParsianDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(convertToDateToJalali());
  }, []);

  return (
    <li className="h-full flex items-center pl-4 dark:text-dark-rgb">
      {date || "در حال بارگذاری..."}
    </li>
  );
};

export default ParsianDate;
