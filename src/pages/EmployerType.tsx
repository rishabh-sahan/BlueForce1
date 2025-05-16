import { useState } from 'react';
import { Building, User, Check } from 'lucide-react';

const EmployerType = () => {
  const [selectedType, setSelectedType] = useState<'company' | 'individual' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleTypeSelection = (type: 'company' | 'individual') => {
    setIsLoading(true);
    
    // Simulate API call to update user type
    setTimeout(() => {
      setSelectedType(type);
      setIsLoading(false);
      
      // Redirect based on type
      if (type === 'company') {
        window.location.href = '/employer-profile';
      } else {
        window.location.href = '/individual-profile';
      }
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 py-4 px-6">
            <h2 className="text-2xl font-bold text-white">Select Employer Type</h2>
            <p className="text-blue-100 mt-1">Choose how you want to use the platform</p>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-600">
                Please select whether you want to register as a company for mass hiring or as an individual for personal work.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => handleTypeSelection('company')}
                disabled={isLoading}
                className="w-full py-4 px-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-md flex items-center justify-between group"
              >
                <div className="flex items-center">
                  <Building className="mr-3" />
                  <span>As a Company (to hire in mass)</span>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white">
                  {selectedType === 'company' && <Check size={16} />}
                </div>
              </button>
              
              <button
                onClick={() => handleTypeSelection('individual')}
                disabled={isLoading}
                className="w-full py-4 px-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-md flex items-center justify-between group"
              >
                <div className="flex items-center">
                  <User className="mr-3" />
                  <span>For Individual Work</span>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white">
                  {selectedType === 'individual' && <Check size={16} />}
                </div>
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-sm">
                You can change your employer type later if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerType; 