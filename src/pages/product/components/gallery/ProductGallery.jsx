import { useState } from "react";
import { useLocation } from "react-router";
import {
  addProductImageApi,
  deleteProductImageApi,
  setMainProductImageApi,
} from "../../../../api/products/productsAtrrsApi";
import { Toasty } from "../../../../utils/customToast";
import { Alert } from "../../../../utils/alerts";
import PrevPageBtn from "../../../../components/PrevPageBtn";
import { apiPath } from "../../../../api/httpService";
import TableLoading from "../../../../components/loading/TableLoading";
import { RiImageAddFill } from "react-icons/ri";
import ActionBtn from "../../../../components/ActionBtn";
import { RiImageCircleAiFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import GalleryActions from "./GalleryActions";

const ProductGallery = () => {
  const location = useLocation();
  const { selectedProduct } = location.state;
  const [gallery, setGallery] = useState(selectedProduct.gallery);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectImage = async (e) => {
    setError(null);
    const image = e.target.files[0];
    const formdata = new FormData();
    formdata.append("image", image);
    if (
      image.type != "image/png" &&
      image.type != "image/jpeg" &&
      image.type != "image/jpg"
    )
      return setError("لطفا فقط از فایل با فرمت jpg و یا png استفاده کنید");
    if (image.size > 512000)
      return setError("حجم تصویر نباید بیشتر از 500 کیلوبایت باشد");

    setLoading(true);
    const res = await addProductImageApi(selectedProduct.id, formdata);
    setLoading(false);
    if (res.status === 201) {
      Toasty(res.data.message, "success");
      setGallery((old) => [
        ...old,
        { id: res.data.data.id, is_main: 0, image: res.data.data.image },
      ]);
    }
  };

  const handleDeleteImage = async (imageId) => {
    const result = await Alert({
      title: "حذف دسته بندی",
      text: "آیا از حذف این تصویر اطمینان دارید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
    });
    if (result.isConfirmed) {
      setLoading(true);
      const res = await deleteProductImageApi(imageId);
      setLoading(false);
      if (res.status === 200) {
        Toasty(res.data.message, "success");
        setGallery((old) => old.filter((image) => image.id != imageId));
      }
    }
  };

  const handleSetMainImage = async (imageId) => {
    setLoading(true);
    const res = await setMainProductImageApi(imageId);
    setLoading(false);
    if (res.status === 200) {
      Toasty(res.data.message, "success");
      setGallery((old) => {
        let newGallery = old.map((img) => {
          return { ...img, is_main: 0 };
        });
        const index = newGallery.findIndex((i) => i.id == imageId);
        newGallery[index].is_main = 1;
        return newGallery;
      });
    }
  };

  return (
    <div className="">
      <h4 className="text-center my-3 text-2xl defaultText">
        {" "}
        مدیریت گالری تصاویر:{" "}
        <span className="text-sky-500">{selectedProduct.title}</span>{" "}
      </h4>
      <div className="text-left pl-6 my-3">
        <PrevPageBtn />
      </div>

      <div className="mx-4">
        <small className="defaultText">
          نکته: لطفا از تصاویر مربع(600×600) استفاده کنید با حد اکثر حجم 500
          کیلوبایت
        </small>
        {error ? <small className="">{error}</small> : null}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {gallery.length > 0
            ? gallery.map((g) => (
                <div
                  key={g.id}
                  className={`p-3 cursor-pointer hover:-translate-y-4 w-full md:max-w-60 md:max-h-60 flex justify-center items-center customBox relative overflow-hidden transition-all group ${g.is_main ? "border-2 border-green-400" : ""}`}
                  title={g.is_main ? "تصویر اصلی" : ""}
                >
                  <img src={apiPath + "/" + g.image} className="w-full" />
                  <div className="bg-gray-800/70 w-full h-full absolute flex justify-center items-center scale-0 group-hover:scale-100 transition-all duration-200">
                    <GalleryActions
                      gallery={g}
                      handleSetMainImage={handleSetMainImage}
                      handleDeleteImage={handleDeleteImage}
                    />
                  </div>
                </div>
              ))
            : null}

          <div
            className={`w-full h-60 md:w-60 md:h-60 customBox flex justify-center items-center relative my-1 ${loading ? "disabled:pointer-events-none" : ""}`}
            title="افزودن تصویر جدید"
          >
            {loading ? (
              <TableLoading />
            ) : (
              <RiImageAddFill className="text-sky-400 text-6xl" />
            )}
            <input
              type="file"
              name="image"
              className="w-full h-full opacity-0 absolute cursor-pointer"
              onChange={handleSelectImage}
              multiple={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
