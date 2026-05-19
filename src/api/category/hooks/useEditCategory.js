import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleCategoryApi } from "../categoryApi";
import { Toasty } from "../../../utils/customToast";
import { CategoryContext } from "../../../context/CategoryContext";

export const useEditCategory = (initialValues) => {
  const [reInitialValues, setReInitialValues] = useState(null);
  const params = useParams();
  const { editId, setEditId } = useContext(CategoryContext);
  const [editCategory, setEditCategory] = useState();

  const handleGetSingleCategory = async () => {
    try {
      const res = await getSingleCategoryApi(editId);
      if (res.status === 200) {
        const oldCategory = res.data.data;
        setEditCategory(oldCategory);
      }
    } catch (error) {
      Toasty("متسفانه دسته مورد نظر دریافت نشد", "error");
    }
  };

  const handleGetInitialValues = () => {
    if (editCategory) {
      setReInitialValues({
        title: editCategory.title,
        descriptions: editCategory.descriptions,
        parent_id: editCategory.parent_id || "",
        is_active: editCategory.is_active ? true : false,
        show_in_menu: editCategory.show_in_menu ? true : false,
        image: null,
      });
    } else if (params.categoryId) {
      setReInitialValues({
        ...initialValues,
        parent_id: params.categoryId,
      });
    } else {
      setReInitialValues(null);
    }
  };

  useEffect(() => {
    editId ? handleGetSingleCategory() : setEditCategory(null);
  }, [editId]);

  useEffect(() => {
    handleGetInitialValues();
  }, [params.categoryId, editCategory]);

  return {reInitialValues, editId, setEditId, editCategory}
};
