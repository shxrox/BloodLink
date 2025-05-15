import React, { useEffect, useState } from "react";
import Navbar from "./LabNavbar";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, CartesianGrid, XAxis, YAxis
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Nurse = () => {
  const [labReports, setLabReports] = useState([]);
  const [reportsByTestType, setReportsByTestType] = useState([]);
  const [reportsByDate, setReportsByDate] = useState([]);

  useEffect(() => {
    fetchLabReports();
  }, []);

  const fetchLabReports = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/labreports/all");
      setLabReports(res.data);
      processData(res.data);
    } catch (error) {
      console.error("Failed to fetch lab reports:", error);
    }
  };

  // Process data for charts
  const processData = (data) => {
    // Pie chart data: count reports by testType
    const testTypeCounts = data.reduce((acc, report) => {
      acc[report.testType] = (acc[report.testType] || 0) + 1;
      return acc;
    }, {});

    const pieData = Object.entries(testTypeCounts).map(([key, value]) => ({
      name: key,
      value,
    }));

    setReportsByTestType(pieData);

    // Line chart data: count reports by reportDate (format date string)
    const dateCounts = data.reduce((acc, report) => {
      const date = report.reportDate ? report.reportDate.split("T")[0] : "Unknown";
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const lineData = Object.entries(dateCounts).map(([date, count]) => ({
      date,
      count,
    })).sort((a,b) => new Date(a.date) - new Date(b.date));

    setReportsByDate(lineData);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>Welcome Lab Tech</h1>
        <p>You have successfully logged in.</p>

        <h2>Reports by Test Type</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={reportsByTestType}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {reportsByTestType.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        <h2>Reports Over Time</h2>
        <LineChart
          width={600}
          height={300}
          data={reportsByDate}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default Nurse;
