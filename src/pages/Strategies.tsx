import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, FilterIcon } from 'lucide-react';
// Mock data for demonstration
const strategies = [{
  id: 'S001',
  lease_id: 'L003',
  lease_name: 'Bangalore Campus',
  strategy_type: 'Renewal',
  start_date: '2023-04-15',
  current_step: 7,
  total_steps: 17,
  status: 'In Progress',
  last_updated: '2023-06-10'
}, {
  id: 'S002',
  lease_id: 'L007',
  lease_name: 'Chennai Office',
  strategy_type: 'Downsizing',
  start_date: '2023-05-20',
  current_step: 4,
  total_steps: 19,
  status: 'In Progress',
  last_updated: '2023-06-12'
}, {
  id: 'S003',
  lease_id: 'L012',
  lease_name: 'Hyderabad Branch',
  strategy_type: 'Relocation',
  start_date: '2023-03-10',
  current_step: 9,
  total_steps: 21,
  status: 'In Progress',
  last_updated: '2023-06-08'
}, {
  id: 'S004',
  lease_id: 'L009',
  lease_name: 'Pune Office',
  strategy_type: 'Renewal',
  start_date: '2023-02-15',
  current_step: 17,
  total_steps: 17,
  status: 'Completed',
  last_updated: '2023-05-30'
}, {
  id: 'S005',
  lease_id: 'L015',
  lease_name: 'Kolkata Branch',
  strategy_type: 'Downsizing',
  start_date: '2023-01-05',
  current_step: 0,
  total_steps: 19,
  status: 'Cancelled',
  last_updated: '2023-02-10'
}];
const Strategies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const filteredStrategies = strategies.filter(strategy => strategy.lease_name.toLowerCase().includes(searchTerm.toLowerCase()) || strategy.strategy_type.toLowerCase().includes(searchTerm.toLowerCase()) || strategy.lease_id.toLowerCase().includes(searchTerm.toLowerCase()));
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStrategyTypeColor = (type: string) => {
    switch (type) {
      case 'Renewal':
        return 'bg-purple-100 text-purple-800';
      case 'Downsizing':
        return 'bg-orange-100 text-orange-800';
      case 'Relocation':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getProgressPercentage = (current: number, total: number) => {
    return Math.round(current / total * 100);
  };
  return <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Strategy Management
        </h1>
        <Link to="/strategies/add" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-transform duration-200 hover:scale-105">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Strategy
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Search strategies..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50" onClick={() => setShowFilters(!showFilters)}>
              <FilterIcon className="h-5 w-5 mr-2 text-gray-500" />
              Filters
            </button>
          </div>
          {showFilters && <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
              <select className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Strategy Types</option>
                <option value="Renewal">Renewal</option>
                <option value="Downsizing">Downsizing</option>
                <option value="Relocation">Relocation</option>
              </select>
              <select className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Statuses</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Sort By</option>
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="progress">Progress</option>
              </select>
            </div>}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Strategy ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lease
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStrategies.map(strategy => <tr key={strategy.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {strategy.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {strategy.lease_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {strategy.lease_id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStrategyTypeColor(strategy.strategy_type)}`}>
                      {strategy.strategy_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(strategy.start_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{
                      width: `${getProgressPercentage(strategy.current_step, strategy.total_steps)}%`
                    }}></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {strategy.current_step}/{strategy.total_steps}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(strategy.status)}`}>
                      {strategy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(strategy.last_updated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/strategies/edit/${strategy.id}`} className="text-blue-600 hover:text-blue-900">
                      View
                    </Link>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 sm:px-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{filteredStrategies.length}</span>{' '}
            strategies
          </div>
          <div className="flex-1 flex justify-end">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>;
};
export default Strategies;