import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChartBar, FileCheck, House, LogOut, Menu, Settings, Users, X } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <House className="w-5 h-5" /> },
    { name: 'User Management', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Verification', path: '/admin/verification', icon: <FileCheck className="w-5 h-5" /> },
    { name: 'Reports', path: '/admin/reports', icon: <ChartBar className="w-5 h-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-600 hover:text-blue-600 focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-10 transition-all duration-300 ${
          isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0'
        } lg:w-64`}
      >
        <div className="p-5 h-full flex flex-col">
          <div className="flex items-center justify-center mb-8">
            <Link to="/admin/dashboard" className="text-2xl font-bold text-blue-700">
              BlueForce <span className="text-gray-600 text-sm">Admin</span>
            </Link>
          </div>

          <nav className="flex-grow">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg ${
                      location.pathname === item.path
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
