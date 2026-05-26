const ActionBtn = ({ icon, onClick, bgColor, iconColor }) => {
  return (
    <button
      type="button"
      className={`${iconColor} cursor-pointer text-[16px] mr-2 ${bgColor}/30 hover:${bgColor} hover:text-white transition-all duration-150 p-2 rounded-md`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default ActionBtn;
