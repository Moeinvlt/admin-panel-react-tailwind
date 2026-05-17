import { FaCheck } from "react-icons/fa";
import Modal from "../../../components/Modal";
import { Form, Formik } from "formik";
import FormikControl from "../../../components/form/FormikControl";
import SubmitBtn from "../../../components/form/SubmitBtn";
import { Toasty } from "../../../utils/customToast";
import { initialValues, onSubmit, validationSchema } from "../core";
import { useParentsCategory } from "../../../api/category/hooks/useParentsCategory";

const AddCategory = () => {
  const {parents} = useParentsCategory();

  return (
    <Modal fullScreen={true} title="افزودن دسته محصول">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
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

            <FormikControl
              control="file"
              name="image"
              label="تصویر"
              placeholder="تصویر مورد نظر را انتخواب کنید"
            />

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
