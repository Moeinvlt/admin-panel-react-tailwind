import { useState } from "react";
import FormErrorMessage from "./FormErrorMessage";

const MultiSelect = ({
  resultType,
  options,
  name,
  label,
  firstItem,
  handleOnChange,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelectItem = (selectedId, formik) => {
    setSelectedItems((oldData) => {
      if (
        oldData.findIndex((d) => (d.id == selectedId) == -1) &&
        selectedId > 0
      ) {
        const newData = [
          ...oldData,
          options.filter((c) => c.id == selectedId)[0],
        ];

        const selectedIds = newData.map((nd) => nd.id);
        const nameValue =
          resultType == "string" ? selectedIds.join("_") : selectedIds;
        formik.setFieldValue(name, nameValue);

        return newData;
      } else {
        return oldData;
      }
    });
  };

  const handleRemoveFormSelectCat = (selectedId, formik) => {
    setSelectedItems((oldData) => {
      let newData = oldData.filter((d) => d.id != selectedId);

      const selectedId = newData.map((nd) => nd.id);
      formik.setFieldValue("category_ids", selectedId.join("_"));

      return newData;
    });
  };

  return (
    <>
      {({ field, form }) => (
        <>
          <div className="customBox flex w-full max-w-130 mt-5">
            <label
              htmlFor={name}
              className="bg-sky-400/20 text-sky-400 w-27 flex items-center justify-center"
            >
              {label}
            </label>

            <Field name={name}>
              <select
                id={name}
                className="w-full defaultText p-2 outline-none appearance-none bg-inherit"
                {...field}
                onChange={(e) => handleSelectItem(e.target.value, form)}
              >
                <option value="">{firstItem}</option>
                {options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.value}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <ErrorMessage name={name} component={FormErrorMessage} />
          <div className="max-w-103 flex gap-2 flex-wrap mt-3">
            {selectedItems.map((selectedItem) => (
              <span
                className="bg-sky-400/30 dark:bg-sky-400/20 rounded-full dark:text-white text-black p-2 flex items-center gap-1"
                key={selectedItem.id}
              >
                <button
                  type="button"
                  className="text-red-500 cursor-pointer"
                  onClick={() =>
                    handleRemoveFormSelectCat(selectedItem.id, form)
                  }
                >
                  <HiX />
                </button>
                {selectedItem.value}
              </span>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MultiSelect;
