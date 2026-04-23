import { FaTrash } from "react-icons/fa";        
import { FaAngleRight } from "react-icons/fa";            
import { FaAngleLeft} from "react-icons/fa";            
import { FiEdit2 } from "react-icons/fi"; 
import logoPic from "../../../assets/images/robocoder.webp";                
           

const BrandsTable = () => {
  return (
    <div className="w-full pb-4">
      <div className="overflow-x-auto customBox custom-scroll w-full">
        <table className="w-full text-sm text-nowrap min-w-175">
          <thead className="">
            <tr>
              <th className=" py-3 px-2 defaultText">#</th>
              <th className=" py-3 px-2 defaultText">عنوان</th>
              <th className=" py-3 px-2 defaultText">عنوان فارسی</th>
              <th className=" py-3 px-2 defaultText">توضیحات</th>
              <th className=" py-3 px-2 defaultText">لوگو</th>
              <th className=" py-3 px-2 defaultText">عملیات</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-border-light dark:border-border-dark">
              <td className=" py-3 px-2 defaultText text-center">1</td>
              <td className=" py-3 px-2 defaultText text-center"> brand 1</td>
              <td className=" py-3 px-2 defaultText text-center">برند شماره 1</td>
              <td className=" py-3 px-2 defaultText text-center">توضیحات اجمالی درباره این برند</td>
              <td className=" py-3 px-2 defaultText text-center">
                <img src={logoPic} alt="logo-image" className="w-12.5 mx-auto" />
              </td>
              <td className=" py-3 px-2 text-center">

                <button
                  type="button"
                  className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FiEdit2 />
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
              <td className=" py-3 px-2 defaultText text-center"> brand 1</td>
              <td className=" py-3 px-2 defaultText text-center">برند شماره 1</td>
              <td className=" py-3 px-2 defaultText text-center">توضیحات اجمالی درباره این برند</td>
              <td className=" py-3 px-2 defaultText text-center">
                <img src={logoPic} alt="logo-image" className="w-12.5 mx-auto" />
              </td>
              <td className=" py-3 px-2 text-center">

                <button
                  type="button"
                  className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FiEdit2 />
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
              <td className=" py-3 px-2 defaultText text-center"> brand 1</td>
              <td className=" py-3 px-2 defaultText text-center">برند شماره 1</td>
              <td className=" py-3 px-2 defaultText text-center">توضیحات اجمالی درباره این برند</td>
              <td className=" py-3 px-2 defaultText text-center">
                <img src={logoPic} alt="logo-image" className="w-12.5 mx-auto" />
              </td>
              <td className=" py-3 px-2 text-center">

                <button
                  type="button"
                  className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FiEdit2 />
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
              <td className=" py-3 px-2 defaultText text-center"> brand 1</td>
              <td className=" py-3 px-2 defaultText text-center">برند شماره 1</td>
              <td className=" py-3 px-2 defaultText text-center">توضیحات اجمالی درباره این برند</td>
              <td className=" py-3 px-2 defaultText text-center">
                <img src={logoPic} alt="logo-image" className="w-12.5 mx-auto" />
              </td>
              <td className=" py-3 px-2 text-center">

                <button
                  type="button"
                  className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FiEdit2 />
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
              <td className=" py-3 px-2 defaultText text-center"> brand 1</td>
              <td className=" py-3 px-2 defaultText text-center">برند شماره 1</td>
              <td className=" py-3 px-2 defaultText text-center">توضیحات اجمالی درباره این برند</td>
              <td className=" py-3 px-2 defaultText text-center">
                <img src={logoPic} alt="logo-image" className="w-12.5 mx-auto" />
              </td>
              <td className=" py-3 px-2 text-center">

                <button
                  type="button"
                  className="text-purple-500 cursor-pointer text-[16px] mr-2 bg-purple-500/30 hover:bg-purple-500 hover:text-white transition-all duration-150 p-2 rounded-md"
                >
                  <FiEdit2 />
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

export default BrandsTable;
