import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ chartData }) => {
  return (
    <div className="piechart mx-auto" style={{ width: "85%", height: "85%" }}>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Nutrients"
            }
          }
        }}
      />
    </div>
  );
};

export default PieChart;
