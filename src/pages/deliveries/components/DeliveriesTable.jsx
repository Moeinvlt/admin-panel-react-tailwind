import { useCallback, useContext, useMemo, useState } from "react";
import { useGetDeliveries } from "../../../api/deliveries/hooks/useGetDeliveries";
import { useHasPermission } from "../../../hooks/permissionsHook";
import Actions from "./Actions";
import { Alert } from "../../../utils/alerts";
import { deleteDeliveryApi } from "../../../api/deliveries/deliveriesApi";
import { Toasty } from "../../../utils/customToast";
import DataTable from "../../../components/DataTable";
import IsActive from "./tableAdditions/IsActive";
import AddDelivery from "./AddDelivery";
import { AdminContext } from "../../../context/AdminContextContainer";

const DeliveriesTable = () => {
  const { deliveriesData, setDeliveriesData, loading, error } =
    useGetDeliveries();

  const hasAddDeliveries = useHasPermission("create_delivery");
  const hasActionsPerm = useHasPermission([
    "update_delivery",
    "delete_delivery",
  ]);

  const { modalOpen, setModalOpen } = useContext(AdminContext);
  

  const [deliveryToEdit, setDeliveryToEdit] = useState(null);

  const handleDeleteDelivery = useCallback(
    async (delivery) => {
      const result = await Alert({
        title: "حذف نحوه ارسال",
        text: ` آیا از حذف این ${delivery.title} اطمینان دارید؟`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
      });

      if (result.isConfirmed) {
        try {
          const res = await deleteDeliveryApi(delivery.id);
          if (res.status === 200) {
            setDeliveriesData((lastData) =>
              lastData.filter((d) => d.id != delivery.id),
            );
            Toasty(res.data.message, "success");
          }
        } catch (err) {
          Toasty("مشکلی در انجام عملیات رخ داده است", "error");
        }
      }
    },
    [setDeliveriesData],
  );

  const dataInfo = useMemo(() => {
    const baseColumns = [
      { field: "id", title: "#" },
      { field: "title", title: "عنوان نحوه پست" },
      { field: "amount", title: "مبلغ(تومان)" },
      {
        field: null,
        title: "مدت زمان ارسال",
        elements: (rowData) => rowData.time + " " + rowData.time_unit,
      },
      {
        field: null,
        title: "وضعیت فعال",
        elements: (rowData) => <IsActive rowData={rowData} />,
      },
    ];

    if (hasActionsPerm) {
      baseColumns.push({
        field: null,
        title: "عملیات",
        elements: (rowData) => (
          <Actions rowData={rowData} handleDelete={handleDeleteDelivery} setDeliveryToEdit={setDeliveryToEdit} />
        ),
      });
    }

    return baseColumns;
  }, [hasActionsPerm, handleDeleteDelivery]);

  return (
    <>
      <DataTable
        title="مدیریت نحوه ارسال"
        data={deliveriesData}
        isLoading={loading}
        error={error}
        dataInfo={dataInfo}
        limit={5}
        modalBtn={hasAddDeliveries ? true : false}
      />
      {hasAddDeliveries && modalOpen && (
        <AddDelivery
          setData={setDeliveriesData}
          deliveryToEdit={deliveryToEdit}
          setDeliveryToEdit={setDeliveryToEdit}
        />
      )}
    </>
  );
};

export default DeliveriesTable;
