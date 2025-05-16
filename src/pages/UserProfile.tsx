import { useState } from 'react';
import { Briefcase, Check, UserRound } from 'lucide-react';

const UserProfile = () => {
  const [userType, setUserType] = useState<'worker' | 'employer' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleTypeSelection = (type: 'worker' | 'employer') => {
    setIsLoading(true);
    
    // Simulate API call to update user type
    setTimeout(() => {
      setUserType(type);
      setIsLoading(false);
      
      // Redirect based on type
      if (type === 'worker') {
        window.location.href = '/worker-profile';
      } else if (type === 'employer') {
        window.location.href = '/employer-type';
      }
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 py-4 px-6">
            <h2 className="text-2xl font-bold text-white">Complete Your Profile</h2>
            <p className="text-blue-100 mt-1">Select your account type to continue</p>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-600">
                To access all features of BlueForce, please select whether you want to use the platform as a worker looking for jobs or an employer looking to hire.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => handleTypeSelection('worker')}
                disabled={isLoading}
                className="w-full py-4 px-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-md flex items-center justify-between group"
              >
                <div className="flex items-center">
                  <UserRound className="mr-3" />
                  <span>Register as Worker</span>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white">
                  {userType === 'worker' && <Check size={16} />}
                </div>
              </button>
              
              <button
                onClick={() => handleTypeSelection('employer')}
                disabled={isLoading}
                className="w-full py-4 px-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-md flex items-center justify-between group"
              >
                <div className="flex items-center">
                  <Briefcase className="mr-3" />
                  <span>Register as Employer</span>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white">
                  {userType === 'employer' && <Check size={16} />}
                </div>
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-sm">
                You can change your account type later if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
