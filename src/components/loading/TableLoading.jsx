const TableLoading = () => {
  return (
    <div className="w-full pt-14 flex justify-center">
      <div className="main_loader flex gap-3">
        <div className="circle_loader bg-gray-400 dark:bg-gray-300"></div>
        <div className="circle_loader bg-gray-400 dark:bg-gray-300"></div>
        <div className="circle_loader bg-gray-400 dark:bg-gray-300"></div>
      </div>
    </div>
  );
};

export default TableLoading;
