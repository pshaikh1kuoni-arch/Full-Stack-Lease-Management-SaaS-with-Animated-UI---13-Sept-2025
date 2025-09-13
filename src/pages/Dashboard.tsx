import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { HomeIcon, AlertCircleIcon, DollarSignIcon, UsersIcon, BuildingIcon } from 'lucide-react';
import KpiCard from '../components/dashboard/KpiCard';
import LeaseCard from '../components/lease/LeaseCard';
// Mock data for demonstration
const kpiData = {
  totalLeases: 78,
  expiringSoon: 12,
  monthlyRentTotal: 342500,
  totalSeats: 1250,
  workspaceCapacity: 85
};
const statusData = [{
  name: 'Active',
  value: 45,
  color: '#4ade80'
}, {
  name: 'Expiring Soon',
  value: 12,
  color: '#facc15'
}, {
  name: 'Expired',
  value: 8,
  color: '#f87171'
}, {
  name: 'In Renewal',
  value: 13,
  color: '#60a5fa'
}];
const leaseLocations = [{
  id: 1,
  name: 'Mumbai Office',
  lat: 19.076,
  lng: 72.8777,
  seats: 250
}, {
  id: 2,
  name: 'Delhi HQ',
  lat: 28.6139,
  lng: 77.209,
  seats: 350
}, {
  id: 3,
  name: 'Bangalore Tech Park',
  lat: 12.9716,
  lng: 77.5946,
  seats: 420
}, {
  id: 4,
  name: 'Singapore Office',
  lat: 1.3521,
  lng: 103.8198,
  seats: 180
}, {
  id: 5,
  name: 'Tokyo Branch',
  lat: 35.6762,
  lng: 139.6503,
  seats: 50
}];
const recentLeases = [{
  id: 'L001',
  name: 'Mumbai Tech Hub',
  landlord: 'ABC Properties',
  startDate: '2023-06-01',
  endDate: '2026-05-31',
  status: 'Active'
}, {
  id: 'L002',
  name: 'Delhi Co-working Space',
  landlord: 'WeWork',
  startDate: '2023-05-15',
  endDate: '2024-05-14',
  status: 'Active'
}, {
  id: 'L003',
  name: 'Bangalore Campus',
  landlord: 'Tech Park Ltd',
  startDate: '2023-04-01',
  endDate: '2028-03-31',
  status: 'Active'
}, {
  id: 'L004',
  name: 'Singapore Office',
  landlord: 'East Corp',
  startDate: '2023-03-15',
  endDate: '2023-12-31',
  status: 'Expiring Soon'
}, {
  id: 'L005',
  name: 'Tokyo Satellite Office',
  landlord: 'Nippon Properties',
  startDate: '2023-02-01',
  endDate: '2024-01-31',
  status: 'Active'
}];
const attentionLeases = [{
  id: 'L004',
  name: 'Singapore Office',
  landlord: 'East Corp',
  issue: 'Expires in 2 months',
  status: 'Expiring Soon'
}, {
  id: 'L007',
  name: 'Chennai Office',
  landlord: 'South Estates',
  issue: 'Rent due in 5 days',
  status: 'Active'
}, {
  id: 'L012',
  name: 'Hyderabad Branch',
  landlord: 'Tech Space',
  issue: 'Strategy approval pending',
  status: 'In Renewal'
}];
// Fix Leaflet icon issue
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// Fix the default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow
});
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <div className="flex items-center justify-center h-full">
        <div className="animate-bounce">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>;
  }
  return <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard title="Total Leases" value={kpiData.totalLeases} icon={<HomeIcon />} color="from-blue-500 to-blue-600" />
        <KpiCard title="Expiring Soon" value={kpiData.expiringSoon} icon={<AlertCircleIcon />} color="from-yellow-500 to-yellow-600" />
        <KpiCard title="Monthly Rent" value={`$${kpiData.monthlyRentTotal.toLocaleString()}`} icon={<DollarSignIcon />} color="from-green-500 to-green-600" />
        <KpiCard title="Total Seats" value={kpiData.totalSeats} icon={<UsersIcon />} color="from-purple-500 to-purple-600" />
        <KpiCard title="Workspace Capacity" value={`${kpiData.workspaceCapacity}%`} icon={<BuildingIcon />} color="from-indigo-500 to-indigo-600" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4">
            Lease Status Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={value => [`${value} leases`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Map */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4">Lease Locations</h2>
          <div className="h-64 relative">
            <MapContainer center={[20.5937, 78.9629]} // Center on India
          zoom={3} style={{
            height: '100%',
            width: '100%',
            borderRadius: '0.5rem'
          }} scrollWheelZoom={false} attributionControl={true} zoomControl={true}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
              {leaseLocations.map(location => <Marker key={location.id} position={[location.lat, location.lng]}>
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{location.name}</h3>
                      <p>Seats: {location.seats}</p>
                    </div>
                  </Popup>
                </Marker>)}
            </MapContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leases */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4">Recent Leases</h2>
          <div className="space-y-3">
            {recentLeases.map(lease => <LeaseCard key={lease.id} lease={lease} />)}
          </div>
        </div>
        {/* Leases Requiring Attention */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4">
            Leases Requiring Attention
          </h2>
          <div className="space-y-3">
            {attentionLeases.map(lease => <LeaseCard key={lease.id} lease={lease} isAttention={true} />)}
          </div>
        </div>
      </div>
    </div>;
};
export default Dashboard;