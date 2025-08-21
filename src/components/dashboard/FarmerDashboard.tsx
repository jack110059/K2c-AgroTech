import React from 'react';
import { 
  TrendingUp, 
  Package, 
  FileText, 
  Camera, 
  Shield, 
  Cpu,
  AlertTriangle,
  DollarSign,
  Thermometer,
  Droplets
} from 'lucide-react';
import { mockSoilReport, mockInsurance, mockMagicBox } from '../../data/mockData';

const FarmerDashboard: React.FC = () => {
  const totalSavings = 45600;
  const activeCrops = 3;
  const pendingOrders = 2;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer Dashboard</h1>
        <p className="text-gray-600">Welcome back, Ravi! Here's your farm overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Savings</p>
              <p className="text-2xl font-bold text-green-600">₹{totalSavings.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600 font-medium">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Crops</p>
              <p className="text-2xl font-bold text-blue-600">{activeCrops}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-blue-600 font-medium">Ready for harvest</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-orange-600">{pendingOrders}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-orange-600 font-medium">Awaiting confirmation</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Insurance Coverage</p>
              <p className="text-2xl font-bold text-purple-600">₹4.3L</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-purple-600 font-medium">{mockInsurance.length} active policies</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Magic Box Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Magic Box Status</h3>
            <div className="bg-green-100 p-2 rounded-full">
              <Cpu className="w-5 h-5 text-green-600" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Thermometer className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-sm text-gray-600">Temperature</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{mockMagicBox.temperature}°C</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Droplets className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">Humidity</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{mockMagicBox.humidity}%</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Droplets className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Soil Moisture</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{mockMagicBox.soilMoisture}%</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <FileText className="w-5 h-5 text-purple-500 mr-2" />
                <span className="text-sm text-gray-600">pH Level</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{mockMagicBox.ph}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Alerts</h4>
            <div className="space-y-2">
              {mockMagicBox.alerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <p className="text-sm text-yellow-800">{alert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Soil Report Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Latest Soil Report</h3>
            <div className="bg-blue-100 p-2 rounded-full">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">pH Level</span>
              <span className="text-sm font-medium text-gray-900">{mockSoilReport.ph}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Nitrogen (N)</span>
              <span className="text-sm font-medium text-gray-900">{mockSoilReport.nitrogen} ppm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Phosphorus (P)</span>
              <span className="text-sm font-medium text-gray-900">{mockSoilReport.phosphorus} ppm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Potassium (K)</span>
              <span className="text-sm font-medium text-gray-900">{mockSoilReport.potassium} ppm</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Recommendations</h4>
            <div className="space-y-2">
              {mockSoilReport.recommendations.slice(0, 2).map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            View Full Report
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Package className="w-6 h-6 text-green-600 mr-3" />
            <span className="font-medium text-gray-900">Sell New Crop</span>
          </button>

          <button className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Camera className="w-6 h-6 text-blue-600 mr-3" />
            <span className="font-medium text-gray-900">Disease Detection</span>
          </button>

          <button className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <FileText className="w-6 h-6 text-purple-600 mr-3" />
            <span className="font-medium text-gray-900">Upload Soil Report</span>
          </button>

          <button className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Shield className="w-6 h-6 text-orange-600 mr-3" />
            <span className="font-medium text-gray-900">Buy Insurance</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;