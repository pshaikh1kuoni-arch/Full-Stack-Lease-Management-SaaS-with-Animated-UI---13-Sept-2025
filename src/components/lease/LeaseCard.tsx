import React from 'react';
import { CalendarIcon, AlertCircleIcon } from 'lucide-react';
interface LeaseCardProps {
  lease: {
    id: string;
    name: string;
    landlord: string;
    startDate?: string;
    endDate?: string;
    status: string;
    issue?: string;
  };
  isAttention?: boolean;
}
const LeaseCard = ({
  lease,
  isAttention = false
}: LeaseCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expiring Soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      case 'In Renewal':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transform transition-all duration-300 hover:shadow-sm hover:scale-[1.01] cursor-pointer">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{lease.name}</h3>
          <p className="text-sm text-gray-600">{lease.landlord}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(lease.status)}`}>
          {lease.status}
        </span>
      </div>
      {isAttention ? <div className="mt-2 flex items-center text-sm text-red-600">
          <AlertCircleIcon className="h-4 w-4 mr-1" />
          {lease.issue}
        </div> : <div className="mt-2 flex items-center text-sm text-gray-500">
          <CalendarIcon className="h-4 w-4 mr-1" />
          {lease.startDate} to {lease.endDate}
        </div>}
    </div>;
};
export default LeaseCard;