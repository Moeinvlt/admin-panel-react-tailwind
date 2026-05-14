import { createPortal } from "react-dom";

const LoadingScreen = () => {
  return createPortal(
    <div className="loading_bg">
      <span className="text-white text-3xl md:text-5xl">لطفا صبر کنید</span>
      <div className="main_loader flex gap-3">
        <div className="circle_loader bg-white"></div>
        <div className="circle_loader bg-white"></div>
        <div className="circle_loader bg-white"></div>
      </div>
    </div>,
    document.getElementById("modals")
  );
};

export default LoadingScreen;
