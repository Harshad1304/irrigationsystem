import React from 'react';
import useMilitaryTimeConverter from '../../../hooks/useMilitaryTimeConverter ';

function ScheduleTable({ data }) {
    console.log(data);
const {convertedTime} = useMilitaryTimeConverter()
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-green-100 text-green-700';
            case 'In Progress':
                return 'bg-blue-100 text-blue-700';
            case 'Completed':
                return 'bg-orange-100 text-orange-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };
    // get current time in military format
    function getCurrentTimeString() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return hours + minutes + seconds;
      }

    //  To define our plot status depending on the current time if the time is before start and end time it will give us pending and if the time is after start and end time it will give us completed and if its between it will give us in progress 
      
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
    return (
        <div className="w-full">
            <div className=" rounded-lg shadow-sm border border-gray-200">
                {/* Table */}
                <div className="h-[calc(100vh-26rem)] rounded-2xl overflow-y-auto overflow-x-auto">
                    <table className="w-full">
                        <thead className='sticky top-0 z-10'>
                            <tr className="border-b border-gray-200 bg-gray-50">
                            
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Plot</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Start Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">End Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Run By</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data?.map((item, index) => (
                                <tr 
                                    key={item.index || index}
                                    className="hover:bg-gray-50 transition-colors duration-150"
                                >
                                    
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {item.plot}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {convertedTime(item.startTime)}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {convertedTime(item.endTime)}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {item.RunBy}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(getPlotStatus(item))}`}>
                                            {getPlotStatus(item)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

               
            </div>
        </div>
    );
}

export default ScheduleTable;