const Roles = ({ rowData }) => {
  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {rowData.roles?.map((role) => (
        <span
          key={role.id}
          className="bg-sky-400/20 px-2 py-1 rounded-full text-xs"
        >
          {role.title}
        </span>
      ))}
    </div>
  );
};

export default Roles;
