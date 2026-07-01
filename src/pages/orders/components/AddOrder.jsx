import { Form, Formik } from "formik";
import Modal from "../../../components/Modal";
import { initialValues, onSubmit, validationSchema } from "../core";
import FormikControl from "../../../components/form/FormikControl";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/AdminContextContainer";
import SubmitBtn from "../../../components/form/SubmitBtn";
import { convertToDateToJalali } from "../../../utils/convertDate";
import { getSinglrOrderApi } from "../../../api/orders/ordersApi";
import { getOneDiscountApi } from "../../../api/discounts/discountsApi";
import { getDeliveriesApi } from "../../../api/deliveries/deliveriesApi";
import { getSinglrCartApi } from "../../../api/carts/cartsApi";
import { Toasty } from "../../../utils/customToast";
import { numberWithCommas } from "../../../utils/numbers";

const AddOrder = () => {
  const { setModalOpen } = useContext(AdminContext);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedOrderId = location.state?.orderId;
  const { setOrdersData } = useOutletContext() || {};
  const [reInitialValues, setReInitialValues] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [allDeliveries, setAllDeliveries] = useState([]);
  const [selectedCartItemsInfo, setSelectedCartItemsInfo] = useState([]);

  const getAllDeliveries = async () => {
    const res = await getDeliveriesApi();
    if (res.status === 200)
      setAllDeliveries(
        res.data.data.map((d) => ({
          id: d.id,
          value: d.title + "-" + d.amount,
        })),
      );
  };

  const handleGetCartsInfo = async (cartId) => {
    if (!cartId) return setSelectedCartItemsInfo([]);
    const res = await getSinglrCartApi(cartId);
    if (res.status === 200) {
      let products = [];
      const cart = res.data.data;
      if (cart.is_ordered) {
        setSelectedCartItemsInfo([]);
        return Toasty("این سبد در سفارش دیگری قرار دارد", "warning");
      }
      for (const item of cart.items) {
        products.push({
          id: item.id,
          product: item.product,
          guarantee: item.guarantee,
          color: item.color,
          count: item.count,
        });
      }
      setSelectedCartItemsInfo(products);
    }
  };

  const handleDiscountInfo = async (discountId) => {
    if (!discountId) return setDiscountPercent(0);
    const res = await getOneDiscountApi(discountId);
    if (res.status === 200) setDiscountPercent(res.data.data.percent);
  };

  const getSelectedOrderInfo = async () => {
    const res = await getSinglrOrderApi(selectedOrderId);
    if (res.status == 200) {
      const order = res.data.data;
      setReInitialValues({
        cart_id: order.cart_id,
        discount_id: order.discount_id || "",
        delivery_id: order.delivery_id,
        address: order.address,
        phone: order.phone,
        email: order.email || "",
        pay_at: order.pay_at ? convertToDateToJalali(order.pay_at) : "",
        pay_card_number: order.pay_card_number || "",
        pay_bank: order.pay_bank || "",
      });
      let products = [];
      const cart = order.cart;
      for (const item of cart.items) {
        products.push({
          id: item.id,
          product: item.product,
          guarantee: item.guarantee,
          color: item.color,
          count: item.count,
          unit_price: item.unit_price,
        });
      }
      setSelectedCartItemsInfo(products);
    }
  };

  const handleOnCloseModal = () => {
    navigate(-1);
    setModalOpen(false);
  };

  const onSuccess = () => {
    navigate(-1);
    setModalOpen(false);
  };

  useEffect(() => {
    getAllDeliveries();
    selectedOrderId && getSelectedOrderInfo();
  }, []);

  return (
    <Modal
      title={selectedOrderId ? "جزئیات سفارش" : "افزودن سفارش"}
      fullScreen={true}
      containerWidth="w-full"
      customCloseFnc={handleOnCloseModal}
    >
      <Formik
        initialValues={reInitialValues || initialValues}
        onSubmit={(values, actions) =>
          onSubmit(values, actions, onSuccess, setOrdersData)
        }
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <div className="mx-auto flex flex-col flex-wrap xl:flex-row gap-4 items-center justify-center border-b pb-8 border-border-light dark:border-border-dark">
                <div className="w-full max-w-70">
                  <FormikControl
                    control="input"
                    type="number"
                    name="cart_id"
                    label="کد سبد"
                    placeholder="کد سبد را وارد کنید"
                    onBlur={(e) => handleGetCartsInfo(e.target.value)}
                  />
                </div>
                <div className="w-full max-w-70">
                  <FormikControl
                    control="date"
                    formik={formik}
                    name="pay_at"
                    label="تاریخ"
                    placeholder="تاریخ پرداخت"
                    initialDate={undefined}
                    yearsLimit={{ from: 10, to: 0 }}
                  />
                </div>

                <input
                  type="text"
                  className="customBox p-1.5 defaultText"
                  value={`مبلغ سبد: ${selectedCartItemsInfo.length > 0 ? numberWithCommas(selectedCartItemsInfo.map((p) => p.count * (p.unit_price || p.product.price)).reduce((a, b) => a + b)) : 0}`}
                  disabled
                />

                <div className="w-full max-w-70">
                  <FormikControl
                    control="input"
                    type="number"
                    name="discount_id"
                    label="کد تخفیف"
                    placeholder="آی دی تخفیف"
                    onBlur={(e) => handleDiscountInfo(e.target.value)}
                  />
                </div>

                <input
                  type="text"
                  className="customBox p-1.5 defaultText"
                  value={"درصد تخفیف: " + discountPercent}
                  disabled
                />

                <div className="w-full max-w-70">
                  <FormikControl
                    control="input"
                    type="text"
                    name="address"
                    label="آدرس"
                    placeholder="آدرس را وارد کنید"
                  />
                </div>

                <FormikControl
                  control="select"
                  options={allDeliveries}
                  name="delivery_id"
                  firstItem="روش ارسال"
                />

                <div className="w-full max-w-70">
                  <FormikControl
                    control="input"
                    type="text"
                    name="phone"
                    label="شماره تماس"
                    placeholder="شماره تماس خود را وارد کنید"
                  />
                </div>

                <div className="w-full max-w-70">
                  <FormikControl
                    control="input"
                    type="text"
                    name="email"
                    label="ایمیل"
                    placeholder="ایمیل خود را وارد کنید"
                  />
                </div>

                <div className="w-full max-w-70">
                  <FormikControl
                    control="input"
                    type="number"
                    name="pay_card_number"
                    label="شماره کارت"
                    placeholder="شماره کارت خود را وارد کنید"
                  />
                </div>

                <div className="w-full max-w-70">
                  <FormikControl
                    control="input"
                    type="text"
                    name="pay_bank"
                    label="نام بانک"
                    placeholder="نام بانک را وارد کنید"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {selectedCartItemsInfo.map((item) => (
                  <div key={item.id} className="w-full md:w-1/2 lg:w-1/3">
                    <div className="flex items-center my-3 dir-ltr border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
                      <span className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 truncate">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">
                            {item.product.title}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            (قیمت واحد:{" "}
                            {numberWithCommas(
                              item.unit_price || item.product.price,
                            )}
                            )
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            (گارانتی: {item.guarantee?.title || "ندارد"})
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            ({item.count} عدد)
                          </span>
                          {item.color?.code && (
                            <span
                              className="inline-block w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: item.color.code }}
                            />
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {selectedCartItemsInfo.length > 0 && !selectedOrderId && (
                <SubmitBtn />
              )}
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddOrder;
