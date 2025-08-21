import React from 'react';
import { 
  Home, 
  ShoppingCart, 
  FileText, 
  Camera, 
  Package, 
  Shield, 
  User, 
  Cpu,
  Search,
  Truck,
  BarChart3,
  Users
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'farmer':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'sell-crop', label: 'Sell Crop', icon: ShoppingCart },
          { id: 'soil-report', label: 'Soil Analysis', icon: FileText },
          { id: 'disease-detection', label: 'Disease Detection', icon: Camera },
          { id: 'inputs', label: 'Inputs & Discounts', icon: Package },
          { id: 'insurance', label: 'Insurance', icon: Shield },
          { id: 'magic-box', label: 'Magic Box', icon: Cpu },
          { id: 'profile', label: 'Profile & Savings', icon: User },
        ];
      case 'customer':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'browse-crops', label: 'Browse Crops', icon: Search },
          { id: 'my-orders', label: 'My Orders', icon: ShoppingCart },
          { id: 'traceability', label: 'QR Scan & Trace', icon: Camera },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      case 'retailer':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'bulk-deals', label: 'Bulk Deals', icon: Package },
          { id: 'my-orders', label: 'My Orders', icon: ShoppingCart },
          { id: 'logistics', label: 'Logistics', icon: Truck },
          { id: 'traceability', label: 'Crop Passport', icon: Camera },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      default:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'crops', label: 'Crops', icon: Package },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-white w-64 min-h-screen shadow-sm border-r border-gray-200">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-green-50 text-green-700 border-r-4 border-green-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;