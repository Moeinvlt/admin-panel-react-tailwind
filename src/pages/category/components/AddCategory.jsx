import { FaCheck } from "react-icons/fa";
import Modal from "../../../components/Modal";
import { Form, Formik } from "formik";
import FormikControl from "../../../components/form/FormikControl";
import SubmitBtn from "../../../components/form/SubmitBtn";
import { Toasty } from "../../../utils/customToast";
import { initialValues, onSubmit, validationSchema } from "../core";
import { useParentsCategory } from "../../../api/category/hooks/useParentsCategory";
import { useEditCategory } from "../../../api/category/hooks/useEditCategory";

const AddCategory = ({ onSuccess }) => {
  const { parents } = useParentsCategory();
  const { reInitialValues, editId, editCategory } = useEditCategory(initialValues)

  return (
    <Modal
      fullScreen={true}
      title={
        editId
          ? " ویرایش " + (editCategory ? editCategory.title : "")
          : "افزودن دسته محصول"
      }
    >
      <Formik
        initialValues={reInitialValues || initialValues}
        onSubmit={(values, actions) =>
          onSubmit(values, actions, onSuccess, editId)
        }
        validationSchema={validationSchema}
        enableReinitialize
      >
        <div>
          <Form>
            {parents.length > 0 ? (
              <FormikControl
                control="select"
                name="parent_id"
                options={parents}
                label="دسته والد"
              />
            ) : null}

            <FormikControl
              control="input"
              type="text"
              name="title"
              label="عنوان دسته"
              placeholder="عنوان دسته"
            />

            <FormikControl
              control="textarea"
              name="descriptions"
              label="توضیحات"
              placeholder="توضیحات"
            />

            {!editId ? (
              <FormikControl
                control="file"
                name="image"
                label="تصویر"
                placeholder="تصویر مورد نظر را انتخواب کنید"
              />
            ) : null}

            <div className="flex gap-4">
              <FormikControl
                control="checkbox"
                name="is_active"
                label="وضعیت فعال"
              />
              <FormikControl
                control="checkbox"
                name="show_in_menu"
                label="وضعیت نمایش در صفحه"
              />
            </div>

            <SubmitBtn />
          </Form>
        </div>
      </Formik>
    </Modal>
  );
};

export default AddCategory;
