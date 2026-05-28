const ShowColor = ({ rowData }) => {
  return (
    <div
      style={{ backgroundColor: rowData.code }}
      className="w-full h-8 rounded-md"
    ></div>
  );
};

export default ShowColor;
