import { RiImageCircleAiFill } from "react-icons/ri";
import ActionBtn from "../../../../components/ActionBtn";
import { FaTrash } from "react-icons/fa";

const GalleryActions = ({ gallery, handleSetMainImage, handleDeleteImage }) => {
  return (
    <>
      {!gallery.is_main ? (
        <ActionBtn
          icon={<RiImageCircleAiFill />}
          iconColor="text-green-500"
          bgColor="bg-green-500"
          title="انتخاب به عنوان اصلی"
          onClick={() => handleSetMainImage(gallery.id)}
        />
      ) : null}
      <ActionBtn
        icon={<FaTrash />}
        iconColor="text-red-400"
        bgColor="bg-red-500"
        title="حذف این تصویر"
        onClick={() => handleDeleteImage(gallery.id)}
      />
    </>
  );
};

export default GalleryActions;
