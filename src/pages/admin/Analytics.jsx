import AnalyticsCards from "../../components/Admin/AnalyticsCards";
import SalesChart from "../../components/Admin/SalesChart";
import RevenueChart from "../../components/Admin/RevenueChart";
import CategoryChart from "../../components/Admin/CategoryChart";

function Analytics() {
  return (
    <div>

      <h2 className="mb-4">
        Analytics Dashboard
      </h2>

      <AnalyticsCards />

      <div className="row">

        <div className="col-lg-8 mb-4">
          <SalesChart />
        </div>

        <div className="col-lg-4 mb-4">
          <CategoryChart />
        </div>

      </div>

      <RevenueChart />

    </div>
  );
}

export default Analytics;