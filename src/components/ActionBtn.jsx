const ActionBtn = ({ icon, onClick, color, iconColor, actionTitle }) => {
  const bgColor = {
    purple: "bg-purple-500/30 hover:bg-purple-500",
    red: "bg-red-500/30 hover:bg-red-500",
    blue: "bg-blue-500/30 hover:bg-blue-500",
    green: "bg-green-500/30 hover:bg-green-500",
    amber: "bg-amber-500/30 hover:bg-amber-500",
    sky: "bg-sky-500/30 hover:bg-sky-500",
  }[color];

  return (
    <button
      type="button"
      className={`relative ${iconColor} cursor-pointer text-[16px] mr-2 ${bgColor} hover:text-white transition-all duration-150 p-2 rounded-md group`}
      onClick={onClick}
    >
      {actionTitle && (
        <span className="inline-block absolute bg-gray-950 text-amber-50 rounded-md p-2 text-[10px] bottom-full left-1/2 -translate-x-1/2 mb-3.5 whitespace-nowrap z-20 actionBtnTitle scale-0 group-hover:scale-100 transition-all pointer-events-none">
          {actionTitle}
        </span>
      )}
      {icon}
    </button>
  );
};

export default ActionBtn;
