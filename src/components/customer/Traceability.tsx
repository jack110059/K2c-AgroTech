import React, { useState } from 'react';
import { QrCode, MapPin, Calendar, User, Shield, Camera, Info } from 'lucide-react';
import QRScanner from '../common/QRScanner';
import { mockCrops } from '../../data/mockData';

interface TraceabilityData {
  cropDetails: {
    name: string;
    variety: string;
    organicCertified: boolean;
    harvestDate: string;
  };
  farmerDetails: {
    name: string;
    village: string;
    district: string;
    farmingExperience: string;
  };
  growingDetails: {
    seedSource: string;
    fertilizers: string[];
    pesticides: string[];
    irrigationMethod: string;
    soilType: string;
  };
  qualityChecks: {
    pesticeideResidue: string;
    heavyMetals: string;
    microbialCount: string;
    nutritionalValue: string;
  };
  timeline: {
    date: string;
    stage: string;
    description: string;
    image?: string;
  }[];
}

const Traceability: React.FC = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState<TraceabilityData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'quality'>('overview');

  const handleQRScan = (qrCode: string) => {
    // Mock traceability data based on QR code
    const mockData: TraceabilityData = {
      cropDetails: {
        name: 'Organic Tomatoes',
        variety: 'Cherry Tomatoes',
        organicCertified: true,
        harvestDate: '2024-12-15',
      },
      farmerDetails: {
        name: 'Ravi Kumar',
        village: 'Krishnagiri',
        district: 'Tamil Nadu',
        farmingExperience: '15 years',
      },
      growingDetails: {
        seedSource: 'Certified Organic Seeds - Green Valley Nursery',
        fertilizers: ['Organic Compost', 'Vermicompost', 'Neem Cake'],
        pesticides: ['Neem Oil (Organic)', 'Bt Spray (Bio-pesticide)'],
        irrigationMethod: 'Drip Irrigation',
        soilType: 'Red Sandy Loam',
      },
      qualityChecks: {
        pesticeideResidue: 'Not Detected',
        heavyMetals: 'Within Safe Limits',
        microbialCount: 'Safe',
        nutritionalValue: 'High Vitamin C, Lycopene Rich',
      },
      timeline: [
        {
          date: '2024-10-15',
          stage: 'Seed Sowing',
          description: 'Organic certified seeds planted in prepared beds',
          image: 'https://images.pexels.com/photos/1246530/pexels-photo-1246530.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          date: '2024-11-01',
          stage: 'First Irrigation',
          description: 'Drip irrigation system activated with filtered water',
        },
        {
          date: '2024-11-15',
          stage: 'Organic Fertilization',
          description: 'Applied vermicompost and organic matter to boost growth',
        },
        {
          date: '2024-11-30',
          stage: 'Flowering Stage',
          description: 'Plants showing healthy flowering, applied neem oil spray',
          image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          date: '2024-12-10',
          stage: 'Pre-Harvest Inspection',
          description: 'Quality check completed, tomatoes ready for harvest',
        },
        {
          date: '2024-12-15',
          stage: 'Harvesting',
          description: 'Fresh tomatoes harvested early morning, packed immediately',
          image: 'https://images.pexels.com/photos/96595/pexels-photo-96595.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ],
    };

    setScannedData(mockData);
    setShowScanner(false);
  };

  if (!scannedData) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Traceability</h1>
          <p className="text-gray-600">Scan QR codes to trace your food from farm to table.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <QrCode className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Scan Product QR Code</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Use your camera to scan the QR code on any K2C product to see its complete journey from farm to your table.
          </p>
          
          <button
            onClick={() => setShowScanner(true)}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center mx-auto"
          >
            <Camera className="w-5 h-5 mr-2" />
            Open QR Scanner
          </button>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Farmer Information</h4>
              <p className="text-sm text-gray-600">See who grew your food and their farming practices</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Growing Timeline</h4>
              <p className="text-sm text-gray-600">Track the complete journey from seed to harvest</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quality Assurance</h4>
              <p className="text-sm text-gray-600">View quality tests and safety certifications</p>
            </div>
          </div>
        </div>

        {showScanner && (
          <QRScanner
            onScan={handleQRScan}
            onClose={() => setShowScanner(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Trace Information</h1>
            <p className="text-gray-600">Complete transparency from farm to table</p>
          </div>
          <button
            onClick={() => setScannedData(null)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
          >
            <QrCode className="w-4 h-4 mr-2" />
            Scan Another Product
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'overview'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'timeline'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Growing Timeline
        </button>
        <button
          onClick={() => setActiveTab('quality')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'quality'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Quality Tests
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Product Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src="https://images.pexels.com/photos/96595/pexels-photo-96595.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt={scannedData.cropDetails.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{scannedData.cropDetails.name}</h2>
                <p className="text-gray-600">{scannedData.cropDetails.variety}</p>
                {scannedData.cropDetails.organicCertified && (
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                    Certified Organic
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Farmer Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 text-green-600 mr-2" />
              Farmer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Farmer Name</p>
                <p className="font-semibold text-gray-900">{scannedData.farmerDetails.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Experience</p>
                <p className="font-semibold text-gray-900">{scannedData.farmerDetails.farmingExperience}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                  <p className="font-semibold text-gray-900">
                    {scannedData.farmerDetails.village}, {scannedData.farmerDetails.district}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Harvest Date</p>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                  <p className="font-semibold text-gray-900">{scannedData.cropDetails.harvestDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Growing Methods */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Info className="w-5 h-5 text-blue-600 mr-2" />
              Growing Methods
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Seed Source</p>
                <p className="text-gray-900">{scannedData.growingDetails.seedSource}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Fertilizers Used</p>
                <div className="flex flex-wrap gap-2">
                  {scannedData.growingDetails.fertilizers.map((fertilizer, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {fertilizer}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Pest Control</p>
                <div className="flex flex-wrap gap-2">
                  {scannedData.growingDetails.pesticides.map((pesticide, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {pesticide}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Irrigation</p>
                  <p className="text-gray-900">{scannedData.growingDetails.irrigationMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Soil Type</p>
                  <p className="text-gray-900">{scannedData.growingDetails.soilType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Growing Timeline</h3>
          <div className="space-y-6">
            {scannedData.timeline.map((event, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  </div>
                  {index < scannedData.timeline.length - 1 && (
                    <div className="w-px h-16 bg-gray-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{event.stage}</h4>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{event.description}</p>
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.stage}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'quality' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="w-5 h-5 text-purple-600 mr-2" />
            Quality & Safety Tests
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Pesticide Residue Test</h4>
              <p className="text-green-800 font-medium">{scannedData.qualityChecks.pesticeideResidue}</p>
              <p className="text-sm text-green-700 mt-1">Tested at certified lab - Safe for consumption</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Heavy Metals</h4>
              <p className="text-blue-800 font-medium">{scannedData.qualityChecks.heavyMetals}</p>
              <p className="text-sm text-blue-700 mt-1">Lead, Mercury, Cadmium levels tested</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Microbial Count</h4>
              <p className="text-purple-800 font-medium">{scannedData.qualityChecks.microbialCount}</p>
              <p className="text-sm text-purple-700 mt-1">E. coli and Salmonella testing completed</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-orange-900 mb-2">Nutritional Analysis</h4>
              <p className="text-orange-800 font-medium">{scannedData.qualityChecks.nutritionalValue}</p>
              <p className="text-sm text-orange-700 mt-1">Vitamins and minerals analyzed</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
            <div className="flex flex-wrap gap-3">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                Organic Certified
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                Food Safety Approved
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                K2C Quality Verified
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Traceability;