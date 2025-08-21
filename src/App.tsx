import React, { useState } from 'react';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import AuthPage from './components/auth/AuthPage';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import FarmerDashboard from './components/dashboard/FarmerDashboard';
import CustomerDashboard from './components/dashboard/CustomerDashboard';
import RetailerDashboard from './components/dashboard/RetailerDashboard';
import SellCrop from './components/farmer/SellCrop';
import SoilReport from './components/farmer/SoilReport';
import BrowseCrops from './components/customer/BrowseCrops';
import Traceability from './components/customer/Traceability';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">K2C</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderContent = () => {
    if (user.role === 'farmer') {
      switch (currentPage) {
        case 'dashboard':
          return <FarmerDashboard />;
        case 'sell-crop':
          return <SellCrop />;
        case 'soil-report':
          return <SoilReport />;
        case 'disease-detection':
          return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">Disease Detection</h1><p className="text-gray-600 mt-2">AI-powered crop disease detection coming soon...</p></div>;
        case 'inputs':
          return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">Inputs & Discounts</h1><p className="text-gray-600 mt-2">Discounted fertilizers, seeds, and pesticides...</p></div>;
        case 'insurance':
          return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">Insurance</h1><p className="text-gray-600 mt-2">Manage your crop insurance policies...</p></div>;
        case 'magic-box':
          return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">Magic Box IoT</h1><p className="text-gray-600 mt-2">Monitor your farm conditions in real-time...</p></div>;
        case 'profile':
          return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">Profile & Savings</h1><p className="text-gray-600 mt-2">Your farming profile and savings tracker...</p></div>;
        default:
          return <FarmerDashboard />;
      }
    }

    if (user.role === 'customer') {
      switch (currentPage) {
        case 'dashboard':
          return <CustomerDashboard />;
        case 'browse-crops':
          return <BrowseCrops />;
        case 'my-orders':
          return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">My Orders</h1><p className="text-gray-600 mt-2">Track your orders and purchase history...</p></div>;
        case 'traceability':
          return <Traceability />;
        case 'profile':
          return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">My Profile</h1><p className="text-gray-600 mt-2">Manage your account settings...</p></div>;
        default:
          return <CustomerDashboard />;
      }
    }

    if (user.role === 'retailer') {
      switch (currentPage) {
        case 'dashboard':
          return <RetailerDashboard />;
        case 'bulk-deals':
          return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">Bulk Deals</h1><p className="text-gray-600 mt-2">Browse and purchase crops in bulk quantities...</p></div>;
        case 'my-orders':
          return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">My Orders</h1><p className="text-gray-600 mt-2">Manage your bulk orders and deliveries...</p></div>;
        case 'logistics':
          return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">Logistics</h1><p className="text-gray-600 mt-2">Track shipments and manage deliveries...</p></div>;
        case 'traceability':
          return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">Crop Passport</h1><p className="text-gray-600 mt-2">Access crop traceability information...</p></div>;
        case 'analytics':
          return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">Analytics</h1><p className="text-gray-600 mt-2">Business insights and performance metrics...</p></div>;
        case 'profile':
          return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">Business Profile</h1><p className="text-gray-600 mt-2">Manage your business information...</p></div>;
        default:
          return <RetailerDashboard />;
      }
    }

    return <div className="p-6"><h1 className="text-3xl font-bold text-gray-900">Welcome to K2C AgriTech</h1></div>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 min-h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;