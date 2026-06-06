import { FaCheck } from "react-icons/fa";
import Modal from "../../../components/Modal";
import { HiX } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import SubmitBtn from "../../../components/form/SubmitBtn";
import PrevPageBtn from "../../../components/PrevPageBtn";
import { ErrorMessage, Form, Formik } from "formik";
import { initialValues, onSubmit, validationSchema } from "../core";
import FormikControl from "../../../components/form/FormikControl";
import { useEffect, useState } from "react";
import { getCategoriesApi } from "../../../api/category/categoryApi";
import TableLoading from "../../../components/loading/TableLoading";
import FormErrorMessage from "../../../components/form/FormErrorMessage";
import SearchableSelect from "../../../components/form/SearchableSelect";
import { getBrandsApi } from "../../../api/brands/brandsApi";
import { getColorsApi } from "../../../api/colors/colorsApi";
import { getGuaranteesApi } from "../../../api/guarantees/GuaranteesApi";
import { useLocation, useNavigate } from "react-router";

const AddProduct = () => {
  const [parentCategories, setparentCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);

  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [guarantees, setGuarantees] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]); // used in editting
  const [selectedColors, setSelectedColors] = useState([]); // used in editting
  const [selectedGuarantees, setSelectedGuarantees] = useState([]); // used in editting

  const location = useLocation();
  const productToEdit = location.state?.productToEdit;

  const [reInitialValues, setReInitialValues] = useState();

  const navigate = useNavigate();

  const getAllParentCategories = async () => {
    const res = await getCategoriesApi();
    if (res.status === 200) {
      setparentCategories(
        res.data.data.map((d) => {
          return { id: d.id, value: d.title };
        }),
      );
    }
  };

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

  const setInitialSelectedValues = () => {
    if (productToEdit) {
      setSelectedCategories(
        productToEdit.categories.map((c) => {
          return { id: c.id, value: c.title };
        }),
      );
      setSelectedColors(
        productToEdit.colors.map((c) => {
          return { id: c.id, value: c.title };
        }),
      );
      setSelectedGuarantees(
        productToEdit.guarantees.map((c) => {
          return { id: c.id, value: c.title };
        }),
      );
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await getAllParentCategories();
      await getAllBrands();
      await getAllColors();
      await getAllGuarantees();
      setInitialSelectedValues();

      for (const key in productToEdit) {
        if (productToEdit[key] === null) productToEdit[key] = "";
      }

      if (productToEdit) {
        // ابتدا اگر parent_id دارد، mainCategories را بارگذاری کن
        if (productToEdit.parent_id) {
          await handleSetMainCategories(productToEdit.parent_id);
        }
        // سپس reInitialValues را تنظیم کن
        setReInitialValues({
          ...productToEdit,
          parentCategories: productToEdit.parent_id || "",
          category_ids: productToEdit.categories.map((c) => c.id).join("-"),
          color_ids: productToEdit.colors.map((c) => c.id).join("-"),
          guarantee_ids: productToEdit.guarantees.map((g) => g.id).join("-"),
          image: "",
        });
      } else {
        setReInitialValues(null);
      }
    };
    loadData();
  }, [productToEdit]);

  return (
    <>
      <h3 className="text-center defaultText text-2xl">
        {productToEdit ? (
          <>
            ویرایش محصول:
            <span className="text-sky-400">{productToEdit.title}</span>
          </>
        ) : (
          "افزودن عنوان جدید"
        )}
      </h3>
      <div className="text-end pl-4">
        <PrevPageBtn />
      </div>
      <Formik
        initialValues={reInitialValues || initialValues}
        onSubmit={(values, actions) =>
          onSubmit(values, actions, navigate, productToEdit)
        }
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formik) => (
          <div className="w-full flex justify-center">
            <Form>
              <FormikControl
                control="select"
                options={parentCategories}
                name="parentCategories"
                label="دسته والد"
                firstItem="دسته مورد نظر را انتخواب کنید"
                handleOnChange={handleSetMainCategories}
              />

              {mainCategories === "waiting" ? <TableLoading /> : null}
              <FormikControl
                control="searchableSelect"
                name="category_ids"
                options={
                  typeof mainCategories == "object" ? mainCategories : []
                }
                label="دسته‌ها"
                resultType="string" // یا "array"
                firstItem="دسته مورد نظر را انتخاب کنید"
                initialItems={selectedCategories}
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
                initialItems={selectedColors}
              />

              <FormikControl
                control="searchableSelect"
                name="guarantee_ids"
                firstItem="گارانتی مورد نظر را انتخواب کنید"
                options={guarantees}
                label="گارانتی"
                initialItems={selectedGuarantees}
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

              {!productToEdit && (
                <FormikControl
                  control="file"
                  name="image"
                  label="تصویر"
                  placeholder="تصویر"
                />
              )}

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
