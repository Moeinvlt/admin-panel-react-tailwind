import profileImg from "../../../../../assets/images/profimage.jpg";

const Avatar = () => {
  return (
    <li className="h-full flex items-center justify-center border-border-light dark:border-border-dark px-4 border-r">
      <button type="button" className="cursor-pointer">
        <div className="w-8 h-8">
          <img
            src={profileImg}
            alt="profile-image"
            className="w-full rounded-full"
          />
        </div>
      </button>
    </li>
  );
};

export default Avatar;
