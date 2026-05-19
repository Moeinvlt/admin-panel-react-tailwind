import Swal from "sweetalert2";

export const Alert = async ({
  title,
  text,
  icon,
  showCancelButton = false,
  confirmButtonText = "تأیید",
  cancelButtonText = "انصراف",
  confirmButtonColor = "#2bb36f",
  cancelButtonColor = "#d33",
  customClass = undefined,
}) => {
  const finalCustomClass = customClass || { popup: "" };

  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    cancelButtonColor,
    customClass: finalCustomClass,
  });
  return result;
};