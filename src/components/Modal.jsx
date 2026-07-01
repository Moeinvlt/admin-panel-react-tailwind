import { useContext } from "react";
import { createPortal } from "react-dom";
import { AdminContext } from "../context/AdminContextContainer";
import { HiX } from "react-icons/hi";
import { CategoryContext } from "../context/CategoryContext";

const Modal = ({ children, fullScreen=true, title, customCloseFnc, containerWidth }) => {
  const { modalOpen, setModalOpen } = useContext(AdminContext);
  const { setEditId } = useContext(CategoryContext);

  const handleOnClose = () => {
    setModalOpen(false) 
     setEditId(null)
  }

  return createPortal(
    <div
      className={`w-full h-screen fixed top-0 z-100 transition-all duration-150 animate__animated animate__faster
      ${modalOpen
          ? "opacity-100 visible animate__fadeInDown"
          : "opacity-0 invisible "
        }

        ${!modalOpen ? "animate__fadeOutUp" : ""}

        ${!fullScreen
          ? "bg-gray-900/70 flex justify-center items-center"
          : ""
        }
        `}
    >
      <div className={`${fullScreen ? "w-full h-full" : "w-auto h-auto mx-3"}  customBox flex flex-col`}>
        <div className="w-full flex justify-between p-4 border-b border-border-light dark:border-border-dark">
          <h4 className="defaultText text-[18px]">{title}</h4>

          <button
            type="button"
            className="text-red-500 hover:text-red-600 cursor-pointer text-2xl"
            onClick={customCloseFnc ? customCloseFnc : handleOnClose}
          >
            <HiX />
          </button>
        </div>

        <div className="h-full px-6 overflow-y-auto custom-scroll">
          <div className={`mx-auto ${containerWidth ? containerWidth : "max-w-[429.13px]"}`}>
            {children}
          </div>
        </div>

        <div className="border-t border-border-light dark:border-border-dark w-full flex justify-end p-2">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white cursor-pointer px-4 py-1.5 rounded-md"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modals")
  );
};

export default Modal;
