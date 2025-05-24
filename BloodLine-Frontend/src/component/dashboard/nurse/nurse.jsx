import React, { useEffect, useState } from "react";
import Navbar from "../nurse/NurseNavbar";
import Footer from '../../Footer';
import "../../../style/NurseHome.css";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
} from 'recharts';

const COLORS = ['#B22222', '#8B0000'];

const Nurse = () => {
  const [patientQueue, setPatientQueue] = useState([]);
  const [labReports, setLabReports] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const savedQueue = JSON.parse(localStorage.getItem("patientQueue")) || [];
    setPatientQueue(savedQueue);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/labreports/all")
      .then(res => res.json())
      .then(data => setLabReports(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/registrations/all")
      .then(res => res.json())
      .then(data => setAccounts(data))
      .catch(console.error);
  }, []);

  const waitingCount = patientQueue.length;

  const sentCount = labReports.filter(r => r.sentToLab).length;
  const notSentCount = labReports.length - sentCount;
  const labReportsPieData = [
    { name: "Sent to Lab", value: sentCount },
    { name: "Not Sent", value: notSentCount },
  ];

  const reportsByDateMap = {};
  labReports.forEach(report => {
    const date = report.reportDate || "Unknown";
    reportsByDateMap[date] = (reportsByDateMap[date] || 0) + 1;
  });

  const labReportsLineData = Object.entries(reportsByDateMap)
    .map(([date, count]) => ({ date, reports: count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const roleCounts = accounts.reduce(
    (acc, user) => {
      const role = user.role?.toLowerCase();
      if (role === "doctor") acc.doctors++;
      else if (role === "nurse") acc.nurses++;
      else if (role === "labtech") acc.labtechs++;
      return acc;
    },
    { doctors: 0, nurses: 0, labtechs: 0 }
  );

  const accountSummaryData = [
    { role: "Doctors", count: roleCounts.doctors },
    { role: "Nurses", count: roleCounts.nurses },
    { role: "Lab Techs", count: roleCounts.labtechs },
  ];

  return (
    <div>
      <Navbar />
      <div className="nurse-dashboard">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Welcome Nurse</h1>
        </header>

        <section className="patient-queue-section">
          <h2 className="section-title">Patient Queue (Current Waiting)</h2>
          <p className="patient-count">
            Number of patients waiting: <strong>{waitingCount}</strong>
          </p>
        </section>

        <section className="labreports-pie-section">
          <h2 className="section-title">Lab Reports Sent to Lab vs Not Sent</h2>
          <div className="chart-container pie-chart">
            <ResponsiveContainer width="50%" height={300}>
              <PieChart>
                <Pie
                  data={labReportsPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {labReportsPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="labreports-line-section">
          <h2 className="section-title">Lab Reports Over Time</h2>
          <div className="chart-container line-chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={labReportsLineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reports" stroke="#8B0000" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="account-summary-section">
          <h2 className="section-title">Account Summary by Role</h2>
          <div className="chart-container bar-chart">
            <ResponsiveContainer width="50%" height={300}>
              <BarChart data={accountSummaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#B22222" name="Number of Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default Nurse;
