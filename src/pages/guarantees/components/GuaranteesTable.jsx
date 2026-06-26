import { useContext, useEffect, useState } from "react";
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

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان" },
    { field: "descriptions", title: "توضیحات" },
    { field: "length", title: "مدت گارانتی" },
    { field: "length_unit", title: "واحد" },
  ];

  const additionalField = [
    {
      title: "عملیات",
      elements: (rowData) => (
        <Actions
          rowData={rowData}
          setGuaranteeToEdit={setGuaranteeToEdit}
          handleDelete={handleDeleteGuarantee}
        />
      ),
    },
  ];

  const handleDeleteGuarantee = async (guarantee) => {
    const result = await Alert({
      title: "حذف دسته بندی",
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
  };

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
        additionalField={additionalField}
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
