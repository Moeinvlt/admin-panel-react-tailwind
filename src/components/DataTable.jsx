import { useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaTrash } from "react-icons/fa";

const DataTable = ({ data, dataInfo, additionalField, limit=5 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * limit;
    return data.slice(start, start + limit);
  }, [data, currentPage, limit]);

  const totalPages = Math.ceil(data.length / limit);
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
    <div className="w-full">
      <div className="overflow-x-auto customBox w-full">
        <table className="w-full text-sm text-nowrap min-w-175">
          <thead className="">
            <tr>
              {dataInfo.map((i) => (
                <th key={i.field} className="py-3 px-2 defaultText">
                  {i.title}
                </th>
              ))}

              {additionalField ? (
                <th className="py-3 px-2 defaultText">
                  {additionalField.title}
                </th>
              ) : null}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((d) => (
              <tr className="border-t border-border-light dark:border-border-dark">
                {dataInfo.map((i) => (
                  <td
                    key={i.field + "_" + d.id}
                    className="py-3 px-2 defaultText text-center"
                  >
                    {d[i.field]}
                  </td>
                ))}

                {additionalField && (
                  <td className="py-3 text-center">
                    {additionalField.elements()}
                  </td>
                )}
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

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
          ))}

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
  );
};

export default DataTable;
