import React, { useContext } from 'react';
import AuthContext from '../login/AuthContext';
import FarmerDashboard from '../components/Farmerdetails/FarmerDashboard';
import InvestorDashboard from '../components/Investordetails/InvestorDashboard';
import AdminDashboard from '../components/Admindetails/AdminD';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available. Please log in.</div>;
  }

  return (
    <div>
      {/* <h2>Welcome, {user.name}</h2> */}
      {user.role === 'farmer' && <FarmerDashboard />}
      {user.role === 'investor' && <InvestorDashboard />}
      {user.role === 'admin' && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
