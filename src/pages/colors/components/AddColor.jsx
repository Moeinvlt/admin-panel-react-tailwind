import { FaCheck } from "react-icons/fa";
import Modal from "../../../components/Modal";
import { FastField, Form, Formik } from "formik";
import SubmitBtn from "../../../components/form/SubmitBtn";
import FormikControl from "../../../components/form/FormikControl";
import { useEffect, useState } from "react";
import { initialValues, onSubmit, validationSchema } from "../core";

const AddColor = ({ setData, colorToEdit, setColorToEdit, onSuccess }) => {
  const [reInitValues, setReInitValues] = useState(null);
  const [colorPickerValue, setColorPickerValue] = useState("#000");

  useEffect(() => {
    if (colorToEdit) {
      setColorPickerValue(colorToEdit.code);
      setReInitValues({
        title: colorToEdit.title,
        code: colorToEdit.code,
      });
    } else {
      setColorPickerValue("#000");
      setReInitValues(null);
    }
  }, [colorToEdit]);

  const handleChangeColorCodeField = (e, form) => {
    setColorPickerValue(e.target.value);
    form.setFieldValue("code", e.target.value);
  };

  return (
    <Modal
      fullScreen={false}
      title={colorToEdit ? "ویرایش رنگ" : "افزودن رنگ جدید"}
    >
      <Formik
        initialValues={reInitValues || initialValues}
        onSubmit={(values, actions) =>
          onSubmit(
            values,
            actions,
            setData,
            colorToEdit,
            setColorToEdit,
            onSuccess,
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
              label="عنوان رنگ"
              placeholder="عنوال رنگ را وارد کنید"
              name="title"
            />

            <FastField>
              {({ form }) => {
                return (
                  <div className="flex items-center justify-center gap-2.5 my-3">
                    <label htmlFor="" className="defaultText mt-4">
                      انتخواب رنگ:
                    </label>
                    <input
                      type="color"
                      className="color-picker"
                      name="code"
                      value={colorPickerValue}
                      onChange={(e) => handleChangeColorCodeField(e, form)}
                    />
                  </div>
                );
              }}
            </FastField>

            <SubmitBtn />
          </Form>
        </div>
      </Formik>
    </Modal>
  );
};

export default AddColor;
