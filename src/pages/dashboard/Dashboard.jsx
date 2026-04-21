import Card from "./components/Card";
import { FaShoppingBasket } from "react-icons/fa";
import ProductsTable from "./components/ProductsTable";
import { useEffect, useRef } from "react";
import { setDashboardChart } from "../../utils/dashboardChart";

const Dashboard = () => {
  const numColors = [
    "text-[#589bff]",
    "text-[#af6ded]",
    "text-[#28d785]",
    "text-[#f171b1]",
  ];
  const iconColors = [
    "bg-[#589bff]",
    "bg-[#af6ded]",
    "bg-[#28d785]",
    "bg-[#f171b1]",
  ];

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // برای جلوگیری از دوبار ساخت چارت

  useEffect(() => {
    const labels = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    const datapoints = [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];

    // فقط وقتی چارت ساخته نشده باشه، بسازش
    if (chartRef.current && !chartInstanceRef.current) {
      chartInstanceRef.current = setDashboardChart(
        chartRef.current,
        labels,
        datapoints
      );
    }

    // پاک‌سازی هنگام خروج از کامپوننت
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full px-4">
      <div className="flex gap-6 w-full flex-wrap md:flex-nowrap">
        <Card
          title="سبد خرید امروز"
          icon={<FaShoppingBasket />}
          number="7"
          info="سبد های خرید مانده امروز"
          weekNum="13"
          monthNum="18"
          numberColor={numColors[0]}
          iconColor={iconColors[0]}
        />
        <Card
          title="سبد خرید امروز"
          icon={<FaShoppingBasket />}
          number="7"
          info="سبد های خرید مانده امروز"
          weekNum="13"
          monthNum="18"
          numberColor={numColors[1]}
          iconColor={iconColors[1]}
        />
        <Card
          title="سبد خرید امروز"
          icon={<FaShoppingBasket />}
          number="7"
          info="سبد های خرید مانده امروز"
          weekNum="13"
          monthNum="18"
          numberColor={numColors[2]}
          iconColor={iconColors[2]}
        />
        <Card
          title="سبد خرید امروز"
          icon={<FaShoppingBasket />}
          number="1500,00,00"
          info="سبد های خرید مانده امروز"
          weekNum="13"
          monthNum="18"
          numberColor={numColors[3]}
          iconColor={iconColors[3]}
        />
      </div>

      <div className="w-full flex flex-col xl:flex-row gap-6 mt-6 pb-4 md:pb-0">
        <ProductsTable />
        <div className="w-full h-full customBox flex-1/2">
          <canvas ref={chartRef} className="h-full w-full block"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
