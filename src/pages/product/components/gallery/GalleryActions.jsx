import { RiImageCircleAiFill } from "react-icons/ri";
import ActionBtn from "../../../../components/ActionBtn";
import { FaTrash } from "react-icons/fa";

const GalleryActions = ({ gallery, handleSetMainImage, handleDeleteImage }) => {
  return (
    <>
      {!gallery.is_main ? (
        <ActionBtn
          pTitle="default_product_image"
          icon={<RiImageCircleAiFill />}
          color="green"
          iconColor="text-green-500"
          bgColor="bg-green-500"
          onClick={() => handleSetMainImage(gallery.id)}
        />
      ) : null}
      <ActionBtn
        pTitle="delete_product_image"
        icon={<FaTrash />}
        iconColor="text-red-400"
        color="red"
        onClick={() => handleDeleteImage(gallery.id)}
      />
    </>
  );
};

export default GalleryActions;
