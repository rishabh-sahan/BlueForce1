import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminLayout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated as admin
    const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminSidebar />
      <div className="lg:pl-64">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
