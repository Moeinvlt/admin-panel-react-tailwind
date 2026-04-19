import Avatar from "./components/Avatar";
import DarkmodeBtn from "./components/DarkmodeBtn";
import NotificationBtn from "./components/NotificationBtn";
import ParsianDate from "./components/PersianDate";
import SearchBtn from "./components/SearchBtn";
import SettingBtn from "./components/SettingBtn";

const LeftSide = () => {
  return (
    <ul className="flex flex-row-reverse items-center h-full">
      <SettingBtn />

      <Avatar />

      <NotificationBtn />

      <DarkmodeBtn />

      <SearchBtn />

      <ParsianDate/>
    </ul>
  );
};

export default LeftSide;
