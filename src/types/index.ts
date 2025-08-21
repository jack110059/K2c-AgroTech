export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'farmer' | 'customer' | 'retailer';
  village?: string;
  district?: string;
  membershipId?: string;
  avatar?: string;
}

export interface Crop {
  id: string;
  name: string;
  quantity: number;
  unit: 'kg' | 'tons';
  expectedPrice: number;
  currentPrice: number;
  images: string[];
  lotId: string;
  qrCode: string;
  farmerId: string;
  farmerName: string;
  farmerVillage: string;
  status: 'available' | 'sold' | 'reserved';
  harvestDate: string;
  description: string;
}

export interface SoilReport {
  id: string;
  farmerId: string;
  reportDate: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  recommendations: string[];
  cropSuggestions: string[];
}

export interface Insurance {
  id: string;
  farmerId: string;
  provider: string;
  policyNumber: string;
  cropType: string;
  coverage: number;
  premium: number;
  status: 'active' | 'claimed' | 'expired';
  expiryDate: string;
}

export interface Order {
  id: string;
  customerId: string;
  cropId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  isPreOrder: boolean;
  advancePayment?: number;
}

export interface MagicBox {
  id: string;
  farmerId: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  ph: number;
  lastUpdate: string;
  alerts: string[];
}