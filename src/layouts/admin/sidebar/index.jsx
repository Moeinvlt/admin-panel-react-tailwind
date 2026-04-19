import { useContext, useState } from "react";
import logoImg from "../../../assets/images/reactIcon.png";
import SidebarGroupTitle from "./components/SidebarGroupTitle";
import SidebarItem from "./components/SidebarItem";
import { FaStream } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaCube } from "react-icons/fa";
import { FaCopyright } from "react-icons/fa";
import { FaPagelines } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";
import { FaPercentage } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import { FaLuggageCart } from "react-icons/fa";
import { FaTruckLoading } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { AdminContext } from "../../../context/AdminContextContainer";

const Sidebar = () => {
  const { sidebarOpen } = useContext(AdminContext);
  const [isHover, setIsHover] = useState(false);

  const isSidebarOpen = sidebarOpen || isHover;

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <aside
      className={`${isSidebarOpen ? "w-60" : "w-14"} 
      transition-all duration-200 fixed right-0 top-0 pb-18 h-full border-l border-border-light dark:border-border-dark bg-white dark:bg-gray-800 overflow-hidden`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-17 border border-border-light dark:border-border-dark flex items-center justify-center">
        <a href="#" className="inline-block w-10 h-10">
          <img
            src={logoImg}
            alt="profile-image"
            className="w-full rounded-full"
          />
        </a>
      </div>

      <div className="h-full">
        <ul className="h-full overflow-y-auto sidebar-scroll">
          <SidebarItem title="داشبورد" icon={<FaTachometerAlt />} />

          {/* tlte */}
          <SidebarGroupTitle title="فروشگاه" isSidebarOpen={isSidebarOpen}/>
          {/* tlte */}

          <SidebarItem title="مدیریت گروه محصول" icon={<FaStream />} isSidebarOpen={isSidebarOpen}/>

          <SidebarItem title="مدیریت محصول" icon={<FaCube />} isSidebarOpen={isSidebarOpen}/>

          <SidebarItem title="مدیریت برند ها" icon={<FaCopyright />} isSidebarOpen={isSidebarOpen}/>

          <SidebarItem title="مدیریت گارانتی ها" icon={<FaPagelines />} isSidebarOpen={isSidebarOpen}/>

          <SidebarItem title="مدیریت رنگ ها" icon={<FaPalette />} isSidebarOpen={isSidebarOpen}/>

          <SidebarItem title="مدیریت تخفیف ها" icon={<FaPercentage />} isSidebarOpen={isSidebarOpen}/>

          {/* tlte */}
          <SidebarGroupTitle title="سفارشات و سبد" isSidebarOpen={isSidebarOpen}/>
          {/* tlte */}

          <SidebarItem title="مدیریت سبد ها" icon={<FaShoppingBasket />} isSidebarOpen={isSidebarOpen}/>

          <SidebarItem title="مدیریت سفارشات" icon={<FaLuggageCart />} isSidebarOpen={isSidebarOpen}/>

          <SidebarItem title="مدیریت نحوه ارسال" icon={<FaTruckLoading isSidebarOpen={isSidebarOpen}/>} />

          {/* tlte */}
          <SidebarGroupTitle title="کاربران و همکاران" isSidebarOpen={isSidebarOpen}/>
          {/* tlte */}

          <SidebarItem title="مشاهده کاربران" icon={<FaUsers />} isSidebarOpen={isSidebarOpen}/>

          <SidebarItem title="نقش ها" icon={<FaUserTag />} isSidebarOpen={isSidebarOpen}/>

          <SidebarItem title="مجوز ها" icon={<FaShieldAlt />} isSidebarOpen={isSidebarOpen}/>

          {/* tlte */}
          <SidebarGroupTitle title="ارتباتاط" isSidebarOpen={isSidebarOpen}/>
          {/* tlte */}

          <SidebarItem title="سوال ها" icon={<FaQuestionCircle />} isSidebarOpen={isSidebarOpen}/>

          <SidebarItem title="نظرات" icon={<FaComment />} isSidebarOpen={isSidebarOpen}/>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
