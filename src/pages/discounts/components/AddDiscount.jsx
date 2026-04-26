import { FaCheck } from "react-icons/fa";
import Modal from "../../../components/Modal";

const AddDiscount = () => {
  return (
    <Modal fullScreen={true} title="افزودن کد تخفیف">
      <div>
        <form>
          <div className="customBox flex w-full max-w-130 mt-5">
            <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
              عنوان گارانتی
            </span>
            <input
              type="text"
              name=""
              className="w-full defaultText p-2 outline-none"
              placeholder="عنوان گارانتی"
            />
          </div>

          <div className="customBox flex w-full max-w-130 mt-5">
            <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
               توضیحات گارانتی
            </span>
            <input
              type="text"
              name=""
              className="w-full defaultText p-2 outline-none"
              placeholder="توضیحات گارانتی"
            />
          </div>

          <div className="customBox flex w-full max-w-130 mt-5">
            <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
              مدت گارانتی
            </span>
            <input
              type="text"
              name=""
              className="w-full defaultText p-2 outline-none"
              placeholder="به ماه"
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

export default AddDiscount;
