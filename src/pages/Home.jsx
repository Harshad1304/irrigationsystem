import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTint, FaChartLine, FaCogs, FaCalendarAlt } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const handleViewSchedule = () => {
    navigate('/schedule');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Automated Irrigation Scheduling
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Optimize your farm's water usage with our smart irrigation system. 
              Create schedules, monitor progress, and maximize efficiency.
            </p>
            <button
              onClick={handleViewSchedule}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center"
            >
              <FaChartLine className="mr-2" />
              View Irrigation Schedule
            </button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Irrigation System" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="text-blue-600 mb-4">
                <FaCogs className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Scheduling</h3>
              <p className="text-gray-600">
                Create optimized irrigation schedules based on your farm's specific configuration.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="text-green-600 mb-4">
                <FaCalendarAlt className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">
                Track irrigation progress with live updates on plot status (Pending, In Progress, Done).
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="text-purple-600 mb-4">
                <FaTint className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Water Efficiency</h3>
              <p className="text-gray-600">
                Maximize water usage by optimizing motor parallelization and timing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;