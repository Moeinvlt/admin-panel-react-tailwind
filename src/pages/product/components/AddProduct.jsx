import { FaCheck } from "react-icons/fa";
import Modal from "../../../components/Modal";
import { HiX } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";

const AddProduct = () => {
  return (
    <Modal fullScreen={true} title="افزودن محصول">
      <form>
        <div className="flex flex-col gap-3">
          <div className="customBox flex w-full max-w-130 mt-5">
            <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
              دسته
            </span>
            <select
              name=""
              className="w-full defaultText p-2 outline-none appearance-none bg-inherit"
            >
              <option value="1" className="">
                انتخاب دسته محصول
              </option>
              <option value="1" className="">
                دسته شماره یک
              </option>
            </select>
          </div>
          <div className="flex gap-2">
            <span className="bg-sky-400/20 rounded-full text-white p-2 flex items-center gap-1">
              <button type="button" className="text-red-500 cursor-pointer">
                <HiX />
              </button>{" "}
              دسته فلان
            </span>
            <span className="bg-sky-400/20 rounded-full text-white p-2 flex items-center gap-1">
              <button type="button" className="text-red-500 cursor-pointer">
                <HiX />
              </button>{" "}
              دسته فلان
            </span>
          </div>
        </div>

        <div className="customBox flex w-full max-w-130 mt-5">
          <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
            عنوان
          </span>
          <input
            type="text"
            name=""
            className="w-full defaultText p-2 outline-none"
            placeholder="عنوان محصول"
          />
        </div>

        <div className="customBox flex w-full max-w-130 mt-5">
          <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
            قیمت
          </span>
          <input
            type="text"
            name=""
            className="w-full defaultText p-2 outline-none"
            placeholder="قیمت محصول"
          />
        </div>

        <div className="customBox flex w-full max-w-130 mt-5">
          <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
            وزن
          </span>
          <input
            type="text"
            name=""
            className="w-full defaultText p-2 outline-none"
            placeholder="وزن محصول"
          />
        </div>

        <div className="customBox flex w-full max-w-130 mt-5">
          <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
            برند
          </span>
          <input
            type="text"
            name=""
            className="w-full defaultText p-2 outline-none"
            placeholder="قسمتی از نام برند را وارد کنید"
          />
          <button
            type="button"
            className="text-green-500 bg-green-500/20 px-2 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="customBox flex w-full max-w-130 mt-5">
            <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
              رنگ
            </span>
            <select
              name=""
              className="w-full defaultText p-2 outline-none appearance-none bg-inherit"
            >
              <option value="1" className="">
                انتخاب رنگ
              </option>
              <option value="1" className="">
                رنگ شماره یک
              </option>
            </select>
          </div>
          <button
            type="button"
            className="text-red-500 bg-red-500/20 w-8 py-2 flex justify-center rounded-full cursor-pointer"
          >
            <HiX />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="customBox flex w-full max-w-130 mt-5">
            <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
              گارانتی
            </span>
            <select
              name=""
              className="w-full defaultText p-2 outline-none appearance-none bg-inherit"
            >
              <option value="1" className="">
                انتخاب گارانتی
              </option>
              <option value="1" className="">
                گارانتی شماره یک
              </option>
            </select>
          </div>
          <div className="flex gap-2">
            <span className="bg-sky-400/20 rounded-full text-white p-2 flex items-center gap-1">
              <button type="button" className="text-red-500 cursor-pointer">
                <HiX />
              </button>{" "}
              دسته فلان
            </span>
            <span className="bg-sky-400/20 rounded-full text-white p-2 flex items-center gap-1">
              <button type="button" className="text-red-500 cursor-pointer">
                <HiX />
              </button>{" "}
              دسته فلان
            </span>
          </div>
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

        <div className="customBox flex w-full max-w-130 mt-5">
          <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
            توضیح تصویر
          </span>
          <input
            type="text"
            name=""
            className="w-full defaultText p-2 outline-none"
            placeholder="توضیحات تصویر"
          />
        </div>

        <div className="customBox flex w-full max-w-130 mt-5">
          <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
            تگ ها
          </span>
          <input
            type="text"
            name=""
            className="w-full defaultText p-2 outline-none"
            placeholder="با - از هم جدا شوند"
          />
        </div>

        <div className="customBox flex w-full max-w-130 mt-5">
          <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
            موجودی
          </span>
          <input
            type="number"
            name=""
            className="w-full defaultText p-2 outline-none"
            placeholder="فقط عدد"
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
    </Modal>
  );
};

export default AddProduct;
