import React, { useEffect, useState } from "react";
import Navbar from "./LabNavbar";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer
} from "recharts";
import Footer from '../../Footer';
import '../../../labstyle/LabDashboard.css'; 


const COLORS = ["#DC3545", "#FF6347", "#CD5C5C", "#A52A2A", "#8B0000", "#B22222"];

const LabDashboard = () => {
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

  const processData = (data) => {

    const testTypeCounts = data.reduce((acc, report) => {
      acc[report.testType] = (acc[report.testType] || 0) + 1;
      return acc;
    }, {});

    const pieData = Object.entries(testTypeCounts).map(([key, value]) => ({
      name: key,
      value,
    }));

    setReportsByTestType(pieData);

    const dateCounts = data.reduce((acc, report) => {
      const date = report.reportDate ? report.reportDate.split("T")[0] : "Unknown";
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const lineData = Object.entries(dateCounts).map(([date, count]) => ({
      date,
      count,
    })).sort((a,b) => new Date(a.date) - new Date(b.date)); // Sort by date

    setReportsByDate(lineData);
  };

  return (
    <div className="lab-dashboard-page">
      <Navbar />
      <div className="dashboard-container">
        <h1 className="welcome-title">Welcome Lab Tech</h1>
        <p className="welcome-message">You have successfully logged in.</p>

        <section className="chart-section">
          <h2 className="chart-title">Reports by Test Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reportsByTestType}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              
                label
              >
                {reportsByTestType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </section>

        <section className="chart-section">
          <h2 className="chart-title">Reports Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={reportsByDate}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#DC3545" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default LabDashboard;