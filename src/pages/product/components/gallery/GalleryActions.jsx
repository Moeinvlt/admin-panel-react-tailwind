import { RiImageCircleAiFill } from "react-icons/ri";
import ActionBtn from "../../../../components/ActionBtn";
import { FaTrash } from "react-icons/fa";

const GalleryActions = ({ gallery, handleSetMainImage, handleDeleteImage }) => {
  return (
    <>
      {!gallery.is_main ? (
        <ActionBtn
          icon={<RiImageCircleAiFill />}
          color="green"
          iconColor="text-green-500"          bgColor="bg-green-500"
          onClick={() => handleSetMainImage(gallery.id)}
        />
      ) : null}
      <ActionBtn
        icon={<FaTrash />}
        iconColor="text-red-400"
        color="red"
        onClick={() => handleDeleteImage(gallery.id)}
      />
    </>
  );
};

export default GalleryActions;
