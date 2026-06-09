const IsActive = ({ rowData }) => {
  return (
    <span className={`inline-block min-w-22 py-1 rounded-md ${rowData.is_active ? "bg-green-500/30 text-green-500" : "bg-red-500/30 text-red-500"}`}>
      {rowData.is_active ? "فعال" : "غیر فعال"}
    </span>
  );
};

export default IsActive;