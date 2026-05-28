import { useContext, useEffect, useState } from "react";
import { useGetColors } from "../../../api/colors/hooks/useGetColors";
import DataTable from "../../../components/DataTable";
import Actions from "./Actions";
import AddColor from "./AddColor";
import ShowColor from "./ShowColor";
import { AdminContext } from "../../../context/AdminContextContainer";
import { Alert } from "../../../utils/alerts";
import { Toasty } from "../../../utils/customToast";
import { deleteColorApi } from "../../../api/colors/colorsApi";

const ColorsTable = () => {
  const { data, setData, loading, error } = useGetColors();
  const [colorToEdit, setColorToEdit] = useState(null);
  const { modalOpen, setModalOpen } = useContext(AdminContext);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "نام رنگ" },
    { field: "code", title: "کد رنگ" },
  ];

  const additionalField = [
    {
      title: "رنگ ",
      elements: (rowData) => <ShowColor rowData={rowData} />,
    },
    {
      title: "عملیات",
      elements: (rowData) => (
        <Actions rowData={rowData} setColorToEdit={setColorToEdit} handleDelete={handleDeleteColor} />
      ),
    },
  ];

  const handleDeleteColor = async (color) => {
    const result = await Alert({
      title: "حذف دسته بندی",
      text: `آیا از حذف ${color.title} اطمینان دارید؟`,
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
  };

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
        additionalField={additionalField}
      />
      <AddColor
        setData={setData}
        setColorToEdit={setColorToEdit}
        colorToEdit={colorToEdit}
        onSuccess={handleOnSuccess}
      />
    </>
  );
};

export default ColorsTable;
