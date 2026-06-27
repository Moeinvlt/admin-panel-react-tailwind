import { Outlet } from "react-router";
import { useGetRoles } from "../../../api/users/hooks/useGetRoles";
import { deleteRoleApi } from "../../../api/users/usersApi";
import DataTable from "../../../components/DataTable";
import { Alert } from "../../../utils/alerts";
import { Toasty } from "../../../utils/customToast";
import Actions from "./Actions";
import AddRole from "./AddRole";
import ModalPageBtn from "../../../components/ModalPageBtn";
import { useHasPermission } from "../../../hooks/permissionsHook";
import { useCallback, useMemo } from "react";

const RolesTable = () => {
  const { rolesData, setRolesData, loading, error } = useGetRoles();

  const hasAddRolePerm = useHasPermission("create_role");
  const hasActionPerm = useHasPermission([
    "update_role",
    "update_role_permissions",
    "update_role_permissions",
  ]);

  const handleDeleteRole = useCallback(
    async (role) => {
      const result = await Alert({
        title: `حذف ${role.title}`,
        text: "آیا از حذف این نقش اطمینان دارید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
      });

      if (result.isConfirmed) {
        try {
          const res = await deleteRoleApi(role.id);
          if (res.status === 200) {
            setRolesData((lastData) => lastData.filter((d) => d.id != role.id));
            Toasty(res.data.message, "success");
          }
        } catch (err) {
          Toasty("مشکلی در انجام عملیات رخ داده است", "error");
        }
      }
    },
    [setRolesData],
  );

  const dataInfo = useMemo(() => {
    const baseColumns = [
      { field: "id", title: "#" },
      { field: "title", title: "مدیر فروش" },
      { field: "description", title: "توضیحات" },
    ];

    if (hasActionPerm) {
      baseColumns.push({
        field: null,
        elements: (rowData) => (
          <Actions rowData={rowData} handleDelete={handleDeleteRole} />
        ),
      });
    }

    return baseColumns;
  }, [hasActionPerm, handleDeleteRole]);

  return (
    <>
      <DataTable
        data={rolesData}
        dataInfo={dataInfo}
        limit={8}
        isLoading={loading}
        error={error}
        modalBtn={false}
        addPageBtn={
          hasAddRolePerm ? <ModalPageBtn linkPath="/roles/add-role" /> : false
        }
      />
      {hasAddRolePerm && <AddRole setRolesData={setRolesData} />}
    </>
  );
};

export default RolesTable;
