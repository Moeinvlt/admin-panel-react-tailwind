import { FaCheck } from "react-icons/fa";
import Modal from "../../../components/Modal";
import { HiX } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import SubmitBtn from "../../../components/form/SubmitBtn";
import PrevPageBtn from "../../../components/PrevPageBtn";
import { ErrorMessage, Form, Formik } from "formik";
import { initialValues, onSubmit, validationSchema } from "../core";
import FormikControl from "../../../components/form/FormikControl";
import { useParentsCategory } from "../../../api/category/hooks/useParentsCategory";
import { useEffect, useState } from "react";
import { getCategoriesApi } from "../../../api/category/categoryApi";
import TableLoading from "../../../components/loading/TableLoading";
import FormErrorMessage from "../../../components/form/FormErrorMessage";
import SearchableSelect from "../../../components/form/SearchableSelect";
import { getBrandsApi } from "../../../api/brands/brandsApi";
import { getColorsApi } from "../../../api/colors/colorsApi";
import { getGuaranteesApi } from "../../../api/guarantees/GuaranteesApi";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const { parents } = useParentsCategory();
  const [mainCategories, setMainCategories] = useState([]);

  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [guarantees, setGuarantees] = useState([]);

  const navigate = useNavigate()

  const handleSetMainCategories = async (value) => {
    setMainCategories("waiting");
    if (value > 0) {
      const res = await getCategoriesApi(value);
      if (res.status === 200) {
        setMainCategories(
          res.data.data.map((d) => {
            return { id: d.id, value: d.title };
          }),
        );
      }
    } else {
      setMainCategories([]);
    }
  };

  const getAllBrands = async () => {
    const res = await getBrandsApi();

    res.status === 200 &&
      setBrands(
        res.data.data.map((d) => {
          return { id: d.id, value: d.original_name };
        }),
      );
  };

  const getAllColors = async () => {
    const res = await getColorsApi();

    setColors(
      res.data.data.map((d) => {
        return { id: d.id, value: d.title };
      }),
    );
  };

  const getAllGuarantees = async () => {
    const res = await getGuaranteesApi();

    setGuarantees(
      res.data.data.map((d) => {
        return { id: d.id, value: d.title };
      }),
    );
  };

  useEffect(() => {
    getAllBrands();
    getAllColors();
    getAllGuarantees()
  }, []);

  return (
    <>
      <h3 className="text-center defaultText text-2xl">افزودن عنوان جدید</h3>
      <div className="text-end pl-4">
        <PrevPageBtn />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => onSubmit(values, actions, navigate)}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <div className="w-full flex justify-center">
            <Form>
              <FormikControl
                control="select"
                options={parents}
                name="parentCategories"
                label="دسته والد"
                firstItem="دسته مورد نظر را انتخواب کنید"
                handleOnChange={handleSetMainCategories}
              />

              {mainCategories === "waiting" ? <TableLoading /> : null}
              <SearchableSelect
                name="category_ids"
                options={
                  typeof mainCategories == "object" ? mainCategories : []
                }
                label="دسته‌ها"
                resultType="string" // یا "array"
                firstItem="دسته مورد نظر را انتخاب کنید"
                className=""
              />

              <FormikControl
                control="input"
                type="text"
                name="title"
                label="عنوان"
                placeholder="فقط از حروف و اعداد استفاده کنید"
              />

              <FormikControl
                control="input"
                type="number"
                name="price"
                label="قیمت *"
                placeholder="فقط از اعداد استفاده کنید(تومان)"
              />

              <FormikControl
                control="input"
                type="number"
                name="weight"
                label="وزن"
                placeholder="فقط از اعداد استفاده کنید(گرم)"
              />

              <FormikControl
                control="select"
                name="brand_id"
                firstItem="برند خود را انتخواب کنید"
                options={brands}
                label="برند"
              />

              <FormikControl
                control="searchableSelect"
                name="color_ids"
                firstItem="رنگ مورد نظر را انتخواب کنید"
                options={colors}
                label="رنگ"
              />

              <FormikControl
                control="searchableSelect"
                name="guarantee_ids"
                firstItem="گارانتی مورد نظر را انتخواب کنید"
                options={guarantees}
                label="گارانتی"
              />


              <FormikControl
                control="textarea"
                name="descriptions"
                label="توضیحات"
                placeholder="فقط از حروف و اعداد استفاده کنید"
              />

              <FormikControl
                control="textarea"
                name="short_descriptions"
                label="توضیحات کوتاه"
                placeholder="فقط از حروف و اعداد استفاده کنید"
              />

              <FormikControl
                control="textarea"
                name="cart_descriptions"
                label="توضیحات سبد خرید"
                placeholder="فقط از حروف و اعداد استفاده کنید"
              />

              <FormikControl
                control="file"
                name="image"
                label="تصویر"
                placeholder="تصویر"
              />

              <FormikControl
                control="input"
                type="text"
                name="alt_image"
                label="توضیح تصویر"
                placeholder="فقط از حروف و اعداد استفاده کنید"
              />

              <FormikControl
                control="input"
                type="text"
                name="keywords"
                label="کلمات کیلیدی"
                placeholder="مثلا: تست1-تست2-تست3"
              />

              <FormikControl
                control="input"
                type="number"
                name="stock"
                label="موجودی"
                placeholder="فقط از اعداد استفاده کنید"
              />

              <FormikControl
                control="input"
                type="number"
                name="discount"
                label="درصد تخفیف"
                placeholder="فقط از اعداد استفاده کنید(درصد)"
              />

              <SubmitBtn />
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default AddProduct;
