import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, ShoppingCart, QrCode } from 'lucide-react';
import { mockCrops } from '../../data/mockData';
import QRScanner from '../common/QRScanner';

const BrowseCrops: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [cart, setCart] = useState<string[]>([]);

  const filteredCrops = mockCrops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || crop.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const addToCart = (cropId: string) => {
    setCart([...cart, cropId]);
  };

  const handleQRScan = (result: string) => {
    console.log('QR Scanned:', result);
    setShowQRScanner(false);
    // Find crop by QR code and show details
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Fresh Produce</h1>
        <p className="text-gray-600">Discover fresh, traceable crops directly from local farmers.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Search crops..."
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>

            <button
              onClick={() => setShowQRScanner(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Scan QR
            </button>

            <div className="relative">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({cart.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <div key={crop.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={crop.images[0]}
                alt={crop.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  crop.status === 'available' 
                    ? 'bg-green-100 text-green-800'
                    : crop.status === 'reserved'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <QrCode className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{crop.name}</h3>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">4.8</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                {crop.farmerVillage} • {crop.farmerName}
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{crop.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{crop.currentPrice}
                  </span>
                  <span className="text-sm text-gray-500">/{crop.unit}</span>
                  {crop.expectedPrice !== crop.currentPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ₹{crop.expectedPrice}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="font-semibold text-gray-900">{crop.quantity} {crop.unit}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => addToCart(crop.id)}
                  disabled={crop.status !== 'available' || cart.includes(crop.id)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cart.includes(crop.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Lot ID: {crop.lotId}</span>
                  <span>Harvest: {crop.harvestDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No crops found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      )}

      {showQRScanner && (
        <QRScanner
          onScan={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />
      )}
    </div>
  );
};

export default BrowseCrops;