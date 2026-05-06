import { useFormikContext } from "formik";
import { MdArrowBack } from "react-icons/md";

const AuthSubmitBtn = () => {
  const { isSubmitting } = useFormikContext();

  return (
    <div className="absolute bottom-0 translate-y-1/2  w-full right-0 flex justify-center">
      <button
        type="submit"
        className="flex items-center justify-center bg-[#e03f00] formBtnShadow text-white w-40 py-2 rounded-full cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          "در حال ورود..."
        ) : (
          <>
            <MdArrowBack /> ورود
          </>
        )}
      </button>
    </div>
  );
};

export default AuthSubmitBtn;
