import { FaCheck } from "react-icons/fa";
import Modal from "../../../components/Modal";

const AddBrand = () => {
  return (
    <Modal fullScreen={false} title="افزودن برند">
      <div>
        <form>
          <div className="customBox flex w-full max-w-130 mt-5">
            <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
              عنوان لاتین
            </span>
            <input
              type="text"
              name=""
              className="w-full defaultText p-2 outline-none"
              placeholder="عنوان لاتین"
            />
          </div>

          <div className="customBox flex w-full max-w-130 mt-5">
            <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
              عنوان فارسی
            </span>
            <input
              type="text"
              name=""
              className="w-full defaultText p-2 outline-none"
              placeholder="عنوان فارسی"
            />
          </div>

          <div className="customBox flex w-full max-w-130 mt-5">
            <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
              توضیحات
            </span>
            <input
              type="text"
              name=""
              className="w-full defaultText p-2 outline-none"
              placeholder="توضیحات کوتاه درباره برند"
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
              placeholder="توضیح تصویر"
            />
          </div>

          <div className="py-4 text-center">
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

export default AddBrand;
