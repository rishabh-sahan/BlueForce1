import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Award, Briefcase, Check, MessageCircle, Shield, Users, X,
  Zap, Wrench, Hammer, Flame, PaintRoller, Car, Leaf, BrickWall, HardHat, Building2, Settings, ChefHat, Package
} from 'lucide-react';

// Map each domain to a blue Lucide icon
const domainIcons: Record<string, JSX.Element> = {
  Electrician: <Zap className="w-12 h-12 text-blue-400" />, // Lightning bolt
  Plumber: <Wrench className="w-12 h-12 text-blue-400" />, // Wrench
  Carpenter: <Hammer className="w-12 h-12 text-blue-400" />, // Hammer
  Welder: <Flame className="w-12 h-12 text-blue-400" />, // Flame
  Painter: <PaintRoller className="w-12 h-12 text-blue-400" />, // Paint roller
  Driver: <Car className="w-12 h-12 text-blue-400" />, // Car
  Gardner: <Leaf className="w-12 h-12 text-blue-400" />, // Leaf
  Mason: <BrickWall className="w-12 h-12 text-blue-400" />, // Brick wall
  'Construction worker': <HardHat className="w-12 h-12 text-blue-400" />, // Hard hat
  'Office boy': <Building2 className="w-12 h-12 text-blue-400" />, // Building
  Mechanic: <Settings className="w-12 h-12 text-blue-400" />, // Settings
  Cook: <ChefHat className="w-12 h-12 text-blue-400" />, // Chef hat
  'Delivery boy': <Package className="w-12 h-12 text-blue-400" />, // Package
  'Lift technician': <Building2 className="w-12 h-12 text-blue-400" />, // Substitute for Elevator
};

