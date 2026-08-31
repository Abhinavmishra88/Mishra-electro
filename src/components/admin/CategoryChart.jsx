import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function CategoryChart() {
  const data = {
    labels: [
      "MCB",
      "Wire",
      "LED",
      "Fan",
    ],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#ffc107",
          "#dc3545",
        ],
      },
    ],
  };

  return (
    <div className="card p-3 shadow-sm">
      <h5>Category Sales</h5>

      <Pie data={data} />
    </div>
  );
}

export default CategoryChart;