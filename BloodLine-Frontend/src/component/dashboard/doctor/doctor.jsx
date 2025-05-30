import React, { useEffect, useState } from "react";
import Navbar from "./DoctorNavbar";
import { getRegistrations } from "../../../services/RegistrationAPI";
import MedicineService from "../../../services/medicineService";
import DoctorDescriptionService from "../../../services/doctorDescriptionService";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid, ResponsiveContainer
} from "recharts";
import Footer from '../../Footer';
import '../../../docstyle/doctor.css';

const COLORS = ["#DC3545", "#FF6347", "#CD5C5C", "#A52A2A", "#8B0000", "#B22222"];

const DoctorDashboard = () => {
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

  const medicineCountByPatient = medicines.reduce((acc, med) => {
    const name = med.patient?.fullName || "Unknown";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(medicineCountByPatient).map(([name, count]) => ({
    name,
    count,
  }));

  const descCountByDate = doctorDescriptions.reduce((acc, desc) => {
    const date = desc.date?.slice(0, 10) || "Unknown";
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const lineData = Object.entries(descCountByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

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
    <div className="doctor-dashboard-page">
      <Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-main-title">Doctor Dashboard - Charts Overview</h1>

        <div className="charts-grid">

          <div className="chart-container-item">
            <h3 className="chart-section-title">User Roles Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container-item">
            <h3 className="chart-section-title">Medicines per Patient</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={80} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#DC3545" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container-item">
            <h3 className="chart-section-title">Doctor Descriptions Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#DC3545" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container-item">
            <h3 className="chart-section-title">Lab Reports Sent Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={labPieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {labPieData.map((entry, index) => (
                    <Cell key={`cell-lab-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;