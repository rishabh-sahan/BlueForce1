import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile, WorkerProfile, EmployerProfile } from '../types/user';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Star, 
  Phone, 
  Mail, 
  Edit2,
  Clock,
  Users,
  Building,
  Award
} from 'lucide-react';

const UserProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'jobs' | 'bookings'>('profile');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setProfile(currentUser);
    }
  }, [currentUser]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderProfileSection = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={profile.profileImage || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
            />
            <button
              onClick={() => setIsEditing(true)}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <Edit2 size={16} />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-gray-600">{profile.email}</p>
            <div className="flex items-center mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Phone className="text-blue-600" size={20} />
            <span className="text-gray-700">{profile.phoneNumber}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="text-blue-600" size={20} />
            <span className="text-gray-700">{profile.email}</span>
          </div>
          {profile.role === 'worker' && (profile as WorkerProfile).skills && (
            <div className="flex items-start space-x-3">
              <Award className="text-blue-600 mt-1" size={20} />
              <div>
                <span className="text-gray-700 font-medium">Skills:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(profile as WorkerProfile).skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {profile.role === 'employer' && (profile as EmployerProfile).companyName && (
            <div className="flex items-center space-x-3">
              <Building className="text-blue-600" size={20} />
              <span className="text-gray-700">
                {(profile as EmployerProfile).companyName}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {profile.role === 'worker' && (
            <>
              <div className="flex items-center space-x-3">
                <Star className="text-blue-600" size={20} />
                <span className="text-gray-700">
                  Rating: {(profile as WorkerProfile).rating || 0}/5
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="text-blue-600" size={20} />
                <span className="text-gray-700">
                  Experience: {(profile as WorkerProfile).experience || 0} years
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-blue-600" size={20} />
                <span className="text-gray-700">
                  Completed Jobs: {(profile as WorkerProfile).completedJobs || 0}
                </span>
              </div>
            </>
          )}
          {profile.role === 'employer' && (
            <>
              <div className="flex items-center space-x-3">
                <Users className="text-blue-600" size={20} />
                <span className="text-gray-700">
                  Company Size: {(profile as EmployerProfile).companySize}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="text-blue-600" size={20} />
                <span className="text-gray-700">
                  Industry: {(profile as EmployerProfile).industry}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderJobsSection = () => {
    if (profile.role === 'worker') {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Available Jobs</h3>
          <div className="space-y-4">
            {/* Add job listings here */}
            <p className="text-gray-600">No jobs available at the moment.</p>
          </div>
        </div>
      );
    } else if (profile.role === 'employer') {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Posted Jobs</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4">
            Post New Job
          </button>
          <div className="space-y-4">
            {/* Add posted jobs here */}
            <p className="text-gray-600">No jobs posted yet.</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderBookingsSection = () => {
    if (profile.role === 'worker') {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">My Bookings</h3>
          <div className="space-y-4">
            {/* Add worker's bookings here */}
            <p className="text-gray-600">No bookings yet.</p>
          </div>
        </div>
      );
    } else if (profile.role === 'employer') {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Worker Bookings</h3>
          <div className="space-y-4">
            {/* Add employer's worker bookings here */}
            <p className="text-gray-600">No worker bookings yet.</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'jobs'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {profile.role === 'worker' ? 'Available Jobs' : 'Posted Jobs'}
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Bookings
            </button>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && renderProfileSection()}
            {activeTab === 'jobs' && renderJobsSection()}
            {activeTab === 'bookings' && renderBookingsSection()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage; 