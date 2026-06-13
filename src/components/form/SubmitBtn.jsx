import { FastField } from "formik";

const SubmitBtn = () => {
  return (
    <FastField>
      {({ form }) => {
        return (
          <div className="text-center py-4">
            <button
              type="submit"
              className="py-1.5 px-3 rounded-md bg-sky-400 text-white cursor-pointer"
              disabled={form.isSubmitting}
            >
              {form.isSubmitting ? "در حال ارسال..." : "ذخیره"}
            </button>
          </div>
        );
      }}
    </FastField>
  );
};

export default SubmitBtn;
