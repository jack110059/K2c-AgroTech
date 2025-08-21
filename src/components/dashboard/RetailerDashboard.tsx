import React from 'react';
import { Package, Truck, BarChart3, DollarSign, TrendingUp, Clock, MapPin } from 'lucide-react';
import { mockCrops } from '../../data/mockData';

const RetailerDashboard: React.FC = () => {
  const totalPurchases = 156000;
  const activeOrders = 8;
  const monthlyGrowth = 23.5;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Retailer Dashboard</h1>
        <p className="text-gray-600">Welcome back, Amit! Manage your bulk orders and logistics.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Purchases</p>
              <p className="text-2xl font-bold text-green-600">₹{totalPurchases.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600 font-medium">This month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Orders</p>
              <p className="text-2xl font-bold text-blue-600">{activeOrders}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-blue-600 font-medium">In progress</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Growth Rate</p>
              <p className="text-2xl font-bold text-purple-600">{monthlyGrowth}%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-purple-600 font-medium">Monthly growth</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Suppliers</p>
              <p className="text-2xl font-bold text-orange-600">24</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-orange-600 font-medium">Verified farmers</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bulk Deals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Available Bulk Deals</h3>
            <button className="text-green-600 text-sm font-medium hover:text-green-700">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {mockCrops.map((crop) => (
              <div key={crop.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{crop.name}</h4>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    {crop.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-600">Quantity Available</p>
                    <p className="text-sm font-medium">{crop.quantity} {crop.unit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Price per {crop.unit}</p>
                    <p className="text-sm font-medium text-green-600">₹{crop.currentPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="text-sm font-medium">{crop.farmerVillage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Harvest Date</p>
                    <p className="text-sm font-medium">{crop.harvestDate}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Lot ID: {crop.lotId}
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Place Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Tracking */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Order Tracking</h3>
            <div className="bg-blue-100 p-2 rounded-full">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          <div className="space-y-4">
            {[
              { id: 'ORD001', product: 'Organic Tomatoes', status: 'In Transit', eta: '2 days', progress: 75 },
              { id: 'ORD002', product: 'Basmati Rice', status: 'Processing', eta: '5 days', progress: 30 },
              { id: 'ORD003', product: 'Fresh Onions', status: 'Packed', eta: '3 days', progress: 60 },
            ].map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{order.product}</h4>
                    <p className="text-sm text-gray-600">Order #{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">{order.status}</p>
                    <p className="text-xs text-gray-600">ETA: {order.eta}</p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${order.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">{order.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Purchase Analytics</h3>
            <div className="bg-purple-100 p-2 rounded-full">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Top Product Category</h4>
              <p className="text-xl font-bold text-gray-900">Vegetables</p>
              <p className="text-sm text-green-600">62% of total purchases</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Average Order Value</h4>
              <p className="text-xl font-bold text-gray-900">₹19,500</p>
              <p className="text-sm text-green-600">+15% from last month</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Delivery Success Rate</h4>
              <p className="text-xl font-bold text-gray-900">98.5%</p>
              <p className="text-sm text-green-600">On-time deliveries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Package className="w-6 h-6 text-green-600 mr-3" />
            <span className="font-medium text-gray-900">New Bulk Order</span>
          </button>

          <button className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Truck className="w-6 h-6 text-blue-600 mr-3" />
            <span className="font-medium text-gray-900">Track Shipments</span>
          </button>

          <button className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-6 h-6 text-purple-600 mr-3" />
            <span className="font-medium text-gray-900">View Analytics</span>
          </button>

          <button className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Clock className="w-6 h-6 text-orange-600 mr-3" />
            <span className="font-medium text-gray-900">Schedule Pickup</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;