// Domain data with emojis/icons and services
const domains = [
  {
    name: 'Electrician',
    icon: domainIcons['Electrician'],
    services: [
      { title: 'Wiring and Rewiring', desc: 'Electrical wiring and rewiring for new installations, repairs, or upgrades.' },
      { title: 'Troubleshooting and Repair', desc: 'Identifying and fixing electrical issues like short circuits, loose connections, and power fluctuations.' },
      { title: 'Panel Upgrades', desc: 'Upgrading electrical panels to meet current standards and accommodate new electrical needs.' },
      { title: 'Appliance and Fixture Repair', desc: 'Repairing or replacing faulty outlets, switches, lights, and other electrical fixtures.' },
      { title: 'Generator Service', desc: 'Installation, maintenance, and repair of backup generators.' },
      { title: 'Decoration Lighting', desc: 'Setup and maintenance of decorative and event lighting.' },
      { title: 'AC/Refrigerator Repair', desc: 'Servicing and repairing air conditioners and refrigerators.' },
      { title: 'Motor Repair', desc: 'Repair and maintenance of electric motors.' },
    ]
  },
  {
    name: 'Plumber',
    icon: domainIcons['Plumber'],
    services: [
      { title: 'Pipe Installation', desc: 'Installing new water, gas, or drainage pipes.' },
      { title: 'Leak Repair', desc: 'Detecting and fixing leaks in pipes, faucets, and fixtures.' },
      { title: 'Bathroom Fitting', desc: 'Installing and repairing bathroom fixtures like sinks, toilets, and showers.' },
      { title: 'Water Heater Installation', desc: 'Installing and servicing water heaters and geysers.' },
      { title: 'Drainage Systems', desc: 'Unclogging and maintaining drainage and sewage systems.' },
    ]
  },
  {
    name: 'Carpenter',
    icon: domainIcons['Carpenter'],
    services: [
      { title: 'Furniture Assembly', desc: 'Assembling and installing furniture and cabinets.' },
      { title: 'Wood Repair', desc: 'Repairing damaged woodwork and furniture.' },
      { title: 'Cabinet Installation', desc: 'Custom and modular cabinet installation.' },
      { title: 'Door/Window Fitting', desc: 'Fitting and repairing doors and windows.' },
      { title: 'Custom Furniture', desc: 'Designing and building custom furniture pieces.' },
    ]
  },
  {
    name: 'Welder',
    icon: domainIcons['Welder'],
    services: [
      { title: 'Metal Fabrication', desc: 'Fabricating and assembling metal structures.' },
      { title: 'Gate/Grill Work', desc: 'Making and repairing gates, grills, and railings.' },
      { title: 'Steel Structure', desc: 'Construction and repair of steel frameworks.' },
      { title: 'Machine Repair', desc: 'Welding repairs for machines and equipment.' },
      { title: 'Welding Inspection', desc: 'Inspection and quality checks of welds.' },
    ]
  },
  {
    name: 'Painter',
    icon: domainIcons['Painter'],
    services: [
      { title: 'Interior Painting', desc: 'Painting walls, ceilings, and interiors.' },
      { title: 'Exterior Painting', desc: 'Painting building exteriors and facades.' },
      { title: 'Texture Painting', desc: 'Applying textured finishes to walls.' },
      { title: 'Wall Design', desc: 'Creating custom wall designs and murals.' },
      { title: 'Furniture Painting', desc: 'Painting and refinishing furniture.' },
    ]
  },
  {
    name: 'Driver',
    icon: domainIcons['Driver'],
    services: [
      { title: 'Personal Driver', desc: 'Driving for individuals and families.' },
      { title: 'Commercial Driver', desc: 'Driving commercial vehicles for businesses.' },
      { title: 'Delivery Driver', desc: 'Delivering goods and packages.' },
      { title: 'Heavy Vehicle Driver', desc: 'Operating trucks, buses, and heavy vehicles.' },
      { title: 'Event Driver', desc: 'Driving for events and special occasions.' },
    ]
  },
  {
    name: 'Gardner',
    icon: domainIcons['Gardner'],
    services: [
      { title: 'Garden Maintenance', desc: 'Regular maintenance of gardens and lawns.' },
      { title: 'Plant Care', desc: 'Planting, watering, and caring for plants.' },
      { title: 'Landscaping', desc: 'Designing and creating landscapes.' },
      { title: 'Lawn Management', desc: 'Mowing, fertilizing, and managing lawns.' },
      { title: 'Tree Pruning', desc: 'Pruning and caring for trees and shrubs.' },
    ]
  },
  {
    name: 'Mason',
    icon: domainIcons['Mason'],
    services: [
      { title: 'Building Construction', desc: 'Constructing buildings and structures.' },
      { title: 'Wall Construction', desc: 'Building and repairing walls.' },
      { title: 'Tile Installation', desc: 'Installing floor and wall tiles.' },
      { title: 'Concrete Work', desc: 'Mixing and pouring concrete for various needs.' },
      { title: 'Renovation', desc: 'Renovating and remodeling spaces.' },
    ]
  },
  {
    name: 'Construction worker',
    icon: domainIcons['Construction worker'],
    services: [
      { title: 'Site Preparation', desc: 'Preparing construction sites for work.' },
      { title: 'Material Handling', desc: 'Handling and moving construction materials.' },
      { title: 'Scaffolding', desc: 'Erecting and dismantling scaffolding.' },
      { title: 'Concrete Mixing', desc: 'Mixing and pouring concrete.' },
      { title: 'Demolition', desc: 'Demolishing old structures safely.' },
    ]
  },
  {
    name: 'Office boy',
    icon: domainIcons['Office boy'],
    services: [
      { title: 'Document Delivery', desc: 'Delivering documents within and outside the office.' },
      { title: 'Office Maintenance', desc: 'Maintaining cleanliness and order in the office.' },
      { title: 'Pantry Management', desc: 'Managing pantry supplies and refreshments.' },
      { title: 'Mail Handling', desc: 'Handling incoming and outgoing mail.' },
      { title: 'Basic Errands', desc: 'Running basic errands for office staff.' },
    ]
  },
  {
    name: 'Mechanic',
    icon: domainIcons['Mechanic'],
    services: [
      { title: 'Engine Repair', desc: 'Repairing and servicing vehicle engines.' },
      { title: 'Brake Service', desc: 'Servicing and repairing brakes.' },
      { title: 'Oil Change', desc: 'Changing engine oil and filters.' },
      { title: 'Transmission Repair', desc: 'Repairing and maintaining transmissions.' },
      { title: 'Vehicle Inspection', desc: 'Inspecting vehicles for issues and safety.' },
    ]
  },
  {
    name: 'Cook',
    icon: domainIcons['Cook'],
    services: [
      { title: 'Meal Preparation', desc: 'Preparing meals as per requirements.' },
      { title: 'Menu Planning', desc: 'Planning menus for events or daily needs.' },
      { title: 'Food Safety', desc: 'Ensuring food safety and hygiene.' },
      { title: 'Inventory Management', desc: 'Managing kitchen inventory and supplies.' },
      { title: 'Catering', desc: 'Providing catering services for events.' },
    ]
  },
  {
    name: 'Delivery boy',
    icon: domainIcons['Delivery boy'],
    services: [
      { title: 'Parcel Delivery', desc: 'Delivering parcels and packages.' },
      { title: 'Route Planning', desc: 'Planning efficient delivery routes.' },
      { title: 'Customer Service', desc: 'Interacting with customers during deliveries.' },
      { title: 'Cash Handling', desc: 'Handling cash and payments.' },
      { title: 'Time Management', desc: 'Ensuring timely deliveries.' },
    ]
  },
  {
    name: 'Lift technician',
    icon: domainIcons['Lift technician'],
    services: [
      { title: 'Lift Installation', desc: 'Installing new lifts and elevators.' },
      { title: 'Maintenance', desc: 'Regular maintenance of lifts.' },
      { title: 'Troubleshooting', desc: 'Diagnosing and fixing lift issues.' },
      { title: 'Safety Checks', desc: 'Conducting safety inspections.' },
      { title: 'Modernization', desc: 'Upgrading old lifts to modern standards.' },
    ]
  },
];

