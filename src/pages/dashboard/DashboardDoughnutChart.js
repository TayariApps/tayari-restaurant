import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export default function DashboardDoughnutChart({ types }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [bgcolors, setbgColors] = useState([]);

  const colorGenerator = (types = []) => {
    let r = () => (Math.random() * 256) >> 0;

    const colors = [];

    const getColorPair = () => {
      let color = (o) => `rgba(${r()}, ${r()}, ${r()}, ${o})`;

      return {
        bgColor: color(0.2),
        bdColor: color(1),
      };
    };

    types.forEach((i) => {
      colors.push(getColorPair());
    });

    return colors;
  };

  const colors = colorGenerator(types);
  const data = {
    labels: types.map((t) => t.name),
    datasets: [
      {
        label: "# of Food types",
        data: types.length > 0 ? types.map((t) => t.menus_count) : [],
        backgroundColor: types.length > 0 ? colors.map((i) => i.bgColor) : [],
        borderColor: types.length > 0 ? colors.map((i) => i.bdColor) : [],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card m-3" style={{ width: "100%", background: "white" }}>
      <div className="card-body">
        <Doughnut data={data} />
      </div>
    </div>
  );
}
