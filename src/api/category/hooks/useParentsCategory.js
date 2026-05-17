import { useEffect, useState } from "react";
import { getCategoriesApi } from "../categoryApi";
import { Toasty } from "../../../utils/customToast";

export const useParentsCategory = () => {
  const [parents, setParents] = useState([]);

  const fetchParentsCategory = async () => {
    try {
      const res = await getCategoriesApi();
      if (res.status === 200) {
        const allParents = res.data.data;
        console.log(allParents);
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

  useEffect(() => {
    fetchParentsCategory();
  }, []);

  return { parents }
};
