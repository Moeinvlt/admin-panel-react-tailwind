import { FaAngleLeft, FaAngleRight, FaTrash } from "react-icons/fa";

const DataTable = ({ data, dataInfo, additionalField }) => {
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
            {data.map((d) => (
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

      <div className="flex justify-center gap-2 mt-5">
        <button
          type="button"
          className="cursor-pointer border-2 border-gray-500 text-gray-600 w-8 h-8 flex justify-center items-center rounded-md"
        >
          <FaAngleRight />
        </button>

        <button
          type="button"
          className={`cursor-pointer border-2 border-gray-500 text-white bg-sky-500/80 w-8 h-8 flex justify-center items-center rounded-md`}
        >
          1
        </button>
        <button
          type="button"
          className={`cursor-pointer border-2 border-gray-500 text-gray-600 w-8 h-8 flex justify-center items-center rounded-md`}
        >
          2
        </button>
        <button
          type="button"
          className={`cursor-pointer border-2 border-gray-500 text-gray-600 w-8 h-8 flex justify-center items-center rounded-md`}
        >
          3
        </button>

        <button
          type="button"
          className="cursor-pointer border-2 border-gray-500 text-gray-600 w-8 h-8 flex justify-center items-center rounded-md"
        >
          <FaAngleLeft />
        </button>
      </div>
    </div>
  );
};

export default DataTable;
