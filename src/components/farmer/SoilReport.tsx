import React, { useState } from 'react';
import { Upload, FileText, Mic, Download, TrendingUp, AlertCircle } from 'lucide-react';
import { mockSoilReport } from '../../data/mockData';

const SoilReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'view' | 'upload' | 'analysis'>('view');
  const [uploading, setUploading] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<'text' | 'audio'>('text');

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setActiveTab('view');
    }, 2000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Soil Analysis & Reports</h1>
        <p className="text-gray-600">Upload soil reports and get AI-powered recommendations for better crop yields.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
        <button
          onClick={() => setActiveTab('view')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'view'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          View Reports
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'upload'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Upload Report
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'analysis'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <TrendingUp className="w-4 h-4 inline mr-2" />
          AI Analysis
        </button>
      </div>

      {activeTab === 'view' && (
        <div className="space-y-8">
          {/* Current Report */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Latest Soil Report</h3>
              <div className="flex space-x-2">
                <button className="flex items-center text-blue-600 hover:text-blue-700">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
                <span className="text-sm text-gray-500">
                  {new Date(mockSoilReport.reportDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Nutrient Levels */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Nutrient Levels</h4>
                <div className="space-y-4">
                  {[
                    { name: 'pH Level', value: mockSoilReport.ph, unit: '', optimal: '6.0-7.0', status: 'good' },
                    { name: 'Nitrogen (N)', value: mockSoilReport.nitrogen, unit: ' ppm', optimal: '150-200', status: 'low' },
                    { name: 'Phosphorus (P)', value: mockSoilReport.phosphorus, unit: ' ppm', optimal: '30-50', status: 'low' },
                    { name: 'Potassium (K)', value: mockSoilReport.potassium, unit: ' ppm', optimal: '100-150', status: 'good' },
                    { name: 'Organic Matter', value: mockSoilReport.organicMatter, unit: '%', optimal: '3-5', status: 'good' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Optimal: {item.optimal}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {item.value}{item.unit}
                        </p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'good' 
                            ? 'bg-green-100 text-green-800'
                            : item.status === 'low'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status === 'good' ? 'Optimal' : item.status === 'low' ? 'Low' : 'High'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h4>
                <div className="space-y-4">
                  {mockSoilReport.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <p className="text-blue-800">{rec}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h5 className="font-medium text-gray-900 mb-3">Suggested Crops</h5>
                  <div className="flex flex-wrap gap-2">
                    {mockSoilReport.cropSuggestions.map((crop, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Upload Soil Report</h3>
          
          <div className="space-y-6">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Soil Test Report</h4>
              <p className="text-gray-600 mb-4">
                Drag and drop your soil report PDF or click to browse
              </p>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Choose File'}
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Supported Formats</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• PDF files from certified labs</li>
                <li>• Maximum file size: 10MB</li>
                <li>• Reports from K2C partner labs get priority processing</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">AI Soil Analyzer</h3>
          
          <div className="space-y-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setAnalysisMode('text')}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  analysisMode === 'text'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-5 h-5 mr-2" />
                Text Input
              </button>
              <button
                onClick={() => setAnalysisMode('audio')}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  analysisMode === 'audio'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Mic className="w-5 h-5 mr-2" />
                Voice Input
              </button>
            </div>

            {analysisMode === 'text' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your soil concerns or observations
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., My crops are showing yellowing leaves, soil seems compact, drainage is poor..."
                />
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-12 h-12 text-red-600" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Voice Analysis</h4>
                <p className="text-gray-600 mb-4">
                  Describe your soil issues in your local language
                </p>
                <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
                  Start Recording
                </button>
              </div>
            )}

            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Get AI Analysis
            </button>

            {/* Sample Analysis Result */}
            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Sample AI Analysis</h4>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 mb-4">
                  <strong>Analysis:</strong> Based on your description, your soil appears to have nitrogen deficiency and poor drainage. This is common in clay soils during monsoon season.
                </p>
                <div className="space-y-2">
                  <p className="text-blue-800"><strong>Immediate Actions:</strong></p>
                  <ul className="list-disc list-inside text-blue-700 space-y-1">
                    <li>Add organic compost to improve nitrogen levels</li>
                    <li>Create drainage channels to prevent waterlogging</li>
                    <li>Consider raised bed farming for better drainage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilReport;