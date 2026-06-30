import { ErrorMessage, Field, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { HiX } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import FormErrorMessage from "./FormErrorMessage";

const SearchableSelect = ({
  resultType = "string", // "string" یا "array"
  options,
  name,
  label,
  firstItem = "انتخاب کنید...",
  className = "",
  initialItems,
  onChange, // ← اضافه شد (اختیاری)
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef(null);
  const formik = useFormikContext();

  // فیلتر گزینه‌ها بر اساس جستجو
  const filteredOptions = (options || []).filter((opt) =>
    opt.value.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // مقداردهی اولیه از فرمیک (برای ویرایش)
useEffect(() => {
  const fieldValue = formik.values[name];
  if (!fieldValue && fieldValue !== 0) {
    setSelectedItems([]);
    return;
  }
  let ids = [];
  if (resultType === "string") {
    // تبدیل به رشته برای پشتیبانی از اعداد و رشته‌های با خط تیره
    const strValue = String(fieldValue);
    ids = strValue.split("-").map(Number).filter(Boolean);
  } else if (Array.isArray(fieldValue)) {
    ids = fieldValue;
  }
  const initialSelected = options.filter((opt) => ids.includes(opt.id));
  setSelectedItems(initialSelected);
}, [formik.values, name, options, resultType]);

  // مقداردهی از initialItems (برای ویرایش با داده‌های خارجی)
  useEffect(() => {
    if (
      initialItems &&
      Array.isArray(initialItems) &&
      initialItems.length > 0
    ) {
      setSelectedItems(initialItems);
      // ✅ اگر onChange وجود داشت و یک آیتم اولیه وجود دارد، آن را صدا بزن
      if (onChange && initialItems.length > 0) {
        onChange(initialItems[0]?.id);
      }
    }
  }, [initialItems, onChange]);

  // بستن لیست با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // به‌روزرسانی مقدار فرمیک هر بار که selectedItems تغییر کند
  const updateFormValue = (items) => {
    const selectedIds = items.map((item) => item.id);
    const valueToStore =
      resultType === "string" ? selectedIds.join("-") : selectedIds;
    formik.setFieldValue(name, valueToStore);
  };

  const handleSelectItem = (itemId) => {
    if (selectedItems.find((i) => i.id === itemId)) return;
    const selectedOption = options.find((opt) => opt.id === itemId);
    if (selectedOption) {
      const newItems = [...selectedItems, selectedOption];
      setSelectedItems(newItems);
      updateFormValue(newItems);
      setSearchTerm("");

      // ✅ اگر onChange وجود داشت، آن را با id آیتم انتخاب شده صدا بزن
      if (onChange) {
        onChange(itemId);
      }
    }
  };

  const handleRemoveItem = (itemId) => {
    const newItems = selectedItems.filter((i) => i.id !== itemId);
    setSelectedItems(newItems);
    updateFormValue(newItems);
  };

  return (
    <div className={`w-full max-w-130 mt-5 ${className}`} ref={wrapperRef}>
      {/* باکس اصلی */}
      <div className="customBox flex w-full">
        <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
          {label}
        </span>
        <div
          className="w-full p-1 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="min-h-10 flex items-center">
            {selectedItems.length === 0 && (
              <span className="text-gray-500">{firstItem}</span>
            )}
          </div>
        </div>
      </div>

      {/* چیپ‌ها */}
      {selectedItems.length > 0 && (
        <div className="max-w-103 flex flex-wrap gap-2 mt-2">
          {selectedItems.map((item) => (
            <span
              key={item.id}
              className="bg-sky-400/30 dark:bg-sky-400/20 rounded-full text-black dark:text-white px-2 py-1 text-sm flex items-center gap-1"
            >
              {item.value}
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveItem(item.id)}
              >
                <HiX />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* لیست کشویی */}
      {isOpen && (
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20">
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent defaultText outline-none"
                  placeholder="جستجو..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="p-2 text-red-400 text-center">
                  موردی یافت نشد
                </div>
              ) : (
                filteredOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer defaultText"
                    onClick={() => {
                      handleSelectItem(opt.id);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    {opt.value}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <ErrorMessage name={name} component={FormErrorMessage} />
    </div>
  );
};

export default SearchableSelect;
