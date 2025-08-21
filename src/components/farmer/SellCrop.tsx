import React, { useState } from 'react';
import { Upload, Camera, Package, DollarSign, QrCode, Check } from 'lucide-react';

const SellCrop: React.FC = () => {
  const [cropData, setCropData] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    expectedPrice: '',
    description: '',
    images: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [lotId, setLotId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate lot ID and QR code
    const newLotId = `LOT${Math.random().toString().substr(2, 6)}`;
    setLotId(newLotId);
    setSubmitted(true);
  };

  const handleImageUpload = () => {
    // Mock image upload - in reality would handle file selection
    const mockImages = [
      'https://images.pexels.com/photos/96595/pexels-photo-96595.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
    ];
    setCropData({ ...cropData, images: mockImages });
  };

  if (submitted) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Crop Listed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your crop has been added to the marketplace and is now visible to customers.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Lot ID</p>
                <p className="text-xl font-bold text-gray-900">{lotId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">QR Code</p>
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mt-2">
                  <QrCode className="w-8 h-8 text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 justify-center">
            <button 
              onClick={() => setSubmitted(false)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              List Another Crop
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              View Listing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Crop</h1>
        <p className="text-gray-600">List your produce on the marketplace for direct sale to customers.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Package className="w-5 h-5 text-green-600 mr-2" />
              Crop Details
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crop Name *
              </label>
              <input
                type="text"
                value={cropData.name}
                onChange={(e) => setCropData({ ...cropData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Organic Tomatoes"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  value={cropData.quantity}
                  onChange={(e) => setCropData({ ...cropData, quantity: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit *
                </label>
                <select
                  value={cropData.unit}
                  onChange={(e) => setCropData({ ...cropData, unit: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="tons">Tons</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                Expected Price per {cropData.unit} *
              </label>
              <input
                type="number"
                value={cropData.expectedPrice}
                onChange={(e) => setCropData({ ...cropData, expectedPrice: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter price in ₹"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={cropData.description}
                onChange={(e) => setCropData({ ...cropData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your crop quality, growing methods, etc."
              />
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Camera className="w-5 h-5 text-green-600 mr-2" />
              Crop Images
            </h3>

            {cropData.images.length === 0 ? (
              <div 
                onClick={handleImageUpload}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Crop Images</h4>
                <p className="text-gray-600 mb-4">Add photos of your crop to attract more buyers</p>
                <button
                  type="button"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Choose Files
                </button>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {cropData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Crop ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-600">Add More Images</span>
                </button>
              </div>
            )}

            {/* Preview Card */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-3">Listing Preview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{cropData.name || 'Crop Name'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{cropData.quantity || '0'} {cropData.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium text-green-600">₹{cropData.expectedPrice || '0'}/{cropData.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Images:</span>
                  <span className="font-medium">{cropData.images.length} uploaded</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            List Crop for Sale
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellCrop;