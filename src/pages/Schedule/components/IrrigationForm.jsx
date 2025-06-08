import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaTint, FaClock, FaPlay, FaCog, FaSeedling, FaTools, FaWater, FaLeaf, FaRegClock } from 'react-icons/fa';

const IrrigationControlForm = ({setScheduleData}) => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      numberOfPlots: 4,
      parallelMotors: 2,
      startTime: '06:00',
      endTime: '19:00',
      motorRuntime: 5,
      cycleInterval: 20
    }
  });

  const numberOfPlots = watch('numberOfPlots');
  const parallelMotors = watch('parallelMotors');

  const onSubmit = (data) => {
    const { numberOfPlots, parallelMotors, startTime, endTime, motorRuntime, cycleInterval } = data;
    
    // Convert time strings to minutes
    const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
    const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
    
    const results = [];
    let currentMinutes = startMinutes;
    let index = 0;

    while (currentMinutes < endMinutes) {
      // Generate entries for each plot and motor combination
      for (let plot = 1; plot <= numberOfPlots; plot++) {
        for (let motor = 1; motor <= parallelMotors; motor++) {
          const entry = {
            index: index++,
            plot: `D${plot}`,
            startTime: padTime(currentMinutes),
            endTime: padTime(currentMinutes + motorRuntime - 1),
            RunBy: `M${motor}`
          };
          results.push(entry);
        }
      }
      
      // Move to next cycle
      currentMinutes += cycleInterval;
    }

    console.log('Generated Schedule:', results);
    setScheduleData(results);
    // You can now use the results array as needed
  };

  // Helper function to pad time to 6 digits
  const padTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}${String(mins).padStart(2, '0')}00`;
  };

  const generatePlotLabels = (count) => {
    return Array.from({ length: count }, (_, i) => `D${i + 1}`).join(', ');
  };

  const generateMotorLabels = (count) => {
    return Array.from({ length: count }, (_, i) => `M${i + 1}`).join(', ');
  };

  return (
    <div className=" p-6">
      <div className="">
        {/* Main Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
              <FaCog className="w-6 h-6" />
              System Configuration
            </h2>
          </div>

          <div className="p-8 space-y-8">
            {/* Grid Layout */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Plot Configuration */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FaSeedling className="text-green-500" />
                  Plot Configuration
                </h3>

                {/* Number of Plots */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Plots to Irrigate
                  </label>
                  <Controller
                    name="numberOfPlots"
                    control={control}
                    rules={{ required: 'Number of plots is required', min: { value: 1, message: 'Minimum 1 plot required' } }}
                    render={({ field }) => (
                      <div className="relative">
                        <input
                          {...field}
                          type="number"
                          min="1"
                          max="20"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter number of plots"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-400 text-sm">plots</span>
                        </div>
                      </div>
                    )}
                  />
                  {numberOfPlots > 0 && (
                    <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700">
                        <strong>Plots:</strong> {generatePlotLabels(numberOfPlots)}
                      </p>
                    </div>
                  )}
                  {errors.numberOfPlots && (
                    <p className="text-red-500 text-sm mt-1">{errors.numberOfPlots.message}</p>
                  )}
                </div>

                {/* Parallel Motors */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motors Running in Parallel
                  </label>
                  <Controller
                    name="parallelMotors"
                    control={control}
                    rules={{ 
                      required: 'Number of parallel motors is required',
                      min: { value: 1, message: 'Minimum 1 motor required' },
                      validate: (value) => value <= numberOfPlots || 'Cannot exceed number of plots'
                    }}
                    render={({ field }) => (
                      <div className="relative">
                        <input
                          {...field}
                          type="number"
                          min="1"
                          max={numberOfPlots}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter number of motors"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        </div>
                      </div>
                    )}
                  />
                  {parallelMotors > 0 && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700">
                        <strong>Motors:</strong> {generateMotorLabels(parallelMotors)}
                      </p>
                    </div>
                  )}
                  {errors.parallelMotors && (
                    <p className="text-red-500 text-sm mt-1">{errors.parallelMotors.message}</p>
                  )}
                </div>
              </div>

              {/* Timing Configuration */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FaRegClock className="text-blue-500" />
                  Timing Configuration
                </h3>

                {/* Start Time */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Irrigation Start Time
                  </label>
                  <Controller
                    name="startTime"
                    control={control}
                    rules={{ required: 'Start time is required' }}
                    render={({ field }) => (
                      <div className="relative">
                        <input
                          {...field}
                          type="time"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                        />
                      </div>
                    )}
                  />
                  {errors.startTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>
                  )}
                </div>

                {/* End Time */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Irrigation End Time
                  </label>
                  <Controller
                    name="endTime"
                    control={control}
                    rules={{ required: 'End time is required' }}
                    render={({ field }) => (
                      <div className="relative">
                        <input
                          {...field}
                          type="time"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                        />
                      </div>
                    )}
                  />
                  {errors.endTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.endTime.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Runtime Configuration */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FaTools className="text-purple-500" />
                Runtime Configuration
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Motor Runtime */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motor Runtime per Cycle
                  </label>
                  <Controller
                    name="motorRuntime"
                    control={control}
                    rules={{ 
                      required: 'Motor runtime is required',
                      min: { value: 1, message: 'Minimum 1 minute required' }
                    }}
                    render={({ field }) => (
                      <div className="relative">
                        <input
                          {...field}
                          type="number"
                          min="1"
                          max="60"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white"
                          placeholder="Enter runtime"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-400 text-sm">minutes</span>
                        </div>
                      </div>
                    )}
                  />
                  {errors.motorRuntime && (
                    <p className="text-red-500 text-sm mt-1">{errors.motorRuntime.message}</p>
                  )}
                </div>

                {/* Cycle Interval */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rest Time Between Cycles
                  </label>
                  <Controller
                    name="cycleInterval"
                    control={control}
                    rules={{ 
                      required: 'Cycle interval is required',
                      min: { value: 1, message: 'Minimum 1 minute required' }
                    }}
                    render={({ field }) => (
                      <div className="relative">
                        <input
                          {...field}
                          type="number"
                          min="1"
                          max="120"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white"
                          placeholder="Enter interval"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-400 text-sm">minutes</span>
                        </div>
                      </div>
                    )}
                  />
                  {errors.cycleInterval && (
                    <p className="text-red-500 text-sm mt-1">{errors.cycleInterval.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleSubmit(onSubmit)}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <FaPlay className="w-5 h-5 group-hover:animate-pulse" />
                Configure Irrigation System
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-700 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

   
      </div>
    </div>
  );
};

export default IrrigationControlForm;