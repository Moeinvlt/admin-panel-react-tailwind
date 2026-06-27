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
  const { setIsHover } = useContext(AdminContext);
  const { isSidebarOpen } = useContext(AdminContext);

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
          <SidebarItem title="داشبورد" path="/" icon={<FaTachometerAlt />} pTitle="read_" />

          {/* tlte */}
          <SidebarGroupTitle title="فروشگاه" pTitles={["read_categories",  "read_products",  "read_brands",  "read_guaranties",  "read_colors", "read_discounts"]} />
          {/* tlte */}

          <SidebarItem title="مدیریت گروه محصول" path="/categories" icon={<FaStream />} pTitle="read_categories" />

          <SidebarItem title="مدیریت محصول" path="/product" icon={<FaCube />} pTitle="read_products"/>

          <SidebarItem title="مدیریت برند ها" path="/brands" icon={<FaCopyright />} pTitle="read_brands" />

          <SidebarItem title="مدیریت گارانتی ها" path="/guarantees" icon={<FaPagelines />} pTitle="read_guarantees" />

          <SidebarItem title="مدیریت رنگ ها" path="/colors" icon={<FaPalette />} pTitle="read_colors" />

          <SidebarItem title="مدیریت تخفیف ها" path="/discounts" icon={<FaPercentage />} pTitle="read_discounts" />

          {/* tlte */}
          <SidebarGroupTitle title="سفارشات و سبد" pTitles={["read_carts",  "read_orders",  "read_deliveries"]} />
          {/* tlte */}

          <SidebarItem title="مدیریت سبد ها" path="/carts" icon={<FaShoppingBasket />} pTitle="read_carts" />

          <SidebarItem title="مدیریت سفارشات" path="/" icon={<FaLuggageCart />} pTitle="read_orders" />

          <SidebarItem title="مدیریت نحوه ارسال" path="/deliveries" icon={<FaTruckLoading />} pTitle="read_deliveries" />

          {/* tlte */}
          <SidebarGroupTitle title="کاربران و همکاران" pTitles={["read_users",  "read_roles",  "read_permissions"]} />
          {/* tlte */}

          <SidebarItem title="مشاهده کاربران" path="/users" icon={<FaUsers />} pTitle="read_users" />

          <SidebarItem title="نقش ها" path="/roles" icon={<FaUserTag />} pTitle="read_roles" />

          <SidebarItem title="مجوز ها" path="/permissions" icon={<FaShieldAlt />} pTitle="read_permissions" />

          {/* tlte */}
          <SidebarGroupTitle title="ارتباتاط" pTitles={["read_questions",  "read_comments"]} />
          {/* tlte */}

          <SidebarItem title="سوال ها" path="/" icon={<FaQuestionCircle />} pTitle="read_questions" />

          <SidebarItem title="نظرات" path="/" icon={<FaComment />} pTitle="read_comments" />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
