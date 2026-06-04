import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { FaSitemap } from "react-icons/fa";
import Actions from "./Actions";
import AddProduct from "./AddProduct";
import PaginatedDataTable from "../../../components/PaginatedDataTable";
import { useGetProducts } from "../../../api/products/hooks/useGetProducts";
import { Alert } from "../../../utils/alerts";
import { deleteProductApi } from "../../../api/products/productsApi";
import { Toasty } from "../../../utils/customToast";

const ProductTable = () => {
  const {
    data,
    loading,
    error,
    currentPage,
    setCurrentPage,
    pageCount,
    handleSearch,
    setData,
  } = useGetProducts();

  const dataInfo = [
    { field: "id", title: "#" },
    {
      field: null,
      title: "گروه محصول",
      elements: (rowData) => rowData.categories[0]?.title,
    },
    { field: "title", title: "عنوان" },
    { field: "price", title: "قیمت" },
    { field: "stock", title: "موجودی" },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => (
        <Actions rowData={rowData} handleDelete={handleDeleteProduct} />
      ),
    },
  ];
  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
  };

  const handleDeleteProduct = async (product) => {
    const result = await Alert({
      title: "حذف دسته بندی",
      text: `آیا از حذف ${product.title} اطمینان دارید؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
    });

  if (result.isConfirmed) {
    try {
      const res = await deleteProductApi(product.id);
      if (res.status === 200) {
        // حذف از state محلی
        setData(prevData => prevData.filter(item => item.id !== product.id));
        Toasty(res.data.message, "success");
      }
    } catch (err) {
      Toasty("مشکلی در انجام عملیات رخ داده است", "error");
    }
  }
  };

  return (
    <PaginatedDataTable
      title="مدیریت محصول"
      tableData={data}
      dataInfo={dataInfo}
      isLoading={loading}
      error={error}
      searchParams={searchParams}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageCount={pageCount}
      handleSearch={handleSearch}
      modalBtn={false}
      addPageBtn={true}
      addPagePath="/products/add-product"
    />
  );
};

export default ProductTable;
