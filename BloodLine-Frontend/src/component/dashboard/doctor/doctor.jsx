import React, { useEffect, useState } from "react";
import Navbar from "./DoctorNavbar";
import { getRegistrations } from "../../../services/RegistrationAPI";
import MedicineService from "../../../services/medicineService";
import DoctorDescriptionService from "../../../services/doctorDescriptionService";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid } from "recharts";
import Footer from '../../Footer';

const doctor = () => {
  const [accounts, setAccounts] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [doctorDescriptions, setDoctorDescriptions] = useState([]);
  const [labReports, setLabReports] = useState([]);

  useEffect(() => {
    fetchAccounts();
    fetchMedicines();
    fetchDoctorDescriptions();
    fetchLabReports();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await getRegistrations();
      setAccounts(data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  const fetchMedicines = async () => {
    try {
      const response = await MedicineService.getAll();
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const fetchDoctorDescriptions = async () => {
    try {
      const response = await DoctorDescriptionService.getAll();
      setDoctorDescriptions(response.data);
    } catch (error) {
      console.error("Error fetching doctor descriptions:", error);
    }
  };

  const fetchLabReports = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/labreports/all");
      const data = await res.json();
      setLabReports(data);
    } catch (error) {
      console.error("Failed to fetch lab reports:", error);
    }
  };

  // Prepare data for Pie Chart (accounts by role)
  const roleCounts = accounts.reduce(
    (acc, user) => {
      if (user.role === "DOCTOR") acc.doctors++;
      else if (user.role === "NURSE") acc.nurses++;
      else if (user.role === "LABTECH") acc.labtechs++;
      return acc;
    },
    { doctors: 0, nurses: 0, labtechs: 0 }
  );

  const pieData = [
    { name: "Doctors", value: roleCounts.doctors },
    { name: "Nurses", value: roleCounts.nurses },
    { name: "Lab Techs", value: roleCounts.labtechs },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  // Prepare data for Bar Chart (medicines count per patient)
  // Group medicines by patient fullName, count medicines
  const medicineCountByPatient = medicines.reduce((acc, med) => {
    const name = med.patient?.fullName || "Unknown";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(medicineCountByPatient).map(([name, count]) => ({
    name,
    count,
  }));

  // Prepare data for Line Chart (Doctor descriptions over time)
  // Group descriptions by date (YYYY-MM-DD), count
  const descCountByDate = doctorDescriptions.reduce((acc, desc) => {
    const date = desc.date?.slice(0, 10) || "Unknown";
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Sort dates ascending
  const lineData = Object.entries(descCountByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Prepare data for Lab Reports Pie (Sent to Lab vs Not)
  const labSentCount = labReports.reduce(
    (acc, report) => {
      if (report.sentToLab) acc.sent++;
      else acc.notSent++;
      return acc;
    },
    { sent: 0, notSent: 0 }
  );

  const labPieData = [
    { name: "Sent to Lab", value: labSentCount.sent },
    { name: "Not Sent", value: labSentCount.notSent },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h1>Admin Dashboard - Charts Overview</h1>

      <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
        {/* Pie Chart: Accounts by Role */}
        <div style={{ flex: "1 1 400px", textAlign: "center" }}>
          <h3>User Roles Distribution</h3>
          <PieChart width={350} height={300}>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Bar Chart: Medicines per Patient */}
        <div style={{ flex: "1 1 400px", textAlign: "center" }}>
          <h3>Medicines per Patient</h3>
          <BarChart width={400} height={300} data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={80} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Line Chart: Doctor Descriptions Over Time */}
        <div style={{ flex: "1 1 400px", textAlign: "center" }}>
          <h3>Doctor Descriptions Over Time</h3>
          <LineChart width={400} height={300} data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </div>

        {/* Pie Chart: Lab Reports Sent vs Not */}
        <div style={{ flex: "1 1 400px", textAlign: "center" }}>
          <h3>Lab Reports Sent Status</h3>
          <PieChart width={350} height={300}>
            <Pie data={labPieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
              {labPieData.map((entry, index) => (
                <Cell key={`cell-lab-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default doctor;