type Domain = typeof domains[number];

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 40, scale: 0.98, transition: { duration: 0.2 } },
};

const serviceIcons: Record<string, string> = {
  'Wiring and Rewiring': '🔌',
  'Troubleshooting and Repair': '🛠️',
  'Panel Upgrades': '⚡',
  'Appliance and Fixture Repair': '💡',
  'Generator Service': '🔋',
  'Decoration Lighting': '🎇',
  'AC/Refrigerator Repair': '❄️',
  'Motor Repair': '🔩',
  'Pipe Installation': '🧰',
  'Leak Repair': '💧',
  'Bathroom Fitting': '🚿',
  'Water Heater Installation': '♨️',
  'Drainage Systems': '🌀',
  'Furniture Assembly': '🪑',
  'Wood Repair': '🪵',
  'Cabinet Installation': '🚪',
  'Door/Window Fitting': '🚪',
  'Custom Furniture': '🛋️',
  'Metal Fabrication': '🏗️',
  'Gate/Grill Work': '🚧',
  'Steel Structure': '🏢',
  'Machine Repair': '⚙️',
  'Welding Inspection': '🔍',
  'Interior Painting': '🖼️',
  'Exterior Painting': '🏠',
  'Texture Painting': '🎨',
  'Wall Design': '🖌️',
  'Furniture Painting': '🪑',
  'Personal Driver': '🚗',
  'Commercial Driver': '🚚',
  'Delivery Driver': '📦',
  'Heavy Vehicle Driver': '🚛',
  'Event Driver': '🎉',
  'Garden Maintenance': '🌳',
  'Plant Care': '🪴',
  'Landscaping': '🌲',
  'Lawn Management': '🌿',
  'Tree Pruning': '🌴',
  'Building Construction': '🏗️',
  'Wall Construction': '🧱',
  'Tile Installation': '🟦',
  'Concrete Work': '🪨',
  'Renovation': '🏚️',
  'Site Preparation': '🦺',
  'Material Handling': '📦',
  'Scaffolding': '🪜',
  'Concrete Mixing': '🧯',
  'Demolition': '💣',
  'Document Delivery': '📄',
  'Office Maintenance': '🧹',
  'Pantry Management': '🍽️',
  'Mail Handling': '✉️',
  'Basic Errands': '🏃',
  'Engine Repair': '🔧',
  'Brake Service': '🛑',
  'Oil Change': '🛢️',
  'Transmission Repair': '⚙️',
  'Vehicle Inspection': '🔎',
  'Meal Preparation': '🍲',
  'Menu Planning': '📋',
  'Food Safety': '🥗',
  'Inventory Management': '📦',
  'Catering': '🍽️',
  'Parcel Delivery': '📦',
  'Route Planning': '🗺️',
  'Customer Service': '🤝',
  'Cash Handling': '💵',
  'Time Management': '⏰',
  'Lift Installation': '🛗',
  'Maintenance': '🧰',
  'Troubleshooting': '🛠️',
  'Safety Checks': '✅',
  'Modernization': '🚀',
};

