import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PrevPageBtn from "../../../../components/PrevPageBtn";
import SubmitBtn from "../../../../components/form/SubmitBtn";
import TableLoading from "../../../../components/loading/TableLoading";
import { initializingData, onSubmit } from "./core";
import FormErrorMessage from "../../../../components/form/FormErrorMessage";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

const SetProductAttr = () => {
  const location = useLocation();
  const { selectedProduct } = location.state;

  const [attrs, setAttrs] = useState();
  const [initialValues, setInitialValues] = useState(null);
  const [validationSchema, setValidationSchema] = useState({});

  const handleGetAttributes = async () => {
    const { attrsVar, initials, rules } =
      await initializingData(selectedProduct);
    setAttrs(attrsVar);
    setInitialValues(initials);
    setValidationSchema(
      Object.keys(initials).length > 0 ? Yup.object(rules) : {},
    );
  };
  useEffect(() => {
    handleGetAttributes();
  }, []);

  return (
    <div className="">
      <h4 className="text-center my-3 defaultText text-2xl">
        افزودن ویژگی محصول:
        <span className="text-sky-400">{selectedProduct.title}</span>{" "}
      </h4>
      <div className="text-end pl-6">
        <PrevPageBtn />
      </div>
      <div className="">
        {initialValues ? (
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) =>
              onSubmit(values, actions, selectedProduct.id)
            }
            validationSchema={validationSchema}
          >
            <Form>
              {attrs.map((attr, index) => (
                <div key={"group" + index}>
                  <h6 className="text-center defaultText">
                    گروه : {attr.groupTitle}
                  </h6>
                  {attr.data.length > 0 ? (
                    attr.data.map((attrData) => (
                      <div
                        className="flex justify-center my-8"
                        key={attrData.id}
                      >
                        <div className="customBox flex w-full max-w-130 mt-5">
                          <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
                            {" "}
                            {attrData.unit}{" "}
                          </span>
                          <Field
                            name={attrData.id}
                            type="text"
                            className="w-full defaultText p-2 outline-none"
                            placeholder=""
                          />
                          <span className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center">
                            {attrData.title}
                          </span>
                        </div>
                        <ErrorMessage
                          name={attrData.id}
                          component={FormErrorMessage}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-red-500 my-8">
                      هیچ ویژگی برای گروه های این محصول ایجاد نشده است
                    </div>
                  )}
                </div>
              ))}

              <div className="">
                <SubmitBtn />
              </div>
            </Form>
          </Formik>
        ) : (
          <TableLoading />
        )}
      </div>
    </div>
  );
};

export default SetProductAttr;
