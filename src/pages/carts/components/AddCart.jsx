import { Form, Formik } from "formik";
import { initialValues, validationSchema } from "../core";
import { FaCheck } from "react-icons/fa";
import FormikControl from "../../../components/form/FormikControl";
import Modal from "../../../components/Modal";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import {
  getOneProductApi,
  getProductTitlesApi,
} from "../../../api/products/productsApi";
import {
  createCartApi,
  editCartApi,
  getSinglrCartApi,
} from "../../../api/carts/cartsApi";
import { Toasty } from "../../../utils/customToast";
import { numberWithCommas } from "../../../utils/numbers";

const AddCart = () => {
  const { setModalOpen } = useContext(AdminContext);
  const navigate = useNavigate();
  const location = useLocation();
  const cartToEditId = location.state?.cartId;
  const { setCartsData } = useOutletContext();

  const [allProducts, setAllProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [colors, setColors] = useState([]);
  const [guarantees, setGuarantees] = useState([]);
  const [selectedProductsInfo, setSelectedProductsInfo] = useState([]);
  const [reInitialValues, setReInitialValues] = useState(null);

  const handleGetAllProductTitles = async () => {
    const res = await getProductTitlesApi();
    if (res.status === 200) {
      setAllProducts(
        res.data.data.map((p) => ({
          id: p.id,
          value: p.title,
        })),
      );
    }
  };

  const handleChangeSelectedProduct = async (e, formik) => {
    if (!e) {
      setCurrentProduct(null);
      setColors([]);
      setGuarantees([]);
      formik.setFieldValue("product_id", "");
      return;
    }

    formik.setFieldValue("product_id", e);

    try {
      const res = await getOneProductApi(e);

      if (res.status === 200) {
        const product = res.data.data;
        setCurrentProduct(product);

        const colorsArray = product.colors || [];
        const guaranteesArray = product.guarantees || [];

        setColors(
          colorsArray.map((c) => ({
            id: c.id,
            value: c.title || c.name || "بدون نام",
          })),
        );
        setGuarantees(
          guaranteesArray.map((g) => ({
            id: g.id,
            value: g.title || g.name || "بدون نام",
          })),
        );

        if (colorsArray.length === 0) {
          Toasty("این محصول رنگی ندارد", "info");
        }
        if (guaranteesArray.length === 0) {
          Toasty("این محصول گارانتی ندارد", "info");
        }
      } else {
        Toasty("خطا در دریافت اطلاعات محصول", "error");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      Toasty("خطا در دریافت اطلاعات محصول", "error");
    }
  };

  const handleAddProductToCart = (formik) => {
    const productId = formik.values.product_id;
    const colorId = formik.values.color_id;
    const guaranteeId = formik.values.guarantee_id;
    const count = parseInt(formik.values.count) || 1;

    if (!productId) {
      Toasty("لطفاً یک محصول انتخاب کنید", "warning");
      return;
    }

    if (!currentProduct) {
      Toasty("اطلاعات محصول کامل نیست", "warning");
      return;
    }

    const existingIndex = selectedProductsInfo.findIndex(
      (item) =>
        item.product.id === productId &&
        item.color?.id === colorId &&
        item.guarantee?.id === guaranteeId,
    );

    if (existingIndex !== -1) {
      setSelectedProductsInfo((prev) =>
        prev.map((item, index) =>
          index === existingIndex
            ? { ...item, count: item.count + count }
            : item,
        ),
      );
    } else {
      const newProduct = {
        id: Date.now(),
        product: currentProduct,
        color: colorId
          ? currentProduct.colors?.find((c) => c.id === colorId) || null
          : null,
        guarantee: guaranteeId
          ? currentProduct.guarantees?.find((g) => g.id === guaranteeId) || null
          : null,
        count: count,
      };
      setSelectedProductsInfo((prev) => [...prev, newProduct]);
    }

    formik.setFieldValue("product_id", "");
    formik.setFieldValue("color_id", "");
    formik.setFieldValue("guarantee_id", "");
    formik.setFieldValue("count", 1);
    setColors([]);
    setGuarantees([]);
    setCurrentProduct(null);
  };

  const handleConfirmAddCart = async (formik) => {
    const userId = formik.values.user_id;

    if (!userId) {
      Toasty("لطفاً آیدی کاربر را وارد کنید", "warning");
      return;
    }

    if (selectedProductsInfo.length === 0) {
      Toasty("حداقل یک محصول به سبد اضافه کنید", "warning");
      return;
    }

    const products = selectedProductsInfo.map((p) => ({
      product_id: p.product.id,
      color_id: p.color?.id || null,
      guarantee_id: p.guarantee?.id || null,
      count: p.count,
    }));

    try {
      let res;
      if (cartToEditId) {
        res = await editCartApi(cartToEditId, {
          user_id: Number(userId),
          products,
        });
      } else {
        res = await createCartApi({
          user_id: Number(userId),
          products,
        });
      }

      if (res.status === 201 || res.status === 200) {
        Toasty(res.data.message, "success");

        if (cartToEditId) {
          setCartsData((prev) =>
            prev.map((item) =>
              item.id === cartToEditId ? res.data.data : item,
            ),
          );
        } else {
          setCartsData((prev) => [...prev, res.data.data]);
        }

        navigate(-1);
      }
    } catch (error) {
      console.error("Error saving cart:", error);
      Toasty(error.response?.data?.message || "خطا در ذخیره سبد خرید", "error");
    } finally {
      formik.setSubmitting(false);
    }
  };

  const handleDeleteProduct = (id) => {
    setSelectedProductsInfo((old) => old.filter((o) => o.id !== id));
  };

  const handleGetCartToEditInfo = async () => {
    try {
      const res = await getSinglrCartApi(cartToEditId);
      if (res.status === 200) {
        const cart = res.data.data;
        setReInitialValues({ ...initialValues, user_id: cart.user_id });
        const products = cart.items
          .filter((item) => item.product)
          .map((item) => ({
            id: item.id,
            product: item.product,
            guarantee: item.guarantee,
            color: item.color,
            count: item.count,
          }));
        setSelectedProductsInfo(products);
      }
    } catch (error) {
      Toasty("خطا در دریافت اطلاعات سبد خرید", "error");
    }
  };

  const onModalClose = () => {
    setModalOpen(false);
    navigate(-1);
  };

  useEffect(() => {
    handleGetAllProductTitles();
    if (cartToEditId) {
      handleGetCartToEditInfo();
    }
  }, []);

  return (
    <Modal
      title={cartToEditId ? "ویرایش سبد خرید" : "افزودن سبد خرید"}
      fullScreen={true}
      containerWidth="w-full"
      customCloseFnc={onModalClose}
    >
      <Formik
        initialValues={reInitialValues || initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={() => {}}
      >
        {(formik) => (
          <Form>
            <div className="mx-auto flex flex-col flex-wrap xl:flex-row gap-4 items-center justify-center border-b pb-6 border-border-light dark:border-border-dark">
              <div className="w-full max-w-100">
                <FormikControl
                  control="input"
                  type="text"
                  name="user_id"
                  label="آیدی کاربر"
                  placeholder="آیدی کاربر"
                />
              </div>

              <div className="w-full max-w-100">
                <FormikControl
                  control="searchableSelect"
                  options={allProducts}
                  name="product_id"
                  label="محصول"
                  resultType="string"
                  placeholder="محصول را انتخاب کنید..."
                  onChange={(e) => handleChangeSelectedProduct(e, formik)}
                />
              </div>

              <div className="w-full max-w-100">
                <FormikControl
                  control="searchableSelect"
                  options={colors}
                  name="color_id"
                  label="رنگ"
                  resultType="string"
                  placeholder="رنگ را انتخاب کنید..."
                  disabled={!currentProduct}
                  onChange={(e) => formik.setFieldValue("color_id", e)}
                />
              </div>

              <div className="w-full max-w-100">
                <FormikControl
                  control="searchableSelect"
                  options={guarantees}
                  name="guarantee_id"
                  label="گارانتی"
                  resultType="string"
                  placeholder="گارانتی را انتخاب کنید..."
                  disabled={!currentProduct}
                  onChange={(e) => formik.setFieldValue("guarantee_id", e)}
                />
              </div>

              <div className="w-full max-w-100">
                <FormikControl
                  control="input"
                  type="number"
                  name="count"
                  label="تعداد"
                  placeholder="تعداد"
                />
              </div>

              <button
                type="button"
                onClick={() => handleAddProductToCart(formik)}
                className="border-2 border-green-500 text-green-500 w-10 h-10 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-150 flex items-center justify-center"
              >
                <FaCheck />
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 mt-4">
              {selectedProductsInfo
                .filter((product) => product && product.product)
                .map((product) => (
                  <div
                    key={product.id}
                    className="w-full md:w-1/2 lg:w-1/3 px-2"
                  >
                    <div className="flex items-center my-3 dir-ltr border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                      <span className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 truncate">
                        <span className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                            title="حذف محصول از سبد"
                          >
                            ✕
                          </button>
                          <span className="font-medium">
                            {product.product.title}
                          </span>
                        </span>
                        <span className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>
                            قیمت واحد: {numberWithCommas(product.product.price)}
                          </span>
                          <span>
                            گارانتی: {product.guarantee?.title || "ندارد"}
                          </span>
                          <span>تعداد: {product.count}</span>
                          {product.color?.code && (
                            <span
                              className="inline-block w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: product.color.code }}
                            />
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}

              <div className="w-full"></div>

              {selectedProductsInfo.length > 0 ? (
                <>
                  <div className="w-full md:w-1/2 px-2">
                    <div className="flex items-center my-3 dir-ltr">
                      <span className="flex-1 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md text-right">
                        {numberWithCommas(
                          selectedProductsInfo
                            .map((p) => p.count * p.product.price)
                            .reduce((a, b) => a + b, 0),
                        )}
                      </span>
                      <span className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md text-center w-1/4">
                        جمع کل
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex justify-center mt-4">
                    <button
                      type="button"
                      className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleConfirmAddCart(formik)}
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting
                        ? "در حال ذخیره..."
                        : "ذخیره سبد خرید"}
                    </button>
                  </div>
                </>
              ) : (
                <h6 className="text-center text-blue-600 dark:text-blue-400 w-full my-4">
                  محصولات خود را مشخص کنید
                </h6>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCart;
