import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
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
  Legend
);

// Define types for course data and earnings
interface CourseData {
  courseName: string;
  earnings: number;
}
interface EarningsData {
  _id: string; // The month (year-month)
  totalEarnings: number; // The total earnings for the month
}

export const EarningsByMonthChart: React.FC = () => {
  const [earningsData, setEarningsData] = useState<EarningsData[]>([]); // Store earnings data

  // Fetch earnings data from the backend API
  useEffect(() => {
    fetch("http://localhost:4000/api/v1/course/api/get-earnings-by-month")
      .then((response) => response.json())
      .then((data) => {
        setEarningsData(data);
      })
      .catch((error) => {
        console.error("Error fetching earnings data:", error);
      });
  }, []);

  // Prepare the chart data
  const chartData = {
    labels: earningsData.map((item) => item._id), // Months as labels (e.g., "2024-01")
    datasets: [
      {
        label: "Total Earnings ($)", // Label for the dataset
        data: earningsData.map((item) => item.totalEarnings), // Earnings data
        fill: false, // Disable fill under the line
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Line color (backgroundColor is not needed for lines)
        borderColor: "rgba(75, 192, 192, 1)", // Line border color
        borderWidth: 2, // Line border width
        tension: 0.4, // Smooth line curve
      },
    ],
  };

  // Chart options (customize as needed)
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Earnings by Month",
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
    <div>
      <h2>Earnings by Month</h2>
      {earningsData.length > 0 ? (
        <Line data={chartData} options={chartOptions} /> // Render the line chart
      ) : (
        <p>Loading data...</p> // Show loading text while fetching data
      )}
    </div>
  );
};

export const EarningsByCourse: React.FC = () => {
  const [earningsData, setEarningsData] = useState<CourseData[]>([]); // Type the state

  useEffect(() => {
    // Fetch earnings data from an API or MongoDB server
    // Replace this URL with your actual data endpoint
    fetch("http://localhost:4000/api/v1/course/api/get-earnings-by-course")
      .then((response) => response.json())
      .then((data) => {
        setEarningsData(data); // Store the fetched data in state
      })
      .catch((error) => console.error("Error fetching earnings data:", error));
  }, []);

  // Prepare chart data
  const chartData = {
    labels: earningsData.map((course) => course.courseName), // Course names
    datasets: [
      {
        label: "Earnings ($)", // Label for the chart
        data: earningsData.map((course) => course.earnings), // Earnings values
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Bar border color
        borderWidth: 1, // Border width
      },
    ],
  };

  // Chart options (customize as needed)
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Earnings by Course",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"bar">) => `$${tooltipItem.raw}`, // Display earnings with a "$"
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Course Name",
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
    <div>
      <h2>Earnings by Course</h2>
      {earningsData.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};
