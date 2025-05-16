import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Loader, MapPin, Shield } from 'lucide-react';
import { updateUserProfile, getCurrentUser } from '../services/authService';

const IndividualProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    location: '',
  });
  
  const [profilePhoto, setProfilePhoto] = useState<string | ArrayBuffer | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Get current user
      const currentUser = getCurrentUser();
      if (!currentUser) {
        throw new Error('User not logged in');
      }
      
      // Update user profile
      const updatedUser = updateUserProfile(currentUser.id, {
        name: formData.fullName,
        type: 'worker',
        location: formData.location,
        // In a real app, we would upload files to a storage service
        // and save the URLs to the user profile
      });
      
      if (!updatedUser) {
        throw new Error('Failed to update profile');
      }
      
      setTimeout(() => {
        setIsLoading(false);
        // Show success message and redirect
        alert('Profile submitted for verification! You will be notified once approved.');
        navigate('/');
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      alert('Error creating profile: ' + (error as Error).message);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 py-4 px-6">
            <h2 className="text-2xl font-bold text-white">Individual Profile</h2>
            <p className="text-blue-100 mt-1">Complete your profile to hire services on BlueForce</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Profile Photo */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Profile Photo</label>
                <div className="mt-1 flex items-center gap-5">
                  <div 
                    className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {profilePhoto ? (
                      <img src={profilePhoto as string} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Upload Photo
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="mobile" className="block text-gray-700 font-medium mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-gray-700 font-medium mb-1">Address / Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 text-sm rounded-md">
                <p className="text-blue-700 flex items-start">
                  <Shield className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Your profile will be reviewed by our admin team. Once verified, you will receive a trust badge, indicating that your identity has been verified.</span>
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
              <motion.button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin mr-2 h-5 w-5" />
                    Submitting...
                  </>
                ) : (
                  'Submit Profile'
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndividualProfile;
