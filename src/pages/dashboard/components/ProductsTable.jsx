import { FaTrash } from "react-icons/fa";

const ProductsTable = () => {
  return (
    <div className="w-full">
      <div class="overflow-x-auto customBox">
        <h4 className="defaultText py-3 pr-4">محصولات رو به اتمام</h4>
        <table class="min-w-full text-sm">
          <thead class="">
            <tr>
              <th class="px-2 py-2.5 defaultText">#</th>
              <th class="px-2 py-2.5 defaultText">دسته</th>
              <th class="px-2 py-2.5 defaultText">عنوان</th>
              <th class="px-2 py-2.5 defaultText">وضعیت</th>
              <th class="px-2 py-2.5 defaultText">عکلیات</th>
            </tr>
          </thead>

          <tbody>
            <tr class="border-t border-border-light dark:border-border-dark">
              <td class="px-2 py-2.5 defaultText text-center">1</td>
              <td class="px-2 py-2.5 defaultText text-center">دسته شماره فلان</td>
              <td class="px-2 py-2.5 defaultText text-center">محصول فلان</td>
              <td class="px-2 py-2.5 defaultText text-center">پایان یافته</td>
              <td class="px-2 py-2.5 text-center"> <button type="button" className="text-red-400 cursor-pointer text-[16px]"><FaTrash /></button> </td>
            </tr>
            <tr class="border-t border-border-light dark:border-border-dark">
              <td class="px-2 py-2.5 defaultText text-center">1</td>
              <td class="px-2 py-2.5 defaultText text-center">دسته شماره فلان</td>
              <td class="px-2 py-2.5 defaultText text-center">محصول فلان</td>
              <td class="px-2 py-2.5 defaultText text-center">پایان یافته</td>
              <td class="px-2 py-2.5 text-center"> <button type="button" className="text-red-400 cursor-pointer text-[16px]"><FaTrash /></button> </td>
            </tr>
            <tr class="border-t border-border-light dark:border-border-dark">
              <td class="px-2 py-2.5 defaultText text-center">1</td>
              <td class="px-2 py-2.5 defaultText text-center">دسته شماره فلان</td>
              <td class="px-2 py-2.5 defaultText text-center">محصول فلان</td>
              <td class="px-2 py-2.5 defaultText text-center">پایان یافته</td>
              <td class="px-2 py-2.5 text-center"> <button type="button" className="text-red-400 cursor-pointer text-[16px]"><FaTrash /></button> </td>
            </tr>
            <tr class="border-t border-border-light dark:border-border-dark">
              <td class="px-2 py-2.5 defaultText text-center">1</td>
              <td class="px-2 py-2.5 defaultText text-center">دسته شماره فلان</td>
              <td class="px-2 py-2.5 defaultText text-center">محصول فلان</td>
              <td class="px-2 py-2.5 defaultText text-center">پایان یافته</td>
              <td class="px-2 py-2.5 text-center"> <button type="button" className="text-red-400 cursor-pointer text-[16px]"><FaTrash /></button> </td>
            </tr>
            <tr class="border-t border-border-light dark:border-border-dark">
              <td class="px-2 py-2.5 defaultText text-center">1</td>
              <td class="px-2 py-2.5 defaultText text-center">دسته شماره فلان</td>
              <td class="px-2 py-2.5 defaultText text-center">محصول فلان</td>
              <td class="px-2 py-2.5 defaultText text-center">پایان یافته</td>
              <td class="px-2 py-2.5 text-center"> <button type="button" className="text-red-400 cursor-pointer text-[16px]"><FaTrash /></button> </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
