import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  ChartBar,
  ChevronRight,
  CircleCheck,
  FileCheck,
  Loader,
  ShieldCheck,
  User,
  Users
} from 'lucide-react';

import { getUsers } from '../../services/authService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<{ name: string; value: string; icon: JSX.Element; change: string; }[]>([]);
  const [recentActivity, setRecentActivity] = useState<{ id: number; user: string; action: string; time: string; type: "worker" | "employer"; }[]>([]);

  // Real-time stats
  const calculateStats = () => {
    const users = getUsers();
    const workers = users.filter(u => u.type === 'worker');
    const employers = users.filter(u => u.type === 'employer');

    return [
      { name: 'Total Workers', value: workers.length.toString(), icon: <Users className="h-6 w-6 text-blue-500" />, change: '+0%' },
      { name: 'Total Employers', value: employers.length.toString(), icon: <User className="h-6 w-6 text-indigo-500" />, change: '+0%' },
      { name: 'Jobs Completed', value: '0', icon: <CircleCheck className="h-6 w-6 text-green-500" />, change: '+0%' },
      { name: 'Pending Verifications', value: '0', icon: <ShieldCheck className="h-6 w-6 text-orange-500" />, change: '+0%' },
    ];
  };

  // Generate recent activity from real users
  const generateRecentActivity = () => {
    const users = getUsers();
    return users.map((user, index) => ({
      id: index + 1,
      user: user.name,
      action: 'registered on the platform',
      time: `on ${user.registeredDate}`,
      type: user.type || 'worker'
    })).slice(0, 5);
  };

  useEffect(() => {
    // Check if user is authenticated as admin
    const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }

    // Load real data
    const timer = setTimeout(() => {
      setStats(calculateStats());
      setRecentActivity(generateRecentActivity());
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                A
              </div>
              <span className="hidden md:inline font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.name}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div>{stat.icon}</div>
              </div>
              <div className={`mt-2 text-sm ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last month
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/admin/users" className="bg-white p-6 rounded-lg shadow-sm hover:shadow flex justify-between items-center">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">User Management</h3>
                <p className="text-sm text-gray-500">Manage workers and employers</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link to="/admin/verification" className="bg-white p-6 rounded-lg shadow-sm hover:shadow flex justify-between items-center">
            <div className="flex items-center">
              <FileCheck className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Worker Verification</h3>
                <p className="text-sm text-gray-500">Review and approve worker documents</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link to="/admin/reports" className="bg-white p-6 rounded-lg shadow-sm hover:shadow flex justify-between items-center">
            <div className="flex items-center">
              <ChartBar className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Reports & Analytics</h3>
                <p className="text-sm text-gray-500">Platform performance metrics</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-3 ${
                  activity.type === 'worker' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {activity.type === 'worker' ? 
                    <User className="h-5 w-5" /> : 
                    <Users className="h-5 w-5" />
                  }
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
