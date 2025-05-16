import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Camera, CircleCheck, File, Loader, Upload, X, Shield } from 'lucide-react';
import { updateUserProfile, getCurrentUser } from '../services/authService';

const professions = [
  'Electrician', 'Plumber', 'Carpenter', 'Welder', 'Painter', 
  'Driver', 'Gardener', 'Mason', 'Construction Worker', 
  'Office Boy', 'Mechanic', 'Cook', 'Delivery Boy', 'Lift Technician'
];

const WorkerProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const certificateInputRef = useRef<HTMLInputElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    primaryDomain: '',
    workExperience: '',
    location: '',
    bio: '',
    hourlyRate: '',
  });
  
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [skillVideos, setSkillVideos] = useState<File[]>([]);
  const [certificates, setCertificates] = useState<File[]>([]);
  const [governmentId, setGovernmentId] = useState<File[]>([]);
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      setProfilePhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newVideos = Array.from(files);
    setSkillVideos([...skillVideos, ...newVideos]);
  };
  
  const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newCertificates = Array.from(files);
    setCertificates([...certificates, ...newCertificates]);
  };
  
  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newIds = Array.from(files);
    setGovernmentId([...governmentId, ...newIds]);
  };
  
  const removeVideo = (index: number) => {
    setSkillVideos(skillVideos.filter((_, i) => i !== index));
  };
  
  const removeCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };
  
  const removeId = (index: number) => {
    setGovernmentId(governmentId.filter((_, i) => i !== index));
  };
  
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
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
        profession: formData.primaryDomain,
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
  
  // Render different steps based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
            
            <div className="space-y-4">
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
                <label htmlFor="location" className="block text-gray-700 font-medium mb-1">Current Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-gray-700 font-medium mb-1">Bio / About Yourself</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Professional Information</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="primaryDomain" className="block text-gray-700 font-medium mb-1">Primary Domain</label>
                <select
                  id="primaryDomain"
                  name="primaryDomain"
                  value={formData.primaryDomain}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select your profession</option>
                  {professions.map((profession) => (
                    <option key={profession} value={profession}>{profession}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="workExperience" className="block text-gray-700 font-medium mb-1">Work Experience (years)</label>
                <input
                  type="number"
                  id="workExperience"
                  name="workExperience"
                  value={formData.workExperience}
                  onChange={handleInputChange}
                  min="0"
                  max="50"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="hourlyRate" className="block text-gray-700 font-medium mb-1">Hourly Rate (₹)</label>
                <input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Upload Media</h3>
            
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
                      <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
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
              
              {/* Skill Videos */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Skill Demonstration Videos</label>
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Videos
                  </button>
                  <input
                    type="file"
                    ref={videoInputRef}
                    onChange={handleVideoUpload}
                    accept="video/*"
                    multiple
                    className="hidden"
                  />
                  
                  {skillVideos.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {skillVideos.map((video, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                          <div className="flex items-center">
                            <ImageIcon className="h-5 w-5 text-blue-500 mr-2" />
                            <span className="text-sm">{video.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeVideo(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Verification Documents</h3>
            
            <div className="space-y-6">
              {/* Certificates */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Skill Certifications (PDF/Image)</label>
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={() => certificateInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <File className="mr-2 h-5 w-5" />
                    Upload Certificates
                  </button>
                  <input
                    type="file"
                    ref={certificateInputRef}
                    onChange={handleCertificateUpload}
                    accept=".pdf,image/*"
                    multiple
                    className="hidden"
                  />
                  
                  {certificates.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {certificates.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                          <div className="flex items-center">
                            <File className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-sm">{cert.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeCertificate(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Government ID */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Government ID (Aadhaar, PAN, etc.)</label>
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={() => idInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Upload ID Documents
                  </button>
                  <input
                    type="file"
                    ref={idInputRef}
                    onChange={handleIdUpload}
                    accept=".pdf,image/*"
                    multiple
                    className="hidden"
                  />
                  
                  {governmentId.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {governmentId.map((id, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                          <div className="flex items-center">
                            <Shield className="h-5 w-5 text-purple-500 mr-2" />
                            <span className="text-sm">{id.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeId(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 text-sm rounded-md">
                  <p className="text-blue-700">
                    <strong>Note:</strong> Your documents are securely stored and only used for verification purposes. They will not be visible to others on the platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 py-4 px-6">
            <h2 className="text-2xl font-bold text-white">Worker Profile</h2>
            <p className="text-blue-100 mt-1">Complete your profile to start getting job opportunities</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                {[...Array(totalSteps)].map((_, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                      ${index + 1 === currentStep
                        ? 'bg-blue-600 text-white'
                        : index + 1 < currentStep
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                  >
                    {index + 1 < currentStep ? <CircleCheck size={16} /> : index + 1}
                  </div>
                ))}
              </div>
              <div className="relative">
                <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
                <div 
                  className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Step content */}
            {renderStep()}
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                className={`px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 ${
                  currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentStep === 1}
              >
                Back
              </button>
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
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
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
