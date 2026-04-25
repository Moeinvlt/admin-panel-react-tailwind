import { useContext } from "react";
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
  // const { sidebarOpen } = useContext(AdminContext);
  const { setIsHover } = useContext(AdminContext);

  const { isSidebarOpen } = useContext(AdminContext);
  // const [isHover, setIsHover] = useState(false);

  // const isSidebarOpen = sidebarOpen || isHover;

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <aside
      className={`${isSidebarOpen ? "w-60" : "w-14"} transition-all duration-200 fixed z-50 right-0 top-0 pb-18 h-full border-l border-border-light dark:border-border-dark bg-white dark:bg-gray-800 overflow-hidden`}
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
        <ul className="h-full overflow-y-auto custom-scroll">
          <SidebarItem title="داشبورد" path="/" icon={<FaTachometerAlt />} />

          {/* tlte */}
          <SidebarGroupTitle title="فروشگاه" />
          {/* tlte */}

          <SidebarItem title="مدیریت گروه محصول" path="/category" icon={<FaStream />} />

          <SidebarItem title="مدیریت محصول" path="/product" icon={<FaCube />} />

          <SidebarItem title="مدیریت برند ها" path="/brands" icon={<FaCopyright />} />

          <SidebarItem title="مدیریت گارانتی ها" path="/" icon={<FaPagelines />} />

          <SidebarItem title="مدیریت رنگ ها" path="/" icon={<FaPalette />} />

          <SidebarItem title="مدیریت تخفیف ها" path="/" icon={<FaPercentage />} />

          {/* tlte */}
          <SidebarGroupTitle title="سفارشات و سبد" />
          {/* tlte */}

          <SidebarItem title="مدیریت سبد ها" path="/" icon={<FaShoppingBasket />} />

          <SidebarItem title="مدیریت سفارشات" path="/" icon={<FaLuggageCart />} />

          <SidebarItem title="مدیریت نحوه ارسال" path="/" icon={<FaTruckLoading />} />

          {/* tlte */}
          <SidebarGroupTitle title="کاربران و همکاران" />
          {/* tlte */}

          <SidebarItem title="مشاهده کاربران" path="/" icon={<FaUsers />} />

          <SidebarItem title="نقش ها" path="/" icon={<FaUserTag />} />

          <SidebarItem title="مجوز ها" path="/" icon={<FaShieldAlt />} />

          {/* tlte */}
          <SidebarGroupTitle title="ارتباتاط" />
          {/* tlte */}

          <SidebarItem title="سوال ها" path="/" icon={<FaQuestionCircle />} />

          <SidebarItem title="نظرات" path="/" icon={<FaComment />} />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
