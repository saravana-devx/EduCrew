import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
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
  ArcElement,
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
  Legend,
  ArcElement
);
interface EarningsData {
  _id: string; // The month (year-month)
  count: number; // The total earnings for the month
}

export const PieChart = () => {
  const [Data, setData] = useState<EarningsData[]>([]);
  useEffect(() => {
    async function getTotalUsersByStatus() {
      const res = await ProfileAPI.getTotalUsersByStatus();
      setData(res.data);
    }
    getTotalUsersByStatus();
  }, []);
  const chartData = {
    labels: Data.map((data) => data._id),
    datasets: [
      {
        label: "Earnings",
        data: Data.map((data) => data.count),
        backgroundColor: [
          "rgba(48, 63, 159,0.8)", // Light Blue
          "rgba(100, 121, 255, 0.8)", // Light Green
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  //   });
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows manual height control
  };
  return (
    <div className="w-full flex justify-center items-center p-4">
      {Data.length > 0 ? (
        <Pie
          data={chartData}
          options={chartOptions}
          className="w-full max-w-[500px] h-[250px] sm:h-[300px] md:h-[350px]"
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

type MostEnrolledCourses = {
  _id: string;
  courseName: string;
  totalStudents: number;
};

export const EarningsByCourse: React.FC = () => {
  const [earningsData, setEarningsData] = useState<MostEnrolledCourses[]>([]);
  useEffect(() => {
    async function getMostEnrolledCourses() {
      const res = await ProfileAPI.getMostEnrolledCourses();
      setEarningsData(res.data);
    }
    getMostEnrolledCourses();
  }, []);

  const chartData = {
    labels: earningsData.map((course) => course.courseName), // Course names
    datasets: [
      {
        label: "No. of Students",
        data: earningsData.map((course) => course.totalStudents), // Earnings values
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

  const chartOptions: ChartOptions<"bar">  = {
    responsive: true,
    // maintainAspectRatio: false, // Prevents chart distortion
    indexAxis: "y", // Correct
    // Change to "x" for a vertical bar chart
    plugins: {
      title: {
        display: true,
        text: "No. of Students Enrolled in Course",
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"bar">) => {
            const value = tooltipItem.raw as number;
            return `${value}`;
          }, // Adds commas
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
          text: "No. of Students",
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
          autoSkip: false, // Show all labels
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      {earningsData.length > 0 ? (
        <div className="w-full max-w-3xl">
          <Bar
            data={chartData}
            options={chartOptions}
            width={800}
            height={500}
          />
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
