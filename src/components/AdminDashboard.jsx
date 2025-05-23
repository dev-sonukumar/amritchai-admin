// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error fetching dashboard:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card
          title="Total Products"
          value={stats.totalProducts}
          color="bg-blue-500"
        />
        <Card
          title="Total Orders"
          value={stats.totalOrders}
          color="bg-green-500"
        />
        <Card
          title="Total Users"
          value={stats.totalUsers}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`p-6 rounded-xl shadow-md text-white ${color}`}>
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-3xl mt-2">{value}</p>
  </div>
);

export default AdminDashboard;
