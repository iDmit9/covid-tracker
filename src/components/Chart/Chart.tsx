import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData, MainDataType, DailyDataType } from "../../api";

import styles from "./Chart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ChartPropsType = {
  data: MainDataType;
  country: string;
};

type BuiltDaylyDataType = {
  dateLabels: Array<string>;
  casesLine: Array<number>;
  deathsLine: Array<number>;
};

const Chart = ({
  data: { cases, recovered, deaths },
  country,
}: ChartPropsType) => {
  const [dailyData, setDailyData] = useState<BuiltDaylyDataType>({
    dateLabels: [],
    casesLine: [],
    deathsLine: [],
  });

  const buildDailyData = (data: DailyDataType) => {
    const dateLabels = [];
    const casesLine = [];
    const deathsLine = [];

    for (let date in data.cases) {
      dateLabels.push(date);
      casesLine.push(data.cases[date]);
      deathsLine.push(data.deaths[date]);
    }

    return { dateLabels, casesLine, deathsLine };
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const { data } = await fetchDailyData();
      const builtData = buildDailyData(data);
      setDailyData(builtData);
    };

    fetchAPI();
  }, []);

  const lineChart = !dailyData ? (
    <div className={styles.error}>Can't fetch daily data</div>
  ) : dailyData.dateLabels ? (
    <Line
      data={{
        labels: dailyData.dateLabels,
        datasets: [
          {
            data: dailyData.casesLine,
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.deathsLine,
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = cases ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [cases, recovered, deaths],
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `Current state in ${country}`,
          },
        },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {country !== "global" ? barChart : lineChart}
    </div>
  );
};

export default Chart;
