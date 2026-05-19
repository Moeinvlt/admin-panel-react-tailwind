import { useEffect, useState } from "react";
import { getCategoriesApi } from "../categoryApi";
import { Toasty } from "../../../utils/customToast";
import { useParams } from "react-router";

export const useParentsCategory = (initialValues = null) => {
  const [parents, setParents] = useState([]);
  const [reInitialValues, setReInitialValues] = useState(null);
  const params = useParams();

  const fetchParentsCategory = async () => {
    try {
      const res = await getCategoriesApi();
      if (res.status === 200) {
        const allParents = res.data.data;
        setParents(
          allParents.map((p) => {
            return { id: p.id, value: p.title };
          })
        );
      }
    } catch (err) {
      const msg = err.message || "خطای شبکه یا سرور";
      Toasty(msg, "error");
    }
  };

  const handleGetInitialValues = () => {
    if (params.categoryId) {
      setReInitialValues({
        ...initialValues,
        parent_id: params.categoryId,
      });
    } else {
      setReInitialValues(null);
    }
  };

  useEffect(() => {
    handleGetInitialValues();
  }, [params.categoryId]);

  useEffect(() => {
    fetchParentsCategory();
  }, []);

  return { parents, reInitialValues ,setReInitialValues };
};
