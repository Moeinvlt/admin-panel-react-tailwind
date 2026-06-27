import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useGetColors } from "../../../api/colors/hooks/useGetColors";
import DataTable from "../../../components/DataTable";
import Actions from "./Actions";
import AddColor from "./AddColor";
import ShowColor from "./ShowColor";
import { AdminContext } from "../../../context/AdminContextContainer";
import { Alert } from "../../../utils/alerts";
import { Toasty } from "../../../utils/customToast";
import { deleteColorApi } from "../../../api/colors/colorsApi";
import { useHasPermission } from "../../../hooks/permissionsHook";

const ColorsTable = () => {
  const { data, setData, loading, error } = useGetColors();
  const [colorToEdit, setColorToEdit] = useState(null);
  const { modalOpen, setModalOpen } = useContext(AdminContext);

  const hasAddColorPerm = useHasPermission("create_color");
  const hasActionPerm = useHasPermission(["update_color", "delete_color"]);

  const handleDeleteColor = useCallback(
    async (color) => {
      const result = await Alert({
        title: "حذف رنگ",
        text: ` آیا از حذف رنگ ${color.title} اطمینان دارید؟`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
      });

      if (result.isConfirmed) {
        try {
          const res = await deleteColorApi(color.id);
          if (res.status === 200) {
            setData((lastData) => lastData.filter((d) => d.id != color.id));
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
      { field: "title", title: "نام رنگ" },
      { field: "code", title: "کد رنگ" },
      {
        field: null,
        title: "رنگ ",
        elements: (rowData) => <ShowColor rowData={rowData} />,
      },
    ];

    if (hasActionPerm) {
      basicColumns.push({
        field: null,
        title: "عملیات",
        elements: (rowData) => (
          <Actions
            rowData={rowData}
            setColorToEdit={setColorToEdit}
            handleDelete={handleDeleteColor}
          />
        ),
      });
    }

    return basicColumns;
  }, [hasActionPerm, handleDeleteColor]);

  useEffect(() => {
    if (!modalOpen) {
      setColorToEdit(null);
    }
  }, [modalOpen]);

  const handleOnSuccess = () => {
    setModalOpen(false);
  };

  return (
    <>
      <DataTable
        title="مدیریت رنگ ها"
        data={data}
        dataInfo={dataInfo}
        isLoading={loading}
        error={error}
        limit={5}
        addPageBtn={false}
        modalBtn={hasAddColorPerm ? true : false}
      />
      {hasAddColorPerm && (
        <AddColor
          setData={setData}
          setColorToEdit={setColorToEdit}
          colorToEdit={colorToEdit}
          onSuccess={handleOnSuccess}
        />
      )}
    </>
  );
};

export default ColorsTable;
