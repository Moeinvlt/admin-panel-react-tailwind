import { useEffect, useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaSearch, FaTrash } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import ModalToggleBtn from "./ModalToggleBtn";
import { Toasty } from "../utils/customToast";
import TableLoading from "./loading/TableLoading";
import { FaExclamationTriangle } from "react-icons/fa";

const DataTable = ({
  data,
  dataInfo,
  additionalField,
  limit = 5,
  title,
  isLoading,
  error,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    return data.filter((row) => {
      return dataInfo.some((col) => {
        const value = row[col.field];

        const stringValue = String(value ?? "").toLowerCase();
        return stringValue.includes(searchTerm.toLowerCase());
      });
    });
  }, [data, dataInfo, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, data]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * limit;
    return filteredData.slice(start, start + limit);
  }, [filteredData, currentPage, limit]);

  const totalPages = Math.ceil(filteredData.length / limit);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  return (
    <>
      <h3 className="text-center defaultText py-4">{title}</h3>

      <div className="flex w-full justify-between gap-4 xl:gap-0 pb-6">
        <div className="relative customBox w-full max-w-[320px]">
          <input
            type="text"
            placeholder="جستوجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none defaultText outline-none px-4 py-2 w-full placeholder:text-gray-500"
          />
          <button
            type="button"
            className="cursor-pointer top-1/2 -translate-y-1/2 absolute left-3 text-gray-400 dark:text-[#ffffff99]"
          >
            <FaSearch />
          </button>
        </div>

        <div>
          <ModalToggleBtn />
        </div>
      </div>

      {isLoading ? (
        <TableLoading />
      ) : error ? (
        <div
          role="alert"
          className="bg-red-500/70 text-white p-4 rounded-md text-center"
        >
         <FaExclamationTriangle className="inline-block text-amber-300"/> خطایی رخ داده است. لطفاً مجدداً تلاش کنید. 
        </div>
      ) : paginatedData.length === 0 ? (
        <div
          role="alert"
          className="bg-red-500/60 text-black p-4 rounded-md text-[20px] flex items-center justify-center gap-1.5"
        >
          {" "}
          <MdWarning className="text-red-500 text-[22px]" />
          نتیجه ای یافت نشد{" "}
        </div>
      ) : (
        <div className="w-full">
          <div className="overflow-x-auto customBox w-full">
            <table className="w-full text-sm text-nowrap min-w-175">
              <thead>
                <tr>
                  {dataInfo.map((i) => (
                    <th key={i.field} className="py-3 px-2 defaultText">
                      {i.title}
                    </th>
                  ))}

                  {Array.isArray(additionalField) &&
                    additionalField.map((a, index) => (
                      <th
                        key={`add-col-${index}`}
                        className="py-3 px-2 defaultText"
                      >
                        {a.title}
                      </th>
                    ))}
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((d) => (
                  <tr className="border-t border-border-light dark:border-border-dark hover:bg-gray-300/60 hover:dark:bg-gray-900/80">
                    {dataInfo.map((i) => (
                      <td
                        key={i.field + "_" + d.id}
                        className="py-3 px-2 defaultText text-center"
                      >
                        {d[i.field]}
                      </td>
                    ))}

                    {Array.isArray(additionalField) &&
                      additionalField.map((a, index) => (
                        <td
                          key={`add-cell-${index}-${d.id}`}
                          className="py-3 px-2 defaultText text-center"
                        >
                          {a.elements(d)}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 py-4">
              <button
                type="button"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="cursor-pointer border-2 border-gray-500 text-gray-600 disabled:border-gray-500/30 disabled:text-gray-500/30 disabled:pointer-events-none w-8 h-8 flex justify-center items-center rounded-md"
              >
                <FaAngleRight />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`cursor-pointer border-2 border-gray-500 text-gray-500 dark:text-white ${
                      currentPage === page ? "bg-sky-500/80" : ""
                    } w-8 h-8 flex justify-center items-center rounded-md`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
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

export default DataTable;
