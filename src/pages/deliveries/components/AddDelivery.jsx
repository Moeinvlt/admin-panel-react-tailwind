import { Form, Formik } from "formik";
import Modal from "../../../components/Modal";
import { initialValues, onSubmit, validationSchema } from "../core";
import FormikControl from "../../../components/form/FormikControl";
import SubmitBtn from "../../../components/form/SubmitBtn";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";

const AddDelivery = ({ setData, deliveryToEdit, setDeliveryToEdit }) => {
  const [reInitialValues, setReInitialValues] = useState(null);
  const { setModalOpen } = useContext(AdminContext);

  useEffect(() => {
    if (deliveryToEdit) {
      setReInitialValues({
        title: deliveryToEdit.title,
        amount: deliveryToEdit.amount,
        time: deliveryToEdit.time,
        time_unit: deliveryToEdit.time_unit,
      });
    } else {
      setReInitialValues(null);
    }
  }, [deliveryToEdit]);

  const onSuccess = () => {
    setModalOpen(false);
    setDeliveryToEdit(null);
  };

  const onCloseModal = () => {
    setModalOpen(false);
    setDeliveryToEdit(null);
  };

  return (
    <Modal
      title={deliveryToEdit ? "ویرایش نحوه ارسال" : "افزودن نحوه ارسال"}
      fullScreen={false}
      customCloseFnc={onCloseModal}
    >
      <Formik
        initialValues={reInitialValues || initialValues}
        onSubmit={(values, actions) =>
          onSubmit(values, actions, setData, deliveryToEdit, onSuccess)
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
              label="عنوان"
              placeholder="فقط حروف فارسی و لاتین"
            />
            <FormikControl
              control="input"
              type="number"
              name="amount"
              label="مبلغ"
              placeholder="فقط از اعداد استفاده کنید"
            />
            <FormikControl
              control="input"
              type="number"
              name="time"
              label="مدت ارسال"
              placeholder="فقط از اعداد استفاده کنید"
            />
            <FormikControl
              control="input"
              type="text"
              name="time_unit"
              label="واحد مدت"
              placeholder="فقط حروف فارسی و لاتین"
            />

            <SubmitBtn />
          </Form>
        </div>
      </Formik>
    </Modal>
  );
};

export default AddDelivery;
