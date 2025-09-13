import React, { useState } from 'react';
import { SearchIcon, FilterIcon, BellIcon, CalendarIcon, ClockIcon } from 'lucide-react';
// Mock data for reminders
const reminders = [{
  id: 'R001',
  lease_id: 'L004',
  lease_name: 'Singapore Office',
  reminder_type: 'Expiry',
  due_date: '2023-10-31',
  days_remaining: 30,
  status: 'Active',
  priority: 'High'
}, {
  id: 'R002',
  lease_id: 'L007',
  lease_name: 'Chennai Office',
  reminder_type: 'Payment',
  due_date: '2023-07-05',
  days_remaining: 5,
  status: 'Active',
  priority: 'Medium'
}, {
  id: 'R003',
  lease_id: 'L012',
  lease_name: 'Hyderabad Branch',
  reminder_type: 'Strategy',
  due_date: '2023-07-15',
  days_remaining: 15,
  status: 'Active',
  priority: 'Medium'
}, {
  id: 'R004',
  lease_id: 'L002',
  lease_name: 'Delhi Co-working Space',
  reminder_type: 'Expiry',
  due_date: '2023-11-14',
  days_remaining: 180,
  status: 'Active',
  priority: 'Low'
}, {
  id: 'R005',
  lease_id: 'L005',
  lease_name: 'Tokyo Satellite Office',
  reminder_type: 'Expiry',
  due_date: '2023-10-31',
  days_remaining: 90,
  status: 'Active',
  priority: 'Medium'
}];
const Reminders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const filteredReminders = reminders.filter(reminder => reminder.lease_name.toLowerCase().includes(searchTerm.toLowerCase()) || reminder.reminder_type.toLowerCase().includes(searchTerm.toLowerCase()));
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getReminderTypeIcon = (type: string) => {
    switch (type) {
      case 'Expiry':
        return <CalendarIcon className="h-5 w-5" />;
      case 'Payment':
        return <ClockIcon className="h-5 w-5" />;
      case 'Strategy':
        return <BellIcon className="h-5 w-5" />;
      default:
        return <BellIcon className="h-5 w-5" />;
    }
  };
  return <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Reminders</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Search reminders..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50" onClick={() => setShowFilters(!showFilters)}>
              <FilterIcon className="h-5 w-5 mr-2 text-gray-500" />
              Filters
            </button>
          </div>
          {showFilters && <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
              <select className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Reminder Types</option>
                <option value="Expiry">Expiry</option>
                <option value="Payment">Payment</option>
                <option value="Strategy">Strategy</option>
              </select>
              <select className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Sort By</option>
                <option value="due_date">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reminder ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lease
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Remaining
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReminders.map(reminder => <tr key={reminder.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reminder.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {reminder.lease_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {reminder.lease_id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-1 rounded-md ${reminder.reminder_type === 'Expiry' ? 'bg-blue-100 text-blue-800' : reminder.reminder_type === 'Payment' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                        {getReminderTypeIcon(reminder.reminder_type)}
                      </div>
                      <span className="ml-2 text-sm text-gray-900">
                        {reminder.reminder_type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(reminder.due_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reminder.days_remaining} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(reminder.priority)}`}>
                      {reminder.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      Dismiss
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 sm:px-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{filteredReminders.length}</span>{' '}
            reminders
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
export default Reminders;