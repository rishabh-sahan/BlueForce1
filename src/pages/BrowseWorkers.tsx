import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Filter, MapPin, Search, Star } from 'lucide-react';

// Mock data for workers
const mockWorkers = [
  {
    id: 1,
    name: 'Ravi Kumar',
    profession: 'Electrician',
    rating: 4.8,
    reviews: 24,
    hourlyRate: 350,
    location: 'Bangalore',
    distance: '3.2 km',
    availability: 'Immediate',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    verified: true,
  },
  {
    id: 2,
    name: 'Anand Singh',
    profession: 'Plumber',
    rating: 4.5,
    reviews: 18,
    hourlyRate: 300,
    location: 'Bangalore',
    distance: '4.7 km',
    availability: '1 Day',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    verified: true,
  },
  {
    id: 3,
    name: 'Priya Sharma',
    profession: 'Painter',
    rating: 4.9,
    reviews: 32,
    hourlyRate: 400,
    location: 'Bangalore',
    distance: '2.1 km',
    availability: 'Scheduled',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    verified: true,
  },
  {
    id: 4,
    name: 'Suresh Patel',
    profession: 'Carpenter',
    rating: 4.6,
    reviews: 15,
    hourlyRate: 450,
    location: 'Bangalore',
    distance: '5.3 km',
    availability: 'Immediate',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    verified: false,
  },
  {
    id: 5,
    name: 'Kavita Reddy',
    profession: 'Electrician',
    rating: 4.7,
    reviews: 27,
    hourlyRate: 380,
    location: 'Bangalore',
    distance: '1.8 km',
    availability: '1 Day',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    verified: true,
  },
  {
    id: 6,
    name: 'Rajesh Gupta',
    profession: 'Driver',
    rating: 4.4,
    reviews: 12,
    hourlyRate: 320,
    location: 'Bangalore',
    distance: '6.2 km',
    availability: 'Scheduled',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    verified: true,
  },
];

const BrowseWorkers = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    profession: '',
    availability: '',
    minRating: 0,
    maxPrice: 1000,
  });

  // Filter workers based on search and filters
  const filteredWorkers = mockWorkers.filter((worker) => {
    // Search filter
    if (
      searchTerm &&
      !worker.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !worker.profession.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Profession filter
    if (filters.profession && worker.profession !== filters.profession) {
      return false;
    }
    
    // Availability filter
    if (filters.availability && worker.availability !== filters.availability) {
      return false;
    }
    
    // Rating filter
    if (worker.rating < filters.minRating) {
      return false;
    }
    
    // Price filter
    if (worker.hourlyRate > filters.maxPrice) {
      return false;
    }
    
    return true;
  });

  const handleFilterChange = (name: string, value: string | number) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{t('header.browseWorkers')}</h1>
        
        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="relative flex-grow mb-4 md:mb-0 md:mr-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or profession..."
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
            >
              <Filter size={18} className="mr-2" />
              Filters
              <ChevronDown size={16} className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                <select
                  value={filters.profession}
                  onChange={(e) => handleFilterChange('profession', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Professions</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Painter">Painter</option>
                  <option value="Driver">Driver</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <select
                  value={filters.availability}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Availability</option>
                  <option value="Immediate">Immediate</option>
                  <option value="1 Day">1 Day</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                <select
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Price (₹/hr)</label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹100</span>
                  <span>₹{filters.maxPrice}</span>
                  <span>₹1000</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Workers Grid */}
        {filteredWorkers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-xl">No workers found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  profession: '',
                  availability: '',
                  minRating: 0,
                  maxPrice: 1000,
                });
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map((worker) => (
              <div key={worker.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <div className="flex">
                    <img
                      src={worker.image}
                      alt={worker.name}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold flex items-center">
                        {worker.name}
                        {worker.verified && (
                          <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                            Verified
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600">{worker.profession}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < Math.floor(worker.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">
                          {worker.rating} ({worker.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center text-gray-600">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{worker.distance}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        worker.availability === 'Immediate'
                          ? 'bg-green-100 text-green-800'
                          : worker.availability === '1 Day'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {worker.availability}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">₹{worker.hourlyRate}/hr</span>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseWorkers;
