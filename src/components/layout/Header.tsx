import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MenuIcon, BellIcon, LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
interface HeaderProps {
  toggleSidebar: () => void;
}
const Header = ({
  toggleSidebar
}: HeaderProps) => {
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut();
    toast.success('Successfully signed out');
    navigate('/sign-in');
  };
  return <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="ml-4 md:ml-6">
            <h1 className="text-lg font-semibold text-gray-900">
              Lease Management System
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
          <div className="flex items-center">
            <span className="mr-3 text-sm font-medium text-gray-700 hidden md:block">
              {user?.firstName} {user?.lastName}
            </span>
            <button onClick={handleSignOut} className="relative flex rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user?.firstName?.charAt(0)}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;