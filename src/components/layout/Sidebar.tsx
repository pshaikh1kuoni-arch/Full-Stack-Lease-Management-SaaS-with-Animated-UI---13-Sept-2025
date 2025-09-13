import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboardIcon, FileTextIcon, GitBranchIcon, BellIcon, FolderIcon, ChevronLeftIcon, ChevronRightIcon, LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const Sidebar = ({
  isOpen,
  toggleSidebar
}: SidebarProps) => {
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
  const navItems = [{
    name: 'Dashboard',
    path: '/',
    icon: <LayoutDashboardIcon className="h-5 w-5" />
  }, {
    name: 'Leases',
    path: '/leases',
    icon: <FileTextIcon className="h-5 w-5" />
  }, {
    name: 'Strategies',
    path: '/strategies',
    icon: <GitBranchIcon className="h-5 w-5" />
  }, {
    name: 'Reminders',
    path: '/reminders',
    icon: <BellIcon className="h-5 w-5" />
  }, {
    name: 'Documents',
    path: '/documents',
    icon: <FolderIcon className="h-5 w-5" />
  }];
  return <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out bg-white border-r border-gray-200 shadow-sm`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4">
          <div className={`flex items-center ${isOpen ? 'justify-between w-full' : 'justify-center'}`}>
            {isOpen && <span className="text-xl font-bold text-blue-600">LeasePro</span>}
            <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
              {isOpen ? <ChevronLeftIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {navItems.map(item => <NavLink key={item.path} to={item.path} className={({
            isActive
          }) => `flex items-center px-3 py-2 rounded-md transition-all duration-200
                  ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}
                  ${!isOpen && 'justify-center'}`}>
                {item.icon}
                {isOpen && <span className="ml-3 text-sm font-medium">{item.name}</span>}
              </NavLink>)}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className={`flex ${isOpen ? 'items-center' : 'justify-center'}`}>
            {isOpen && <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Role: {user?.role}
                </p>
              </div>}
            <button onClick={handleSignOut} className="p-2 text-gray-500 rounded-md hover:bg-gray-100">
              <LogOutIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default Sidebar;