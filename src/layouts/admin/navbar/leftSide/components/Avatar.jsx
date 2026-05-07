import { useState } from "react";
import profileImg from "../../../../../assets/images/profimage.jpg";
import ProfileInfo from "./ProfileInfo";

const Avatar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <li className="h-full flex items-center justify-center border-border-light dark:border-border-dark px-4 border-r relative">
        <button
          type="button"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <div className="w-8 h-8">
            <img
              src={profileImg}
              alt="profile-image"
              className="w-full rounded-full"
            />
          </div>
        </button>
      </li>
      <ProfileInfo isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Avatar;
