import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Briefcase, UserRound } from 'lucide-react';

const HowItWorks = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'worker' | 'employer'>('worker');

  const workerSteps = [
    {
      title: t('howItWorks.worker.step1'),
      description: 'Create a detailed profile with your personal information, skills, and experience.',
      icon: '📝',
    },
    {
      title: t('howItWorks.worker.step2'),
      description: 'Upload videos of your work, certificates, and other qualifications to stand out.',
      icon: '📤',
    },
    {
      title: t('howItWorks.worker.step3'),
      description: 'Complete KYC verification to build trust with potential employers.',
      icon: '✅',
    },
    {
      title: t('howItWorks.worker.step4'),
      description: 'Set your availability, receive job offers, and start earning.',
      icon: '💼',
    },
  ];

  const employerSteps = [
    {
      title: t('howItWorks.employer.step1'),
      description: 'Create detailed job posts specifying requirements, location, and payment terms.',
      icon: '📋',
    },
    {
      title: t('howItWorks.employer.step2'),
      description: 'Search for workers by location, skills, ratings, and availability.',
      icon: '🔍',
    },
    {
      title: t('howItWorks.employer.step3'),
      description: 'Connect with workers through our in-app chat and finalize hiring details.',
      icon: '💬',
    },
    {
      title: t('howItWorks.employer.step4'),
      description: 'Complete secure payments and provide reviews after job completion.',
      icon: '💰',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">{t('howItWorks.title')}</h1>
          
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full shadow-md p-1 flex">
              <button
                className={`flex items-center py-2 px-6 rounded-full transition-all ${
                  activeTab === 'worker' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('worker')}
              >
                <UserRound className="mr-2" size={20} />
                {t('howItWorks.workerTitle')}
              </button>
              <button
                className={`flex items-center py-2 px-6 rounded-full transition-all ${
                  activeTab === 'employer' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('employer')}
              >
                <Briefcase className="mr-2" size={20} />
                {t('howItWorks.employerTitle')}
              </button>
            </div>
          </div>
          
          {/* Steps */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {activeTab === 'worker' ? (
              <>
                <h2 className="text-2xl font-bold mb-8 text-center text-blue-700">{t('howItWorks.workerTitle')}</h2>
                <div className="space-y-12">
                  {workerSteps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0 mr-4">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          <span className="text-blue-600 mr-2">{index + 1}.</span> {step.title}
                        </h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-8 text-center text-blue-700">{t('howItWorks.employerTitle')}</h2>
                <div className="space-y-12">
                  {employerSteps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0 mr-4">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          <span className="text-blue-600 mr-2">{index + 1}.</span> {step.title}
                        </h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