// Add a short description for each domain
const domainDescriptions: Record<string, string> = {
  Electrician: 'Expert electrical solutions for homes and businesses.',
  Plumber: 'Professional plumbing services for all your needs.',
  Carpenter: 'Custom woodwork and repairs for your space.',
  Welder: 'Metal fabrication and welding services.',
  Painter: 'Interior and exterior painting by professionals.',
  Driver: 'Reliable drivers for personal and commercial needs.',
  Gardner: 'Garden and landscape maintenance services.',
  Mason: 'Construction and masonry work for any project.',
  'Construction worker': 'Skilled labor for construction sites.',
  'Office boy': 'Office support and maintenance staff.',
  Mechanic: 'Vehicle repair and maintenance services.',
  Cook: 'Cooking and catering for homes and events.',
  'Delivery boy': 'Fast and safe delivery services.',
  'Lift technician': 'Lift and elevator installation and repair.',
};

const Services = () => {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our Services
            </motion.h1>
            <motion.p 
              className="text-xl mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Comprehensive solutions for blue-collar workers and employers
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Modern Domain Grid Section */}
      <section className="py-16 bg-gradient-to-b from-[#181c24] to-[#232733]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-2">Blue-Collar Service Domains</h2>
            <p className="text-lg text-gray-300">Browse workers by category and find the exact skill set you need.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {domains.map((domain) => (
              <div
                key={domain.name}
                className="bg-blue-50 rounded-2xl shadow p-8 flex flex-col h-full hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-center mb-6">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 text-3xl">
                    {domain.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{domain.name}</h3>
                  <p className="text-gray-600 text-base mb-4 min-h-[48px]">{domainDescriptions[domain.name] || ''}</p>
                </div>
                <button
                  onClick={() => setSelectedDomain(domain)}
                  className="mt-auto text-blue-600 font-medium flex items-center group hover:underline focus:outline-none"
                >
                  Learn More <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for domain services */}
      <AnimatePresence>
        {selectedDomain && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 p-0 relative overflow-y-auto max-h-[80vh]"
              initial={{ scale: 0.98, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-t-2xl bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">{selectedDomain.name} Services</h3>
                <button
                  className="text-gray-300 hover:text-white text-2xl"
                  onClick={() => setSelectedDomain(null)}
                  aria-label="Close"
                >
                  <X size={28} />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedDomain.services.map((service: { title: string; desc: string }, idx: number) => (
                    <div key={idx} className="bg-blue-50 rounded-2xl shadow p-6 flex flex-col h-full">
                      <div className="flex items-center justify-center mb-4">
                        <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 text-3xl">{serviceIcons[service.title] || '🔧'}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{service.title}</h4>
                        <p className="text-gray-600 text-base mb-4">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* For Workers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="text-blue-600 font-medium">For Workers</span>
            <h2 className="text-3xl font-bold mt-2">Find Your Next Opportunity</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              BlueForce helps skilled workers find consistent employment, build their professional reputation, and increase their earning potential.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Briefcase className="w-10 h-10 text-blue-600" />,
                title: "Job Matching",
                description: "Get matched with jobs that fit your skills, location, and availability."
              },
              {
                icon: <Shield className="w-10 h-10 text-blue-600" />,
                title: "Verified Profile",
                description: "Build trust with employers through our verification process."
              },
              {
                icon: <Award className="w-10 h-10 text-blue-600" />,
                title: "Skill Showcase",
                description: "Demonstrate your expertise through videos and certification uploads."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/register" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
              Register as a Worker
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* For Employers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="text-blue-600 font-medium">For Employers</span>
            <h2 className="text-3xl font-bold mt-2">Find Reliable Talent</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              BlueForce simplifies the process of finding, vetting, and hiring quality blue-collar workers for your projects and ongoing needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Users className="w-10 h-10 text-blue-600" />,
                title: "Talent Discovery",
                description: "Browse verified workers by skill, location, and ratings."
              },
              {
                icon: <MessageCircle className="w-10 h-10 text-blue-600" />,
                title: "Direct Communication",
                description: "Connect with potential hires through our in-app messaging system."
              },
              {
                icon: <Check className="w-10 h-10 text-blue-600" />,
                title: "Quality Assurance",
                description: "Review ratings, work history, and skill videos before hiring."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/register" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
              Register as an Employer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Join BlueForce today and discover a better way to connect with work opportunities.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="inline-block bg-white text-blue-700 hover:bg-blue-100 px-8 py-3 rounded-full font-medium text-lg"
              >
                Sign Up Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
