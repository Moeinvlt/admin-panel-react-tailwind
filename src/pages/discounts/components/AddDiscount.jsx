import { FaCheck } from "react-icons/fa";
import Modal from "../../../components/Modal";
import { Form, Formik } from "formik";
import FormikControl from "../../../components/form/FormikControl";
import SubmitBtn from "../../../components/form/SubmitBtn";
import { initialValues, onSubmit, validationSchema } from "../core";
import { getProductTitlesApi } from "../../../api/products/productsApi";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { convertToDateToJalali } from "../../../utils/convertDate";
import { AdminContext } from "../../../context/AdminContextContainer";

const AddDiscount = ({ onClose, setDiscountsData }) => {
  const { setModalOpen } = useContext(AdminContext);

  const location = useLocation();
  const discountToEdit = location.state?.discountToEdit;

  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [reInitialValues, setReInitialValues] = useState(null);

  const handleGetAllProductTitles = async () => {
    const res = await getProductTitlesApi();
    if (res.status === 200) {
      setAllProducts(
        res.data.data.map((p) => {
          return { id: p.id, value: p.title };
        }),
      );
    }
  };

  const handleSetProductSelectBox = (formik) => {
    const idsArr = formik.values.product_ids.split("-").filter((id) => id);
    const selectedProductArr = idsArr
      .map((id) => allProducts.filter((p) => p.id == id)[0])
      .filter((product) => product);
    return (
      <div className="animate__animated animate__shakeX">
        <FormikControl
          label="برای"
          control="searchableSelect"
          options={allProducts}
          name="product_ids"
          firstItem="محصول مورد نظر را انتخاب کنبد..."
          resultType="string"
          initialItems={
            selectedProductArr.length > 0
              ? selectedProductArr
              : selectedProducts
          }
        />
      </div>
    );
  };

  const onSuccess = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    handleGetAllProductTitles();

    if (discountToEdit) {
      setSelectedProducts(
        discountToEdit.products.map((p) => {
          return { id: p.id, value: p.title };
        }),
      );
      const productIds = discountToEdit.products.map((p) => p.id).join("-");
      setReInitialValues({
        ...discountToEdit,
        expire_at: convertToDateToJalali(
          discountToEdit.expire_at,
          "jD / jM / jYYYY",
        ),
        for_all: discountToEdit.for_all ? true : false,
        product_ids: productIds,
      });
    } else {
      // حالت افزودن جدید – ریست کردن stateها
      setSelectedProducts([]);
      setReInitialValues(null);
    }
  }, [discountToEdit]);

  return (
    <Modal fullScreen={false} title="افزودن کد تخفیف" customCloseFnc={onClose}>
      <Formik
        initialValues={reInitialValues || initialValues}
        onSubmit={(values, actions) =>
          onSubmit(values, actions, setDiscountsData, discountToEdit, onSuccess)
        }
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formik) => {
          return (
            <div>
              <Form>
                <FormikControl
                  control="input"
                  name="title"
                  type="text"
                  label="نام تخفیف"
                  placeholder="عنوان تخفیف را وارد کنید"
                />

                <FormikControl
                  control="input"
                  name="code"
                  type="text"
                  label="کد تخفیف"
                  placeholder="کد تخفیف را وارد کنید"
                />

                <FormikControl
                  control="input"
                  name="percent"
                  type="number"
                  label="درصد تخفیف"
                  placeholder="درصد تخفیف را وارد کنید"
                />

                <FormikControl
                  control="date"
                  name="expire_at"
                  label="تاریخ شروع"
                  initialDate={discountToEdit?.expire_at || undefined}
                  yearsLimit={{ from: 100, to: 0 }}
                  placeholder="روز / ماه / سال"
                />

                <FormikControl
                  control="checkbox"
                  name="for_all"
                  label="برای همه؟"
                />
                {!formik.values.for_all
                  ? handleSetProductSelectBox(formik)
                  : null}

                <SubmitBtn />
              </Form>
            </div>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddDiscount;
