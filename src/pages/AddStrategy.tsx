import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { toast } from 'sonner';
// Mock data for available leases
const availableLeases = [{
  id: 'L001',
  name: 'Mumbai Tech Hub'
}, {
  id: 'L002',
  name: 'Delhi Co-working Space'
}, {
  id: 'L003',
  name: 'Bangalore Campus'
}, {
  id: 'L004',
  name: 'Singapore Office'
}, {
  id: 'L005',
  name: 'Tokyo Satellite Office'
}];
const AddStrategy = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lease_id: '',
    strategy_type: '',
    notes: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your API
    console.log('Strategy form data submitted:', formData);
    // Show success toast
    toast.success('Strategy created successfully!');
    // Navigate to strategies page
    navigate('/strategies');
  };
  return <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/strategies" className="mr-4 p-2 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Strategy</h1>
        </div>
        <button type="button" onClick={handleSubmit} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-transform duration-200 hover:scale-105">
          <SaveIcon className="h-5 w-5 mr-2" />
          Create Strategy
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6 max-w-2xl">
            <div>
              <label htmlFor="lease_id" className="block text-sm font-medium text-gray-700 mb-1">
                Select Lease
              </label>
              <select id="lease_id" name="lease_id" value={formData.lease_id} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                <option value="">Select a lease</option>
                {availableLeases.map(lease => <option key={lease.id} value={lease.id}>
                    {lease.name} ({lease.id})
                  </option>)}
              </select>
            </div>
            <div>
              <label htmlFor="strategy_type" className="block text-sm font-medium text-gray-700 mb-1">
                Strategy Type
              </label>
              <select id="strategy_type" name="strategy_type" value={formData.strategy_type} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                <option value="">Select strategy type</option>
                <option value="Renewal">Renewal (17 steps)</option>
                <option value="Downsizing">Downsizing (19 steps)</option>
                <option value="Relocation">Relocation (21 steps)</option>
              </select>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Initial Notes
              </label>
              <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={4} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter any initial notes about this strategy..."></textarea>
            </div>
          </div>
          {formData.strategy_type && <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Strategy Workflow Preview
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-700 mb-3">
                  {formData.strategy_type === 'Renewal' && 'Plain Renewal Workflow (17 steps)'}
                  {formData.strategy_type === 'Downsizing' && 'Downsizing Workflow (19 steps)'}
                  {formData.strategy_type === 'Relocation' && 'Relocation Workflow (21 steps)'}
                </h4>
                <div className="space-y-3">
                  {formData.strategy_type === 'Renewal' && <>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                          1
                        </div>
                        <span>Email to Site FM for respective lease</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center mr-3">
                          2
                        </div>
                        <span>
                          Site FM to revert on current occupancy & Annual
                          Operating expenditure data
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center mr-3">
                          3
                        </div>
                        <span>
                          Site FM to check with BU on growth/Reduction FTE plans
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 pl-9">
                        ... and 14 more steps
                      </div>
                    </>}
                  {formData.strategy_type === 'Downsizing' && <>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                          1
                        </div>
                        <span>Email to Site FM for respective lease</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center mr-3">
                          2
                        </div>
                        <span>
                          Site FM to revert on current occupancy & Annual
                          Operating expenditure data
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center mr-3">
                          3
                        </div>
                        <span>
                          Site FM to check with BU on growth/Reduction FTE plans
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 pl-9">
                        ... and 16 more steps
                      </div>
                    </>}
                  {formData.strategy_type === 'Relocation' && <>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                          1
                        </div>
                        <span>Email to Site FM for respective lease</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center mr-3">
                          2
                        </div>
                        <span>
                          Site FM to revert on current occupancy & Annual
                          Operating expenditure data
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center mr-3">
                          3
                        </div>
                        <span>
                          Site FM to check with BU on growth/Reduction FTE plans
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 pl-9">
                        ... and 18 more steps
                      </div>
                    </>}
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Once created, you'll be able to track and update each step of
                the workflow.
              </p>
            </div>}
          <div className="mt-8 flex justify-end">
            <Link to="/strategies" className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </Link>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Create Strategy
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default AddStrategy;