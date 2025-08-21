import React, { useState } from 'react';
import { Camera, X, Check } from 'lucide-react';

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  // Mock QR scan result after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const mockResult = 'QR001234';
      setResult(mockResult);
      setScanning(false);
      onScan(mockResult);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onScan]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">QR Code Scanner</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
          {scanning ? (
            <>
              <Camera className="w-16 h-16 text-gray-400" />
              <div className="absolute inset-0 border-4 border-green-500 animate-pulse rounded-lg"></div>
              <div className="absolute top-4 left-4 right-4 text-center">
                <p className="text-sm text-gray-600">Position QR code in the frame</p>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">QR Code Scanned Successfully!</p>
              <p className="text-xs text-gray-500 mt-1">Code: {result}</p>
            </div>
          )}
        </div>

        {!scanning && (
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            View Crop Details
          </button>
        )}
      </div>
    </div>
  );
};

export default QRScanner;