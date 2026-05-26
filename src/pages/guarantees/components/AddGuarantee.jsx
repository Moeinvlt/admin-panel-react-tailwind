import { FaCheck } from "react-icons/fa";
import Modal from "../../../components/Modal";
import FormikControl from "../../../components/form/FormikControl";
import { Form, Formik } from "formik";
import SubmitBtn from "../../../components/form/SubmitBtn";
import { initialValues, onSubmit, validationSchema } from "../core";
import { useEffect, useState } from "react";

const AddGuarantee = ({
  onSuccess,
  setData,
  guaranteeToEdit,
  setGuaranteeToEdit,
}) => {
  const [reinitialValues, setReinitialValues] = useState(null);

  useEffect(() => {
    if (guaranteeToEdit) {
      setReinitialValues({
        title: guaranteeToEdit.title,
        descriptions: guaranteeToEdit.descriptions || "",
        length: guaranteeToEdit.length || "",
        length_unit: guaranteeToEdit.length_unit || "",
      });
    } else {
      setReinitialValues(null)
    }
  }, [guaranteeToEdit]);

  return (
    <Modal fullScreen={false} title={guaranteeToEdit ? "ویرایش گارانتی" : "افزودن گارانتی"}>
      <Formik
        initialValues={reinitialValues || initialValues}
        onSubmit={(values, actions) =>
          onSubmit(
            values,
            actions,
            onSuccess,
            setData,
            guaranteeToEdit,
            setGuaranteeToEdit
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
              name="title"
              label="عنوان گارانتی"
              placeholder="عنوان گارانتی"
            />

            <FormikControl
              control="textarea"
              name="descriptions"
              label="توضیحات گارانتی"
              placeholder="توضیحات گارانتی"
            />

            <FormikControl
              control="input"
              type="number"
              name="length"
              label="مدت گارانتی"
              placeholder="فقط عدد"
            />

            <FormikControl
              control="input"
              type="text"
              name="length_unit"
              label="واحد"
              placeholder="فقط حروف"
            />

            <SubmitBtn />
          </Form>
        </div>
      </Formik>
    </Modal>
  );
};

export default AddGuarantee;
