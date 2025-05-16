import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import WorkerDashboard from '../pages/dashboard/WorkerDashboard';
import EmployerDashboard from '../pages/dashboard/EmployerDashboard';

const DashboardRoute: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Route to appropriate dashboard based on user's role
  switch (currentUser.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'worker':
      return <WorkerDashboard />;
    case 'employer':
      return <EmployerDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default DashboardRoute; 