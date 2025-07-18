import { useState } from "react";
import FilterComponent from "../../components/FilterComponent";
import IrrigationForm from "./components/IrrigationForm";
import SchedualTable from "./components/SchedualTable";


// Get current time in military format
function getCurrentTimeString() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return hours + minutes + seconds;
}

// Get plot status based on current time
function getPlotStatus(plot) {
  const currentTime = getCurrentTimeString();
  if (currentTime < plot.startTime) {
    return 'Pending';
  } else if (currentTime >= plot.startTime && currentTime <= plot.endTime) {
    return 'In Progress';
  } else {
    return 'Completed';
  }
}

function Schedule() {
  const [scheduleDataState, setScheduleData] = useState([]);
  const [filters, setFilters] = useState({});

  // Get unique plots
  const plots = [...new Set(scheduleDataState.map((item) => item.plot))];

  // Status filter options
  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' }
  ];

  // Filter configuration
  const filtersConfig = [
    {
      label: "Status",
      name: "status",
      type: "select",
      options: statusOptions
    },
    {
      label: "Plot",
      name: "plot",
      type: "select",
      options: plots.map((plot) => ({
        label: plot,
        value: plot
      }))
    }
  ];

  // Filter data based on selected filters
  const filteredData = scheduleDataState.filter(item => {
    const status = getPlotStatus(item);
    return (
      (!filters.plot || item.plot === filters.plot) &&
      (!filters.status || status.toLowerCase().replace(' ', '_') === filters.status)
    );
  });

  // Handle filter changes
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="grid grid-cols-12 min-h-screen  bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <div className="col-span-4">
        <IrrigationForm setScheduleData={setScheduleData} />
      </div>
      <div className="col-span-8 flex flex-col gap-2 p-6 ">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 rounded-2xl">
          <h2 className="text-2xl  font-semibold text-white flex items-center gap-3">
            Irrigation Schedule Table
          </h2>
                     </div>
            <FilterComponent  filtersConfig={filtersConfig} onApplyFilters={handleApplyFilters}/>
            <div className="overflow-y-auto">
            <SchedualTable data={filteredData} />
            </div>
           </div>
        </div>
    );
}

export default Schedule;
