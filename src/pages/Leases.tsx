import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, FilterIcon } from 'lucide-react';
// Mock data for demonstration
const leases = [{
  id: 'L001',
  building_id: 'B001',
  lease_name: 'Mumbai Tech Hub',
  organization_name: 'TechCorp',
  landlord_name: 'ABC Properties',
  office_classification: 'Hub',
  lease_type: 'Traditional',
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  start_date: '2023-06-01',
  end_date: '2026-05-31',
  monthly_rent: 75000,
  seats_count: 250,
  status: 'Active',
  strategy_status: null
}, {
  id: 'L002',
  building_id: 'B002',
  lease_name: 'Delhi Co-working Space',
  organization_name: 'TechCorp',
  landlord_name: 'WeWork',
  office_classification: 'Spoke',
  lease_type: 'Co-working',
  city: 'Delhi',
  state: 'Delhi',
  country: 'India',
  start_date: '2023-05-15',
  end_date: '2024-05-14',
  monthly_rent: 45000,
  seats_count: 120,
  status: 'Active',
  strategy_status: null
}, {
  id: 'L003',
  building_id: 'B003',
  lease_name: 'Bangalore Campus',
  organization_name: 'TechCorp',
  landlord_name: 'Tech Park Ltd',
  office_classification: 'Hub',
  lease_type: 'Traditional',
  city: 'Bangalore',
  state: 'Karnataka',
  country: 'India',
  start_date: '2023-04-01',
  end_date: '2028-03-31',
  monthly_rent: 120000,
  seats_count: 420,
  status: 'Active',
  strategy_status: 'Renewal'
}, {
  id: 'L004',
  building_id: 'B004',
  lease_name: 'Singapore Office',
  organization_name: 'TechCorp',
  landlord_name: 'East Corp',
  office_classification: 'Spoke',
  lease_type: 'Traditional',
  city: 'Singapore',
  state: null,
  country: 'Singapore',
  start_date: '2023-03-15',
  end_date: '2023-12-31',
  monthly_rent: 85000,
  seats_count: 180,
  status: 'Expiring Soon',
  strategy_status: null
}, {
  id: 'L005',
  building_id: 'B005',
  lease_name: 'Tokyo Satellite Office',
  organization_name: 'TechCorp',
  landlord_name: 'Nippon Properties',
  office_classification: 'Satellite',
  lease_type: 'Co-working',
  city: 'Tokyo',
  state: null,
  country: 'Japan',
  start_date: '2023-02-01',
  end_date: '2024-01-31',
  monthly_rent: 35000,
  seats_count: 50,
  status: 'Active',
  strategy_status: null
}];
const Leases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const filteredLeases = leases.filter(lease => lease.lease_name.toLowerCase().includes(searchTerm.toLowerCase()) || lease.organization_name.toLowerCase().includes(searchTerm.toLowerCase()) || lease.landlord_name.toLowerCase().includes(searchTerm.toLowerCase()) || lease.city.toLowerCase().includes(searchTerm.toLowerCase()));
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expiring Soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStrategyStatusColor = (status: string | null) => {
    if (!status) return '';
    switch (status) {
      case 'Renewal':
        return 'bg-blue-100 text-blue-800';
      case 'Downsizing':
        return 'bg-orange-100 text-orange-800';
      case 'Relocation':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Lease Management</h1>
        <Link to="/leases/add" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-transform duration-200 hover:scale-105">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Lease
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Search leases..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50" onClick={() => setShowFilters(!showFilters)}>
              <FilterIcon className="h-5 w-5 mr-2 text-gray-500" />
              Filters
            </button>
          </div>
          {showFilters && <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
              <select className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Classifications</option>
                <option value="Hub">Hub</option>
                <option value="Spoke">Spoke</option>
                <option value="Satellite">Satellite</option>
              </select>
              <select className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Lease Types</option>
                <option value="Traditional">Traditional</option>
                <option value="Co-working">Co-working</option>
              </select>
              <select className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Countries</option>
                <option value="India">India</option>
                <option value="Singapore">Singapore</option>
                <option value="Japan">Japan</option>
              </select>
            </div>}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lease ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lease Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Landlord
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monthly Rent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Strategy
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeases.map(lease => <tr key={lease.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lease.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lease.lease_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lease.landlord_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lease.city}, {lease.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lease.end_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${lease.monthly_rent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lease.status)}`}>
                      {lease.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lease.strategy_status ? <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStrategyStatusColor(lease.strategy_status)}`}>
                        {lease.strategy_status}
                      </span> : <span className="text-xs text-gray-400">None</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/leases/edit/${lease.id}`} className="text-blue-600 hover:text-blue-900">
                      Edit
                    </Link>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 sm:px-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredLeases.length}</span>{' '}
            leases
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
export default Leases;