import { useEffect, useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaSearch, FaTrash } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import ModalToggleBtn from "./ModalToggleBtn";
import { Toasty } from "../utils/customToast";
import TableLoading from "./loading/TableLoading";
import { FaExclamationTriangle } from "react-icons/fa";
import PrevPageBtn from "./PrevPageBtn";
import AddPageBtn from "./AddPageBtn";

const PaginatedDataTable = ({
  tableData = [], // مقدار پیش‌فرض آرایه خالی
  dataInfo = [], // مقدار پیش‌فرض برای dataInfo (اختیاری)
  pageCount = 1, // مقدار پیش‌فرض
  title,
  isLoading = true,
  error = null,
  modalBtn = true,
  prevPageBtn = false,
  currentPage,
  setCurrentPage,
  searchParams = {}, // مقدار پیش‌فرض برای searchParams
  handleSearch = () => {}, // تابع پیش‌فرض خالی
  addPageBtn = false,
}) => {
  const pageRange = 3;
  const [pages, setPages] = useState([]);
  let timeout;

  const handleSetSearchChar = (char) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handleSearch(char);
    }, 1000);
  };

  useEffect(() => {
    let pArr = [];
    if (pageCount && pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) pArr.push(i);
    }
    setPages(pArr);
  }, [pageCount]);

  // اگر tableData آرایه نبود یا undefined بود، یک آرایه خالی در نظر بگیر (ایمنی بیشتر)
  const safeTableData = Array.isArray(tableData) ? tableData : [];

  return (
    <>
      <h3 className="text-center defaultText py-4">{title}</h3>

      <div className="flex w-full justify-between gap-4 xl:gap-0 pb-6">
        <div className="relative customBox w-full max-w-[320px]">
          <input
            type="text"
            placeholder={searchParams.placeholder || "جستجو..."}
            onChange={(e) => handleSetSearchChar(e.target.value)}
            className="border-none defaultText outline-none px-4 py-2 w-full placeholder:text-gray-500"
          />
          <button
            type="button"
            className="cursor-pointer top-1/2 -translate-y-1/2 absolute left-3 text-gray-400 dark:text-[#ffffff99]"
          >
            <FaSearch />
          </button>
        </div>

        {modalBtn && (
          <div>
            <ModalToggleBtn />
          </div>
        )}

        {addPageBtn && <div>{addPageBtn}</div>}
        

        {prevPageBtn ? (
          <div>
            <PrevPageBtn />
          </div>
        ) : null}
      </div>

      {isLoading ? (
        <TableLoading />
      ) : error ? (
        <div
          role="alert"
          className="bg-red-500/70 text-white p-4 rounded-md text-center"
        >
          <FaExclamationTriangle className="inline-block text-amber-300" />{" "}
          خطایی رخ داده است. لطفاً مجدداً تلاش کنید.
        </div>
      ) : safeTableData.length === 0 ? (
        <div
          role="alert"
          className="bg-red-500/70 text-black dark:text-white p-4 rounded-md text-[20px] flex items-center justify-center gap-1.5"
        >
          <MdWarning className="text-red-500 text-[22px]" />
          نتیجه‌ای یافت نشد
        </div>
      ) : (
        <div className="w-full">
          <div className="overflow-x-auto customBox w-full">
            <table className="w-full text-sm text-nowrap min-w-175">
              <thead>
                <tr>
                  {dataInfo.map((i, index) => (
                    <th
                      key={`header-${index}`}
                      className="py-3 px-2 defaultText"
                    >
                      {i.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {safeTableData.map((d) => (
                  <tr
                    className="border-t border-border-light dark:border-border-dark hover:bg-gray-300/60 hover:dark:bg-gray-900/80"
                    key={d.id}
                  >
                    {dataInfo.map((i, colIndex) =>
                      i.field ? (
                        <td
                          className="py-3 px-2 defaultText text-center"
                          key={`${i.field}-${d.id}`}
                        >
                          {d[i.field]}
                        </td>
                      ) : (
                        <td
                          className="py-3 px-2 defaultText text-center"
                          key={`custom-${d.id}-${colIndex}`}
                        >
                          {i.elements(d)}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pages.length > 1 && (
            <div className="flex justify-center gap-2 py-4">
              <button
                type="button"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="cursor-pointer border-2 border-gray-500 text-gray-600 disabled:border-gray-500/30 disabled:text-gray-500/30 disabled:pointer-events-none w-8 h-8 flex justify-center items-center rounded-md"
              >
                <FaAngleRight />
              </button>

              {pages.map((page) => {
                return page < currentPage + pageRange &&
                  page > currentPage - pageRange ? (
                  <button
                    type="button"
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`cursor-pointer border-2 border-gray-500 text-gray-500 dark:text-white ${
                      currentPage === page ? "bg-sky-500/80" : ""
                    } w-8 h-8 flex justify-center items-center rounded-md`}
                  >
                    {page}
                  </button>
                ) : null;
              })}

              <button
                type="button"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pageCount}
                className="cursor-pointer border-2 border-gray-500 text-gray-600 disabled:border-gray-500/30 disabled:text-gray-500/30 disabled:pointer-events-none w-8 h-8 flex justify-center items-center rounded-md"
              >
                <FaAngleLeft />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PaginatedDataTable;
