import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";         
import { FiEdit2 } from "react-icons/fi"; 
import { FaSitemap } from "react-icons/fa";                   
           

const ProductTable = () => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto customBox w-full">
        <table className="w-full text-sm text-nowrap min-w-175">
          <thead className="">
            <tr>
              <th className=" py-3 px-2 defaultText">#</th>
              <th className=" py-3 px-2 defaultText">دسته</th>
              <th className=" py-3 px-2 defaultText">عنوان</th>
              <th className=" py-3 px-2 defaultText">قیمت</th>
              <th className=" py-3 px-2 defaultText">موجودی</th>
              <th className=" py-3 px-2 defaultText">تعداد لایک</th>
              <th className=" py-3 px-2 defaultText">وضعیت</th>
              <th className=" py-3 px-2 defaultText">عملیات</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-border-light dark:border-border-dark">
              <td className=" py-3 px-2 defaultText text-center">1</td>
              <td className=" py-3 px-2 defaultText text-center">دسته شماره فلان</td>
              <td className=" py-3 px-2 defaultText text-center">محصول شماره فلان</td>
              <td className=" py-3 px-2 defaultText text-center">20,000 تومان</td>
              <td className=" py-3 px-2 defaultText text-center">10</td>
              <td className=" py-3 px-2 defaultText text-center"><span className="pr-4">10</span> 30</td>
              <td className=" py-3 px-2 defaultText text-center">فعال</td>
              <td className=" py-3 px-2 text-center">

                <button
                  type="button"
                  className="text-sky-500 cursor-pointer text-[16px] mr-2 bg-sky-500/30 hover:bg-sky-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaSitemap />
                </button>
                <button
                  type="button"
                  className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FiEdit2 />
                </button>
                <button
                  type="button"
                  className="text-green-500 cursor-pointer text-[16px] mr-2 bg-green-500/30 hover:bg-green-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaPlus />
                </button>
                <button
                  type="button"
                  className="text-red-400 cursor-pointer text-[16px] mr-2 bg-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
            <tr className="border-t border-border-light dark:border-border-dark">
              <td className=" py-3 px-2 defaultText text-center">1</td>
              <td className=" py-3 px-2 defaultText text-center">دسته شماره فلان</td>
              <td className=" py-3 px-2 defaultText text-center">محصول شماره فلان</td>
              <td className=" py-3 px-2 defaultText text-center">20,000 تومان</td>
              <td className=" py-3 px-2 defaultText text-center">10</td>
              <td className=" py-3 px-2 defaultText text-center"><span className="pr-4">10</span> 30</td>
              <td className=" py-3 px-2 defaultText text-center">فعال</td>
              <td className=" py-3 px-2 text-center">

                <button
                  type="button"
                  className="text-sky-500 cursor-pointer text-[16px] mr-2 bg-sky-500/30 hover:bg-sky-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaSitemap />
                </button>
                <button
                  type="button"
                  className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FiEdit2 />
                </button>
                <button
                  type="button"
                  className="text-green-500 cursor-pointer text-[16px] mr-2 bg-green-500/30 hover:bg-green-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaPlus />
                </button>
                <button
                  type="button"
                  className="text-red-400 cursor-pointer text-[16px] mr-2 bg-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
            <tr className="border-t border-border-light dark:border-border-dark">
              <td className=" py-3 px-2 defaultText text-center">1</td>
              <td className=" py-3 px-2 defaultText text-center">دسته شماره فلان</td>
              <td className=" py-3 px-2 defaultText text-center">محصول شماره فلان</td>
              <td className=" py-3 px-2 defaultText text-center">20,000 تومان</td>
              <td className=" py-3 px-2 defaultText text-center">10</td>
              <td className=" py-3 px-2 defaultText text-center"><span className="pr-4">10</span> 30</td>
              <td className=" py-3 px-2 defaultText text-center">فعال</td>
              <td className=" py-3 px-2 text-center">

                <button
                  type="button"
                  className="text-sky-500 cursor-pointer text-[16px] mr-2 bg-sky-500/30 hover:bg-sky-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaSitemap />
                </button>
                <button
                  type="button"
                  className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FiEdit2 />
                </button>
                <button
                  type="button"
                  className="text-green-500 cursor-pointer text-[16px] mr-2 bg-green-500/30 hover:bg-green-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaPlus />
                </button>
                <button
                  type="button"
                  className="text-red-400 cursor-pointer text-[16px] mr-2 bg-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
            <tr className="border-t border-border-light dark:border-border-dark">
              <td className=" py-3 px-2 defaultText text-center">1</td>
              <td className=" py-3 px-2 defaultText text-center">دسته شماره فلان</td>
              <td className=" py-3 px-2 defaultText text-center">محصول شماره فلان</td>
              <td className=" py-3 px-2 defaultText text-center">20,000 تومان</td>
              <td className=" py-3 px-2 defaultText text-center">10</td>
              <td className=" py-3 px-2 defaultText text-center"><span className="pr-4">10</span> 30</td>
              <td className=" py-3 px-2 defaultText text-center">فعال</td>
              <td className=" py-3 px-2 text-center">

                <button
                  type="button"
                  className="text-sky-500 cursor-pointer text-[16px] mr-2 bg-sky-500/30 hover:bg-sky-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaSitemap />
                </button>
                <button
                  type="button"
                  className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FiEdit2 />
                </button>
                <button
                  type="button"
                  className="text-green-500 cursor-pointer text-[16px] mr-2 bg-green-500/30 hover:bg-green-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaPlus />
                </button>
                <button
                  type="button"
                  className="text-red-400 cursor-pointer text-[16px] mr-2 bg-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
            <tr className="border-t border-border-light dark:border-border-dark">
              <td className=" py-3 px-2 defaultText text-center">1</td>
              <td className=" py-3 px-2 defaultText text-center">دسته شماره فلان</td>
              <td className=" py-3 px-2 defaultText text-center">محصول شماره فلان</td>
              <td className=" py-3 px-2 defaultText text-center">20,000 تومان</td>
              <td className=" py-3 px-2 defaultText text-center">10</td>
              <td className=" py-3 px-2 defaultText text-center"><span className="pr-4">10</span> 30</td>
              <td className=" py-3 px-2 defaultText text-center">فعال</td>
              <td className=" py-3 px-2 text-center">

                <button
                  type="button"
                  className="text-sky-500 cursor-pointer text-[16px] mr-2 bg-sky-500/30 hover:bg-sky-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaSitemap />
                </button>
                <button
                  type="button"
                  className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FiEdit2 />
                </button>
                <button
                  type="button"
                  className="text-green-500 cursor-pointer text-[16px] mr-2 bg-green-500/30 hover:bg-green-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaPlus />
                </button>
                <button
                  type="button"
                  className="text-red-400 cursor-pointer text-[16px] mr-2 bg-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
