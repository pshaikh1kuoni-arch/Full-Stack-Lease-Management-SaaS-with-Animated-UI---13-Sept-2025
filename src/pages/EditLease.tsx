import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, SaveIcon, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
// Mock data for demonstration
const mockLease = {
  lease_id: 'L001',
  building_id: 'B001',
  office_classification: 'Hub',
  lease_type: 'Traditional',
  lease_name: 'Mumbai Tech Hub',
  organization_name: 'TechCorp',
  landlord_name: 'ABC Properties',
  signing_authority: 'John Doe',
  start_date: '2023-06-01',
  registration_date: '2023-05-15',
  end_date: '2026-05-31',
  locking_period: '12',
  notice_period: '3',
  monthly_rent: '75000',
  per_sqft_rate: '15',
  rent_due_date: '5',
  total_area: '5000',
  full_address: '123 Tech Park, Andheri East',
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  latitude: '19.0760',
  longitude: '72.8777',
  seats_count: '250',
  meeting_rooms: '5',
  conference_rooms: '2',
  amenities: 'Cafeteria, Gym, Parking, Security',
  status: 'Active',
  strategy_status: ''
};
const EditLease = () => {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const [formData, setFormData] = useState(mockLease);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  useEffect(() => {
    // Simulate API call to fetch lease data
    const timer = setTimeout(() => {
      setFormData(mockLease);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);
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
    console.log('Form data updated:', formData);
    // Show success toast
    toast.success('Lease updated successfully!');
    // Navigate back to leases page
    navigate('/leases');
  };
  const handleDelete = () => {
    // In a real app, you'd send a delete request to your API
    console.log('Deleting lease:', id);
    // Show success toast
    toast.success('Lease deleted successfully!');
    // Navigate back to leases page
    navigate('/leases');
    // Close modal
    setShowDeleteModal(false);
  };
  if (isLoading) {
    return <div className="flex items-center justify-center h-full">
        <div className="animate-bounce">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>;
  }
  return <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/leases" className="mr-4 p-2 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Lease: {formData.lease_name}
          </h1>
        </div>
        <div className="flex space-x-3">
          <button type="button" onClick={() => setShowDeleteModal(true)} className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform transition-transform duration-200 hover:scale-105">
            <TrashIcon className="h-5 w-5 mr-2" />
            Delete
          </button>
          <button type="button" onClick={handleSubmit} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-transform duration-200 hover:scale-105">
            <SaveIcon className="h-5 w-5 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Section 1: Basic Information */}
            <div className="lg:col-span-3">
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Basic Information
              </h2>
            </div>
            <div>
              <label htmlFor="lease_id" className="block text-sm font-medium text-gray-700 mb-1">
                Lease ID
              </label>
              <input type="text" id="lease_id" name="lease_id" value={formData.lease_id} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., L001" required />
            </div>
            <div>
              <label htmlFor="building_id" className="block text-sm font-medium text-gray-700 mb-1">
                Building ID
              </label>
              <input type="text" id="building_id" name="building_id" value={formData.building_id} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., B001" required />
            </div>
            <div>
              <label htmlFor="lease_name" className="block text-sm font-medium text-gray-700 mb-1">
                Lease Name
              </label>
              <input type="text" id="lease_name" name="lease_name" value={formData.lease_name} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Mumbai Tech Hub" required />
            </div>
            <div>
              <label htmlFor="office_classification" className="block text-sm font-medium text-gray-700 mb-1">
                Office Classification
              </label>
              <select id="office_classification" name="office_classification" value={formData.office_classification} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                <option value="">Select Classification</option>
                <option value="Hub">Hub</option>
                <option value="Spoke">Spoke</option>
                <option value="Satellite">Satellite</option>
              </select>
            </div>
            <div>
              <label htmlFor="lease_type" className="block text-sm font-medium text-gray-700 mb-1">
                Lease Type
              </label>
              <select id="lease_type" name="lease_type" value={formData.lease_type} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                <option value="">Select Type</option>
                <option value="Traditional">Traditional</option>
                <option value="Co-working">Co-working</option>
              </select>
            </div>
            <div>
              <label htmlFor="organization_name" className="block text-sm font-medium text-gray-700 mb-1">
                Organization Name
              </label>
              <input type="text" id="organization_name" name="organization_name" value={formData.organization_name} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., TechCorp" required />
            </div>
            {/* Section 2: Landlord Information */}
            <div className="lg:col-span-3">
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200 mt-6">
                Landlord Information
              </h2>
            </div>
            <div>
              <label htmlFor="landlord_name" className="block text-sm font-medium text-gray-700 mb-1">
                Landlord Name
              </label>
              <input type="text" id="landlord_name" name="landlord_name" value={formData.landlord_name} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., ABC Properties" required />
            </div>
            <div>
              <label htmlFor="signing_authority" className="block text-sm font-medium text-gray-700 mb-1">
                Signing Authority
              </label>
              <input type="text" id="signing_authority" name="signing_authority" value={formData.signing_authority} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., John Doe" />
            </div>
            {/* Section 3: Lease Terms */}
            <div className="lg:col-span-3">
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200 mt-6">
                Lease Terms
              </h2>
            </div>
            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input type="date" id="start_date" name="start_date" value={formData.start_date} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="registration_date" className="block text-sm font-medium text-gray-700 mb-1">
                Registration Date
              </label>
              <input type="date" id="registration_date" name="registration_date" value={formData.registration_date} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input type="date" id="end_date" name="end_date" value={formData.end_date} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="locking_period" className="block text-sm font-medium text-gray-700 mb-1">
                Locking Period (months)
              </label>
              <input type="number" id="locking_period" name="locking_period" value={formData.locking_period} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 12" />
            </div>
            <div>
              <label htmlFor="notice_period" className="block text-sm font-medium text-gray-700 mb-1">
                Notice Period (months)
              </label>
              <input type="number" id="notice_period" name="notice_period" value={formData.notice_period} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 3" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                <option value="Active">Active</option>
                <option value="Expiring Soon">Expiring Soon</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
            {/* Additional sections omitted for brevity - they would be the same as AddLease.tsx */}
            {/* Strategy Status */}
            <div className="lg:col-span-3">
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200 mt-6">
                Strategy
              </h2>
            </div>
            <div>
              <label htmlFor="strategy_status" className="block text-sm font-medium text-gray-700 mb-1">
                Strategy Status
              </label>
              <select id="strategy_status" name="strategy_status" value={formData.strategy_status} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">None</option>
                <option value="Renewal">Renewal</option>
                <option value="Downsizing">Downsizing</option>
                <option value="Relocation">Relocation</option>
              </select>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Link to="/leases" className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </Link>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Changes
            </button>
          </div>
        </form>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <TrashIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Lease
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this lease? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={handleDelete} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Delete
                </button>
                <button type="button" onClick={() => setShowDeleteModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default EditLease;