import { NavLink } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-950 text-white relative overflow-hidden">
      
      <div className="absolute w-125 h-125 bg-purple-600/30 blur-[140px] rounded-full -top-37.5 -left-37.5" />
      <div className="absolute w-100 h-100 bg-cyan-500/30 blur-[120px] rounded-full -bottom-30 -right-30" />

      
      <div className="relative flex flex-col items-center">
        <h3
          className="text-[160px] font-extrabold tracking-widest
                   bg-linear-to-r from-purple-400 via-pink-500 to-cyan-400 
                   bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]"
        >
          404
        </h3>

        <p className=" text-gray-400 text-2xl tracking-wide">
          صفحه مورد نظر یافت نشد
        </p>

        <NavLink
          to="/"
          className="inline-block px-6 py-3 rounded-xl mt-5 
                       bg-linear-to-r from-purple-500 to-cyan-500 
                       hover:scale-105 transition-all duration-300 
                       shadow-lg shadow-purple-500/30"
        >
          بازگشت به داشبورد
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
