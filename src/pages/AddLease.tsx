import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { toast } from 'sonner';
const AddLease = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lease_id: '',
    building_id: '',
    office_classification: '',
    lease_type: '',
    lease_name: '',
    organization_name: '',
    landlord_name: '',
    signing_authority: '',
    start_date: '',
    registration_date: '',
    end_date: '',
    locking_period: '',
    notice_period: '',
    monthly_rent: '',
    per_sqft_rate: '',
    rent_due_date: '',
    total_area: '',
    full_address: '',
    city: '',
    state: '',
    country: '',
    latitude: '',
    longitude: '',
    seats_count: '',
    meeting_rooms: '',
    conference_rooms: '',
    amenities: '',
    status: 'Active',
    strategy_status: ''
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
    console.log('Form data submitted:', formData);
    // Show success toast
    toast.success('Lease created successfully!');
    // Navigate back to leases page
    navigate('/leases');
  };
  return <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/leases" className="mr-4 p-2 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Lease</h1>
        </div>
        <button type="button" onClick={handleSubmit} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-transform duration-200 hover:scale-105">
          <SaveIcon className="h-5 w-5 mr-2" />
          Save Lease
        </button>
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
            {/* Section 4: Financial Details */}
            <div className="lg:col-span-3">
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200 mt-6">
                Financial Details
              </h2>
            </div>
            <div>
              <label htmlFor="monthly_rent" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Rent ($)
              </label>
              <input type="number" id="monthly_rent" name="monthly_rent" value={formData.monthly_rent} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 75000" required />
            </div>
            <div>
              <label htmlFor="per_sqft_rate" className="block text-sm font-medium text-gray-700 mb-1">
                Per Sq.ft Rate ($)
              </label>
              <input type="number" id="per_sqft_rate" name="per_sqft_rate" value={formData.per_sqft_rate} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 2.5" />
            </div>
            <div>
              <label htmlFor="rent_due_date" className="block text-sm font-medium text-gray-700 mb-1">
                Rent Due Date (day of month)
              </label>
              <input type="number" id="rent_due_date" name="rent_due_date" value={formData.rent_due_date} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 5" min="1" max="31" />
            </div>
            {/* Section 5: Property Details */}
            <div className="lg:col-span-3">
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200 mt-6">
                Property Details
              </h2>
            </div>
            <div>
              <label htmlFor="total_area" className="block text-sm font-medium text-gray-700 mb-1">
                Total Area (sq.ft)
              </label>
              <input type="number" id="total_area" name="total_area" value={formData.total_area} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 5000" required />
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="full_address" className="block text-sm font-medium text-gray-700 mb-1">
                Full Address
              </label>
              <textarea id="full_address" name="full_address" value={formData.full_address} onChange={handleChange} rows={2} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter full address" required></textarea>
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Mumbai" required />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State/Province
              </label>
              <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Maharashtra" />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., India" required />
            </div>
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input type="text" id="latitude" name="latitude" value={formData.latitude} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 19.0760" />
            </div>
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input type="text" id="longitude" name="longitude" value={formData.longitude} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 72.8777" />
            </div>
            {/* Section 6: Capacity & Amenities */}
            <div className="lg:col-span-3">
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200 mt-6">
                Capacity & Amenities
              </h2>
            </div>
            <div>
              <label htmlFor="seats_count" className="block text-sm font-medium text-gray-700 mb-1">
                Seats Count
              </label>
              <input type="number" id="seats_count" name="seats_count" value={formData.seats_count} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 250" required />
            </div>
            <div>
              <label htmlFor="meeting_rooms" className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Rooms
              </label>
              <input type="number" id="meeting_rooms" name="meeting_rooms" value={formData.meeting_rooms} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 5" />
            </div>
            <div>
              <label htmlFor="conference_rooms" className="block text-sm font-medium text-gray-700 mb-1">
                Conference Rooms
              </label>
              <input type="number" id="conference_rooms" name="conference_rooms" value={formData.conference_rooms} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 2" />
            </div>
            <div className="lg:col-span-3">
              <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-1">
                Amenities (comma-separated)
              </label>
              <textarea id="amenities" name="amenities" value={formData.amenities} onChange={handleChange} rows={2} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Cafeteria, Gym, Parking, Security"></textarea>
            </div>
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
              Save Lease
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default AddLease;