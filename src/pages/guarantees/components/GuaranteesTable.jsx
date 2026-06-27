import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useGetGuarantees } from "../../../api/guarantees/hooks/useGetGuarantees";
import DataTable from "../../../components/DataTable";
import Actions from "./Actions";
import AddGuarantee from "./AddGuarantee";
import { AdminContext } from "../../../context/AdminContextContainer";
import { Alert } from "../../../utils/alerts";
import { Toasty } from "../../../utils/customToast";
import { deleteGuaranteesApi } from "../../../api/guarantees/GuaranteesApi";
import { useHasPermission } from "../../../hooks/permissionsHook";

const GuaranteesTable = () => {
  const { data, loading, error, setData } = useGetGuarantees();
  const { modalOpen, setModalOpen } = useContext(AdminContext);
  const [guaranteeToEdit, setGuaranteeToEdit] = useState(null);

  const hasAddGuaranteePerm = useHasPermission("create_guarantee");
  const hasActionPerm = useHasPermission([
    "update_guarantee",
    "delete_guarantee",
  ]);

  const handleDeleteGuarantee = useCallback(
    async (guarantee) => {
      const result = await Alert({
        title: "حذف دسته گارانتی",
        text: `آیا از حذف ${guarantee.title} اطمینان دارید؟`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
      });

      if (result.isConfirmed) {
        try {
          const res = await deleteGuaranteesApi(guarantee.id);
          if (res.status === 200) {
            setData((lastData) => lastData.filter((d) => d.id != guarantee.id));
            Toasty(res.data.message, "success");
          }
        } catch (err) {
          Toasty("مشکلی در انجام عملیات رخ داده است", "error");
        }
      }
    },
    [setData],
  );

  const dataInfo = useMemo(() => {
    const basicColumns = [
      { field: "id", title: "#" },
      { field: "title", title: "عنوان" },
      { field: "descriptions", title: "توضیحات" },
      { field: "length", title: "مدت گارانتی" },
      { field: "length_unit", title: "واحد" },
    ];

    if (hasActionPerm) {
      basicColumns.push({
        field: null,
        title: "عملیات",
        elements: (rowData) => (
          <Actions
            rowData={rowData}
            setGuaranteeToEdit={setGuaranteeToEdit}
            handleDelete={handleDeleteGuarantee}
          />
        ),
      });
    }

    return basicColumns;
  }, [hasActionPerm, handleDeleteGuarantee]);

  const handleOnSuccess = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (!modalOpen) {
      setGuaranteeToEdit(null);
    }
  }, [modalOpen]);

  return (
    <>
      <DataTable
        title="مدیریت گارانتی ها"
        data={data}
        isLoading={loading}
        error={error}
        dataInfo={dataInfo}
        limit={5}
        addPageBtn={false}
        modalBtn={hasAddGuaranteePerm ? true : false}
      />
      {hasAddGuaranteePerm && (
        <AddGuarantee
          setData={setData}
          onSuccess={handleOnSuccess}
          guaranteeToEdit={guaranteeToEdit}
          setGuaranteeToEdit={setGuaranteeToEdit}
        />
      )}
    </>
  );
};

export default GuaranteesTable;
