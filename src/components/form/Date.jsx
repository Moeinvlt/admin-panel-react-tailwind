import { ErrorMessage, useFormikContext } from "formik";
import jMoment from "jalali-moment";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import FormErrorMessage from "./FormErrorMessage";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { id: 1, value: "فروردین" },
  { id: 2, value: "اردیبهشت" },
  { id: 3, value: "خرداد" },
  { id: 4, value: "تیر" },
  { id: 5, value: "مرداد" },
  { id: 6, value: "شهریور" },
  { id: 7, value: "مهر" },
  { id: 8, value: "آبان" },
  { id: 9, value: "آذر" },
  { id: 10, value: "دی" },
  { id: 11, value: "بهمن" },
  { id: 12, value: "اسفند" },
];

const DatePicker = ({
  name,
  label,
  yearsLimit = { from: 100, to: 0 },
  initialDate,
  placeholder = "انتخاب تاریخ...",
  className = "",
}) => {
  const { values, setFieldValue } = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [years, setYears] = useState([]);
  const wrapperRef = useRef(null);

  // مقداردهی اولیه از initialDate یا مقدار موجود در فرمیک
  useEffect(() => {
    const currentValue = values[name];
    let m;
    if (currentValue) {
      // فرمت ذخیره شده: "DD / MM / YYYY" (مثلاً "25 / 04 / 1403")
      const parts = currentValue.split(" / ");
      if (parts.length === 3) {
        setDay(parseInt(parts[0]));
        setMonth(parseInt(parts[1]));
        setYear(parseInt(parts[2]));
        return;
      }
    }
    if (initialDate) {
      m = jMoment(initialDate);
    } else {
      m = jMoment();
    }
    setDay(m.jDate());
    setMonth(m.jMonth() + 1);
    setYear(m.jYear());
  }, [initialDate, name, values]);

  // تولید لیست سال‌ها بر اساس سال جاری و محدودیت‌ها
  const generateYears = (currentYear) => {
    const start = currentYear - (yearsLimit.from || 0);
    const end = currentYear + (yearsLimit.to || 0);
    const yrs = [];
    for (let i = start; i <= end; i++) yrs.push(i);
    setYears(yrs);
  };

  const handleOpen = () => {
    if (year) generateYears(year);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    if (day && month && year) {
      const formatted = `${day} / ${month} / ${year}`;
      setFieldValue(name, formatted);
    }
    setIsOpen(false);
  };

  // بستن پنل با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`w-full max-w-130 mt-5 ${className}`} ref={wrapperRef}>
      <div className="customBox flex w-full">
        <input
          type="text"
          value={values[name] || ""}
          placeholder={placeholder}
          readOnly
          onClick={handleOpen}
          className="w-full p-2 outline-none bg-transparent defaultText cursor-pointer"
        />
        {label && (
          <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
            {label}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50 p-3">
            <div className="flex flex-wrap gap-3 justify-center items-end">
              {/* روز */}
              <div className="flex-1 min-w-17.5">
                <label className="block text-sm defaultText mb-1">روز</label>
                <select
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent defaultText"
                  value={day || ""}
                  onChange={(e) => setDay(Number(e.target.value))}
                >
                  <option value="">--</option>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* ماه */}
              <div className="flex-1 min-w-25">
                <label className="block text-sm defaultText mb-1">ماه</label>
                <select
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent defaultText"
                  value={month || ""}
                  onChange={(e) => setMonth(Number(e.target.value))}
                >
                  <option value="">--</option>
                  {months.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.value}
                    </option>
                  ))}
                </select>
              </div>

              {/* سال */}
              <div className="flex-1 min-w-20">
                <label className="block text-sm defaultText mb-1">سال</label>
                <select
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent defaultText"
                  value={year || ""}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  <option value="">--</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* دکمه تایید */}
              <button
                type="button"
                onClick={handleConfirm}
                className="mt-4 bg-green-500/20 text-green-500 p-2 rounded-md hover:bg-green-500 hover:text-white transition"
              >
                <FaCheck />
              </button>
            </div>
          </div>
        </div>
      )}

      <ErrorMessage name={name} component={FormErrorMessage} />
    </div>
  );
};

export default DatePicker;