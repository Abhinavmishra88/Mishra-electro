function RevenueChart() {
  return (
    <div className="card p-4 shadow-sm">

      <h5>Revenue Summary</h5>

      <table className="table mt-3">

        <tbody>

          <tr>
            <td>Total Revenue</td>
            <td>₹2,45,000</td>
          </tr>

          <tr>
            <td>This Month</td>
            <td>₹48,000</td>
          </tr>

          <tr>
            <td>Today's Revenue</td>
            <td>₹4,500</td>
          </tr>

          <tr>
            <td>Pending Payments</td>
            <td>₹15,000</td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default RevenueChart;