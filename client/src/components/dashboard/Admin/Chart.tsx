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
} from "chart.js"; // Import necessary components from chart.js

// Register chart components
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
// Define types for course data and earnings
interface CourseData {
  courseName: string;
  earnings: number;
  studentCount: number;
}
interface EarningsData {
  _id: string; // The month (year-month)
  count: number; // The total earnings for the month
}

export const PieChart = () => {
  const [Data, setData] = useState<EarningsData[]>([]);
  useEffect(() => {
    // Fetch earnings data from an API or MongoDB server
    // Replace this URL with your actual data endpoint
    fetch("http://localhost:4000/api/v1/profile/get-total-student-instructor")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data); // Store the fetched data in state
      })
      .catch((error) => console.error("Error fetching earnings data:", error));
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

  return (
    <div className="w-96 h-96">
      <h2 className="text-xl font-bold text-indigo-400">
        Distribution between Student and Instructor
      </h2>
      <Pie data={chartData} />
    </div>
  );
};

type MostEnrolledCourses = {
  _id: string;
  courseName: string;
  totalStudents: number;
};

export const EarningsByCourse: React.FC = () => {
  const [earningsData, setEarningsData] = useState<MostEnrolledCourses[]>([]); // Type the state
  //   const [data, setData] = useState<MostEnrolledCourses[]>([]);
  useEffect(() => {
    // Fetch earnings data from an API or MongoDB server
    // Replace this URL with your actual data endpoint

    fetch("http://localhost:4000/api/v1/profile/get-most-enrolled-courses")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEarningsData(data); // Store the fetched data in state
      })
      .catch((error) => console.error("Error fetching earnings data:", error));
  }, []);

  // Prepare chart data
  const chartData = {
    labels: earningsData.map((course) => course.courseName), // Course names
    datasets: [
      {
        label: "No. of Students", // Label for the chart
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

  // Chart options (customize as needed)
  const chartOptions = {
    responsive: true,
    // maintainAspectRatio: false, // Prevents chart distortion
    indexAxis: "y", // Correct
    // Change to "x" for a vertical bar chart
    plugins: {
      title: {
        display: true,
        text: "No. of Students Enrolled in Course",
        font: { size: 18 }, // Larger title for clarity
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
        display: false, // Hides legend (optional)
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "No. of Students",
          font: { size: 14 },
        },
        ticks: {
          beginAtZero: true,
        },
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
    <div className="w-full  p-4">
      {earningsData.length > 0 ? (
        <div>
          <Bar
            data={chartData}
            options={chartOptions}
            width={800}
            height={500}
          />
        </div>
      ) : (
        <p className="text-center text-xl">Loading data...</p>
      )}
    </div>
  );
};
