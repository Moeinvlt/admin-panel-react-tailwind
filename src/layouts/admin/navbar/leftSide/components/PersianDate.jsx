import moment from "moment-jalaali";
import { useEffect, useState } from "react";

const ParsianDate = () => {
    const [date, setDate] = useState('');

    useEffect(() => {
        let m = moment();

        let formattedDate = m.format("DD / MM / jYYYY");
        setDate(formattedDate);
    }, []);

    return (
        <li className="h-full flex items-center pl-4 dark:text-dark-rgb">
            {date}
        </li>
    );
};

export default ParsianDate;