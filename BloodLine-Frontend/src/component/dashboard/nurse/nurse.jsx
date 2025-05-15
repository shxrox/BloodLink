import React, { useEffect, useState } from "react";
import Navbar from "../nurse/NurseNavbar";
import Footer from '../../Footer';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
} from 'recharts';

const COLORS = ['#0088FE', '#FF8042'];

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
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h1>Welcome Nurse</h1>
      <p>You have successfully logged in.</p>

      <h2>Patient Queue (Current Waiting)</h2>
      <p>Number of patients waiting: <strong>{waitingCount}</strong></p>

      <h2>Lab Reports Sent to Lab vs Not Sent</h2>
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

      <h2>Lab Reports Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={labReportsLineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="reports" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <h2>Account Summary by Role</h2>
      <ResponsiveContainer width="50%" height={300}>
        <BarChart data={accountSummaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="role" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" name="Number of Users" />
        </BarChart>
      </ResponsiveContainer>
      <Footer/>
    </div>
  );
};

export default Nurse;
