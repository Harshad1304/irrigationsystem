import React, { useState } from 'react';
import { FaSearch, FaUndo, FaFilter, FaChevronDown } from 'react-icons/fa';

const FilterComponent = ({
  filtersConfig = [],
  onApplyFilters = (filters) => console.log('Applied filters:', filters)
}) => {
  const initialFilters = filtersConfig.reduce((acc, filter) => {
    acc[filter.name] = '';
    return acc;
  }, {});

  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onApplyFilters(initialFilters);
  };

  const renderFilterInput = (filter) => {
    switch (filter.type) {
      case 'select':
        return (
          <div className="relative">
            <select
              id={filter.name}
              name={filter.name}
              value={filters[filter.name]}
              onChange={handleFilterChange}
              className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 shadow-sm"
            >
              <option value="">All {filter.label}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        );
      default:
        return (
          <div className="relative">
            <input
              type="text"
              id={filter.name}
              name={filter.name}
              value={filters[filter.name]}
              onChange={handleFilterChange}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pl-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 shadow-sm"
              placeholder={`Search ${filter.label.toLowerCase()}...`}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        );
    }
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="w-full bg-white p-4 rounded-2xl">
      {/* Filter Controls */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-6">
          {filtersConfig.map((filter) => (
            <div key={filter.name} className="space-y-2">
              <label 
                htmlFor={filter.name} 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {filter.label}
              </label>
              {renderFilterInput(filter)}
            </div>
          ))}
           
             {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={handleApply}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <FaSearch className="w-4 h-4" />
            Apply Filters
          </button>
          
          <button
            onClick={handleReset}
            disabled={!hasActiveFilters}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-sm disabled:hover:transform-none transform hover:-translate-y-0.5"
          >
            <FaUndo className="w-4 h-4" />
            Reset
          </button>

          {hasActiveFilters && (
            <div className="ml-auto">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {Object.values(filters).filter(value => value !== '').length} active
              </span>
            </div>
          )}
        </div>
        </div>

      </div>
    </div>
  );
};
export default FilterComponent;
// Demo Component // this is for other developers to understand how to use this component

//   const demoFiltersConfig = [
//     {
//       label: "Status",
//       name: "status",
//       type: "select",
//       options: [
//         { label: "Pending", value: "pending" },
//         { label: "In Progress", value: "in_progress" },
//         { label: "Completed", value: "completed" }
//       ]
//     },
//     {
//       label: "Plot",
//       name: "plot",
//       type: "select",
//       options: [
//         { label: "Plot A", value: "plot_a" },
//         { label: "Plot B", value: "plot_b" },
//         { label: "Plot C", value: "plot_c" }
//       ]
//     },
//     {
//       label: "Project Name",
//       name: "project",
//       type: "text"
//     }
//   ];

//   const handleApplyFilters = (filters) => {
//     console.log('Filters applied:', filters);
//     // You can add your filter logic here
//   };

  