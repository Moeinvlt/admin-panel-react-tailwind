import { useGetPermissions } from "../../../api/users/hooks/useGetPermissions";
import DataTable from "../../../components/DataTable";

const PermissionsTable = () => {
  const { permissionsData, loading, error } = useGetPermissions();

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان لاتین" },
    { field: "description", title: "توضیحات" },
    { field: "category", title: "عنوان دسته" },
  ];

  return (
    <DataTable
      data={permissionsData}
      dataInfo={dataInfo}
      limit={8}
      isLoading={loading}
      error={error}
      modalBtn={false}
    />
  );
};

export default PermissionsTable;
