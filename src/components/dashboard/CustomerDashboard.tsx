import React from 'react';
import { ShoppingCart, Package, Star, Truck, QrCode, TrendingUp } from 'lucide-react';
import { mockCrops, mockOrders } from '../../data/mockData';

const CustomerDashboard: React.FC = () => {
  const recentOrders = mockOrders.slice(0, 3);
  const featuredCrops = mockCrops.slice(0, 3);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Dashboard</h1>
        <p className="text-gray-600">Welcome back, Priya! Discover fresh produce from local farmers.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-blue-600">{mockOrders.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-blue-600 font-medium">2 active orders</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Money Saved</p>
              <p className="text-2xl font-bold text-green-600">₹2,340</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600 font-medium">Direct from farmers</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">QR Codes Scanned</p>
              <p className="text-2xl font-bold text-purple-600">15</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <QrCode className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-purple-600 font-medium">Full traceability</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Farmer Rating</p>
              <p className="text-2xl font-bold text-orange-600">4.8</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-orange-600 font-medium">Average from orders</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Featured Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Featured Products</h3>
            <button className="text-green-600 text-sm font-medium hover:text-green-700">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {featuredCrops.map((crop) => (
              <div key={crop.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src={crop.images[0]}
                  alt={crop.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{crop.name}</h4>
                  <p className="text-sm text-gray-600">From {crop.farmerVillage}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-lg font-bold text-green-600">
                      ₹{crop.currentPrice}/{crop.unit}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ₹{crop.expectedPrice}
                    </span>
                  </div>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button className="text-green-600 text-sm font-medium hover:text-green-700">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => {
              const crop = mockCrops.find(c => c.id === order.cropId);
              if (!crop) return null;

              const statusColors = {
                pending: 'bg-yellow-100 text-yellow-800',
                confirmed: 'bg-blue-100 text-blue-800',
                delivered: 'bg-green-100 text-green-800',
                cancelled: 'bg-red-100 text-red-800',
              };

              return (
                <div key={order.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <img
                    src={crop.images[0]}
                    alt={crop.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{crop.name}</h4>
                    <p className="text-sm text-gray-600">{order.quantity} {crop.unit}</p>
                    <p className="text-sm text-gray-500">Ordered {order.orderDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{order.totalPrice.toLocaleString()}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Package className="w-6 h-6 text-green-600 mr-3" />
            <span className="font-medium text-gray-900">Browse Products</span>
          </button>

          <button className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <QrCode className="w-6 h-6 text-blue-600 mr-3" />
            <span className="font-medium text-gray-900">Scan QR Code</span>
          </button>

          <button className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Truck className="w-6 h-6 text-purple-600 mr-3" />
            <span className="font-medium text-gray-900">Track Orders</span>
          </button>

          <button className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Star className="w-6 h-6 text-orange-600 mr-3" />
            <span className="font-medium text-gray-900">Rate Products</span>
          </button>
        </div>
      </div>

      {/* Traceability Feature */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Traceability</h3>
            <p className="text-gray-600 mb-4">
              Scan QR codes on products to see the complete journey from farm to your table
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Farmer details and location</li>
              <li>• Growing methods and inputs used</li>
              <li>• Harvest and packaging information</li>
              <li>• Transport and storage details</li>
            </ul>
          </div>
          <div className="hidden lg:block">
            <QrCode className="w-24 h-24 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;