import DataTable from "../../../components/DataTable";
import Actions from "./Actions";

const GuaranteesTable = () => {
  const data = [
    {
      id: "1",
      category: "222",
      title: "lalalaaa",
      price: "22222",
      stock: "7",
      like_count: "2",
      status: "1",
    },
    {
      id: "2",
      category: "222",
      title: "lalalaaa",
      price: "22222",
      stock: "7",
      like_count: "2",
      status: "1",
    },
    {
      id: "3",
      category: "222",
      title: "lalalaaa",
      price: "22222",
      stock: "7",
      like_count: "2",
      status: "1",
    },
    {
      id: "4",
      category: "222",
      title: "lalalaaa",
      price: "22222",
      stock: "7",
      like_count: "2",
      status: "1",
    },
    {
      id: "5",
      category: "222",
      title: "lalalaaa",
      price: "22222",
      stock: "7",
      like_count: "2",
      status: "1",
    },
    {
      id: "5",
      category: "222",
      title: "lalalaaa",
      price: "22222",
      stock: "7",
      like_count: "2",
      status: "1",
    },
  ];

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "price", title: "قیمت محصول" },
  ];

  const additionalField = {
    title: "عملیات",
    elements: (itemId) => <Actions itemId={itemId} />,
  };

  return (
    <DataTable
      data={data}
      dataInfo={dataInfo}
      limit={5}
      additionalField={additionalField}
    />
  );
};

export default GuaranteesTable;
