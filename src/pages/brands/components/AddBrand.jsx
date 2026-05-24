import { FaCheck } from "react-icons/fa";
import Modal from "../../../components/Modal";
import { Form, Formik } from "formik";
import FormikControl from "../../../components/form/FormikControl";
import SubmitBtn from "../../../components/form/SubmitBtn";
import { initialValues, onSubmit, validationSchema } from "../core";
import { apiPath } from "../../../api/httpService";
import { useEffect, useState } from "react";

const AddBrand = ({ onSuccess, setData, brandToEdit, setBrandToEdit }) => {
  const [reInitialValues, setReInitialValues] = useState(null);

  useEffect(() => {
    if (brandToEdit) {
      setReInitialValues({
        original_name: brandToEdit.original_name,
        persian_name: brandToEdit.persian_name || "",
        descriptions: brandToEdit.descriptions || "",
        logo: null,
      });
    } else {
      setReInitialValues(null);
    }
  }, [brandToEdit]);


  return (
    <Modal
      fullScreen={false}
      title={brandToEdit ? "ویرایش برند" : "افزودن برند"}
    >
      <Formik
        initialValues={reInitialValues || initialValues}
        onSubmit={(values, actions) =>
          onSubmit(
            values,
            actions,
            onSuccess,
            setData,
            brandToEdit,
            setBrandToEdit
          )
        }
        validationSchema={validationSchema}
        enableReinitialize
      >
        <div>
          <Form>
            <FormikControl
              control="input"
              type="text"
              name="original_name"
              label="عنوان لاتین"
              placeholder="عنوان لاتین"
            />

            <FormikControl
              control="input"
              type="text"
              name="persian_name"
              label="عنوان فارسی"
              placeholder="عنوان فارسی"
            />

            <FormikControl
              control="input"
              type="text"
              name="descriptions"
              label="توضیحات"
              placeholder="توضیحات کوتاه درباره برند"
            />

            {brandToEdit && (
              <div className="w-full mt-4">
                <img
                  src={apiPath + "/" + brandToEdit.logo}
                  className="w-30 mx-auto"
                  alt="logo"
                />
              </div>
            )}

            <FormikControl
              control="file"
              name="logo"
              label="لوگو"
              placeholder="کوتاه "
            />

            <SubmitBtn />
          </Form>
        </div>
      </Formik>
    </Modal>
  );
};

export default AddBrand;
