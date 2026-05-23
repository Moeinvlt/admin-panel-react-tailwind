import { useEffect, useState } from "react";

export const useEditCategoryAttrs = () => {
  const [attrToEdit, setAttrToEdit] = useState(null);
  const [reInitialValues, setReInitialValues] = useState(null);

  const handleEdit = () => {
    if (attrToEdit)
      setReInitialValues({
        title: attrToEdit.title,
        unit: attrToEdit.unit,
        in_filter: attrToEdit.in_filter ? true : false,
      });
    else setReInitialValues(null);
  };

  useEffect(() => {
    handleEdit();
  }, [attrToEdit]);

  return { attrToEdit, setAttrToEdit, reInitialValues, setReInitialValues, }
};
