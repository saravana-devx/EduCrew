import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  TooltipItem,
  ChartOptions,
} from "chart.js";
import { ProfileAPI } from "../../../api/auth/ProfileAPI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CourseData {
  courseName: string;
  earnings: number;
  studentCount: number;
}
interface EarningsData {
  _id: string; // The month (year-month)
  totalEarnings: number; // The total earnings for the month
}

export const EarningsByMonthChart: React.FC = () => {
  const [earningsData, setEarningsData] = useState<EarningsData[]>([]); // Store earnings data

  useEffect(() => {
    async function getEarningsByMonth() {
      const earnings = await ProfileAPI.getEarningsByMonth();
      setEarningsData(earnings.data);
    }
    getEarningsByMonth();
  }, []);

  const chartData = {
    labels: earningsData.map((item) => item._id), // Months as labels ("2024-01")
    datasets: [
      {
        label: "Total Earnings ($)",
        data: earningsData.map((item) => item.totalEarnings),
        fill: false,
        backgroundColor: "rgb(159, 168, 218)",
        borderColor: "rgb(159, 168, 218)",
        borderWidth: 2,
        tension: 0.4, // Smooth line curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Earnings by Month",
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"line">) => {
            const value = tooltipItem.raw as number;
            return `$${value.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Earnings ($)",
        },
        beginAtZero: true, // Start Y-axis from 0
      },
    },
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      {earningsData.length > 0 ? (
        <Line
          data={chartData}
          options={chartOptions}
          className="w-full max-w-3xl h-96 lg:h-auto"
        />
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-[300px] sm:h-[400px] md:h-[500px]">
          <p className="font-bold text-lg sm:text-xl md:text-2xl mb-6">
            Loading data...
          </p>
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}
    </div>
  );
};

export const EarningsByCourse: React.FC = () => {
  const [earningsData, setEarningsData] = useState<CourseData[]>([]);

  useEffect(() => {
    async function getEarningsByCourse() {
      const earnings = await ProfileAPI.getEarningByCourse();
      setEarningsData(earnings.data);
    }
    getEarningsByCourse();
  }, []);

  const chartData = {
    labels: earningsData.map((course) => course.courseName),
    datasets: [
      {
        label: "Earnings ($)",
        data: earningsData.map((course) => course.earnings),
        backgroundColor: [
          "rgba(173, 216, 230, 0.8)", // Light Blue
          "rgba(144, 238, 144, 0.8)", // Light Green
          "rgba(255, 182, 193, 0.8)", // Light Pink
          "rgba(255, 218, 185, 0.8)", // Peach Puff
          "rgba(221, 160, 221, 0.8)", // Plum
          "rgba(250, 250, 210, 0.8)", // Light Goldenrod Yellow
          "rgba(240, 230, 140, 0.8)", // Khaki
          "rgba(176, 224, 230, 0.8)", // Powder Blue
          "rgba(230, 230, 250, 0.8)", // Lavender
          "rgba(255, 250, 205, 0.8)", // Lemon Chiffon
        ], // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Bar border color
        borderWidth: 1, // Border width
      },
    ],
  };

  // Chart options (customize as needed)
  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    // maintainAspectRatio: true, // Prevents chart distortion
    indexAxis: "y", // Correct
    // Change to "x" for a vertical bar chart
    plugins: {
      title: {
        display: true,
        text: "Earnings by Course",
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"bar">) => {
            const value = tooltipItem.raw as number;
            return `$${value.toFixed(2)}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Earnings ($)",
          font: { size: 14 },
        },
        // ticks: {
        //   beginAtZero: true,
        // },
      },

      y: {
        title: {
          display: true,
          text: "Course Name",
          font: { size: 14 },
        },
        ticks: {
          autoSkip: false,
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      {earningsData.length > 0 ? (
        <div className="w-full max-w-3xl">
          <Bar data={chartData} options={chartOptions} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-[300px] sm:h-[400px] md:h-[500px]">
          <p className="font-bold text-lg sm:text-xl md:text-2xl mb-6">
            Earnings By Course
          </p>
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}
    </div>
  );
};
