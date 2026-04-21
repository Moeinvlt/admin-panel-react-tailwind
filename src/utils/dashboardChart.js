import Chart from "chart.js/auto";

export const setDashboardChart = (canvasElement, labels, datapoints) => {
  if (!canvasElement) return null;

  // اگر چارت قبلی روی این المنت وجود داره، پاکش کن
  const existingChart = Chart.getChart(canvasElement);
  if (existingChart) {
    existingChart.destroy();
  }

  const data = {
    labels,
    datasets: [
      {
        label: "فروش ماه",
        data: datapoints,
        borderColor: "#0062ff",
        backgroundColor: "rgba(0,98,255,0.1)",
        fill: true,
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
    ],
  };

  const config = {
    type: "line",
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "نمودار فروش یک سال گذشته",
        },
      },
      interaction: { intersect: false },
      scales: {
        x: { display: true, title: { display: true, text: "زمان" } },
        y: { display: true, title: { display: true, text: "میلیون تومان" } },
      },
    },
  };

  // ساخت چارت جدید
  const chartInstance = new Chart(canvasElement, config);
  return chartInstance;
};
