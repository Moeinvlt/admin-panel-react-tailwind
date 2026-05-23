import { Form, Formik } from "formik";
import Modal from "../../../../components/Modal";
import FormikControl from "../../../../components/form/FormikControl";
import { FaCheck } from "react-icons/fa";
import { useLocation } from "react-router";
import AttrsActions from "./attrsAdditions/AttrsActions";
import ShowInFilter from "./attrsAdditions/ShowInFilter";
import DataTable from "../../../../components/DataTable";
import { useCategoryAttrs } from "../../../../api/category/hooks/attrs/useCategoryAttrs";
import { initialValues, onSubmit, validationSchema } from "./core";
import { useEditCategoryAttrs } from "../../../../api/category/hooks/attrs/useEditCategoryAttrs";
import { useDeleteCategoryAttrs } from "../../../../api/category/hooks/attrs/useDeleteCategoryAttrs";

const AddAttributes = () => {
  const location = useLocation();
  const categoryDataId = location.state.categoryData.id;

  const { data, loading, error, setData } = useCategoryAttrs(categoryDataId);
  const { attrToEdit, setAttrToEdit, reInitialValues } = useEditCategoryAttrs();
  const { deleteCategoryAttr } = useDeleteCategoryAttrs(setData);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "unit", title: "واحد" },
  ];

  const additionalField = [
    {
      title: "نمایش در منو",
      elements: (rowData) => <ShowInFilter rowData={rowData} />,
    },
    {
      title: "عملیات",
      elements: (rowData) => (
        <AttrsActions
          rowData={rowData}
          attrToEdit={attrToEdit}
          setAttrToEdit={setAttrToEdit}
          handleDelete={deleteCategoryAttr}
        />
      ),
    },
  ];

  return (
    <div className="px-10 pb-4">
      <h4 className="defaultText text-center pb-2">
        مدیریت ویژگی های دسته بندی
      </h4>

      <h4 className="defaultText pb-4">
        ویژگی های:
        <span className="text-green-500 font-bold">
          {" " + location.state.categoryData.title}
        </span>
      </h4>

      <Formik
        initialValues={reInitialValues || initialValues}
        onSubmit={(values, actions) =>
          onSubmit(
            values,
            actions,
            categoryDataId,
            setData,
            attrToEdit,
            setAttrToEdit
          )
        }
        validationSchema={validationSchema}
        enableReinitialize
      >
        <Form>
          <div
            className={`mx-auto flex flex-col flex-wrap xl:flex-row gap-7 items-center
           justify-center border-b pb-8 border-border-light dark:border-border-dark ${
             attrToEdit ? "" : ""
           }`}
          >
            <div className="w-full max-w-100">
              <FormikControl
                control="input"
                type="text"
                name="title"
                label="عنوان ویژگی"
                placeholder="عنوان ویژگی"
              />
            </div>
            <div className="w-full max-w-100">
              <FormikControl
                control="input"
                type="text"
                name="unit"
                label="واحد ویژگی"
                placeholder="واحد ویژگی"
              />
            </div>

            <FormikControl
              control="checkbox"
              name="in_filter"
              label="نمایش در فیلتر"
            />

            <button
              type="submit"
              className="border-2 border-green-500 text-green-500 inline-block w-10 h-10 rounded-full mt-4 cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-150"
            >
              <FaCheck className="inline-block" />
            </button>

            {attrToEdit && (
              <button
                type="button"
                className="bg-gray-500 text-white cursor-pointer py-1 px-2 rounded-md mt-4 text-sm"
                onClick={() => setAttrToEdit(null)}
              >
                انصراف
              </button>
            )}
          </div>
        </Form>
      </Formik>

      <DataTable
        data={data}
        dataInfo={dataInfo}
        additionalField={additionalField}
        isLoading={loading}
        error={error}
        modalBtn={false}
        prevPageBtn={true}
        limit={5}
      />
    </div>
  );
};

export default AddAttributes;
