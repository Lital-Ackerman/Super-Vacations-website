import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./Reports.css";
import { useSelector } from "react-redux";
import Vacation from "../../Model/vacation-model";

export default function Reports() {
  const vList: Vacation[] = useSelector((state: any) => state.vList);
  const vLabels: string[] = [];
  const fData: number[] = [];

  vList.forEach((v) => {
    if (v.followers && v.followers > 0) {
      fData.push(v.followers);
      vLabels.push(v.destination);
    }
  });


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  let options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Vacations Destination",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount of followers",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Vacations vs. Followers",
        font: {
          size: 40,
        },
      },
    },
  };

  let labels = vLabels;
  let data = {
    labels,
    datasets: [
      {
        label: "followers",
        data: fData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="reportsDiv">
      <div className="chartDiv">
      {vList.length== 0 && <h3>No Vacations to Display.... <i className="bi bi-emoji-frown"></i></h3>}
      {vList.length> 0 && <Bar options={options} data={data} />}
      </div>
    </div>
  );
}
