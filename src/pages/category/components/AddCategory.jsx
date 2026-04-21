import { FaCheck } from "react-icons/fa";
import Modal from "../../../components/Modal";

const AddCategory = () => {
  return (
    <Modal
    fullScreen={false}
    >
      <div>
        <form>
          <div className="customBox flex w-full max-w-130 mt-5">
            <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
              دسته والد
            </span>
            <select
              name=""
              className="w-full defaultText p-2 outline-none appearance-none bg-inherit"
            >
              <option value="1" className="">
                بدون والد
              </option>
              <option value="1" className="">
                دسته شماره یک
              </option>
            </select>
          </div>

          <div className="customBox flex w-full max-w-130 mt-5">
            <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
              عنوان دسته
            </span>
            <input
              type="text"
              name=""
              className="w-full defaultText p-2 outline-none"
              placeholder="عنوان دسته"
            />
          </div>

          <div className="customBox flex w-full max-w-130 mt-5">
            <span className="bg-sky-400/20 text-sky-400 w-27 p-2 flex items-center justify-center">
              توضیحات
            </span>
            <textarea
              type="text"
              name=""
              className="w-full defaultText p-2 resize-none h-30 outline-none"
              placeholder="توضیحات"
            />
          </div>

          <div className="customBox flex w-full max-w-130 mt-5">
            <span className="bg-sky-400/20 text-sky-400 w-27 p-2 flex items-center justify-center">
              تصویر
            </span>
            <input
              type="file"
              name=""
              className="w-full defaultText p-2 outline-none"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="formCheck" className="flex gap-2">
              وضعیت فعال
              <div className="flex w-5 h-5 border border-gray-500 rounded-[3px] cursor-pointer">
                <input
                  type="checkbox"
                  name=""
                  id="formCheck"
                  className="sr-only w-full h-full peer"
                />
                <FaCheck className="text-green-500 hidden peer-checked:inline" />
              </div>
            </label>
          </div>

          <div className="py-2.5 text-center">
            <button
              type="submit"
              className="bg-sky-400 text-white py-2 px-4 rounded-md cursor-pointer"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCategory;
