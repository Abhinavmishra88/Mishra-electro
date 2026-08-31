import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function SalesChart() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
    ],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 15, 28, 35, 42, 38],
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="card p-3 shadow-sm">
      <h5>Monthly Sales</h5>

      <Line data={data} />
    </div>
  );
}

export default SalesChart;