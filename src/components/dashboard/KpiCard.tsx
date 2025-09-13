import React from 'react';
interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}
const KpiCard = ({
  title,
  value,
  icon,
  color
}: KpiCardProps) => {
  return <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transform transition-all duration-300 hover:shadow-md hover:scale-105 animate-bounce-in">
      <div className={`bg-gradient-to-r ${color} p-4 flex items-center justify-between`}>
        <div className="text-white">
          <h3 className="text-sm font-medium opacity-80">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="bg-white bg-opacity-30 p-2 rounded-full text-white">
          {icon}
        </div>
      </div>
    </div>;
};
export default KpiCard;