import React, { useState } from 'react';
import { Phone, Mail, User, MapPin, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'customer' | 'retailer' | null>(null);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    otp: '',
    village: '',
    district: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, loginWithEmail, register } = useAuth();

  const handleRoleSelect = (role: 'farmer' | 'customer' | 'retailer') => {
    setSelectedRole(role);
  };

  const handleSendOTP = () => {
    if (!formData.phone) {
      setError('Please enter your phone number');
      return;
    }
    setOtpSent(true);
    setError('');
    // Mock OTP: 1234
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      setError('Please select your role');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let success = false;

      if (isLogin) {
        if (loginMethod === 'phone') {
          if (!otpSent) {
            handleSendOTP();
            setLoading(false);
            return;
          }
          success = await login(formData.phone, formData.otp, selectedRole);
        } else {
          success = await loginWithEmail(formData.email, formData.password, selectedRole);
        }
      } else {
        success = await register({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          role: selectedRole,
          village: formData.village,
          district: formData.district,
        });
      }

      if (!success) {
        setError(isLogin ? 'Invalid credentials' : 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'farmer':
        return '👨‍🌾';
      case 'customer':
        return '🛒';
      case 'retailer':
        return '🏢';
      default:
        return '👤';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-green-600 to-green-800 p-8 text-white flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <div className="flex items-center mb-8">
              <div className="bg-white text-green-600 w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl mr-4">
                K2C
              </div>
              <div>
                <h1 className="text-3xl font-bold">K2C AgriTech</h1>
                <p className="text-green-100">Kissan to Customer</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              Empowering Agriculture with Technology
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Fair pricing, complete traceability, and tech-based empowerment for farmers, customers, and retailers.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <div>
                  <h3 className="font-semibold">For Farmers</h3>
                  <p className="text-green-100 text-sm">Sell crops, get soil analysis, disease detection</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🛒</span>
                </div>
                <div>
                  <h3 className="font-semibold">For Customers</h3>
                  <p className="text-green-100 text-sm">Buy fresh produce, full traceability</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🏢</span>
                </div>
                <div>
                  <h3 className="font-semibold">For Retailers</h3>
                  <p className="text-green-100 text-sm">Bulk deals, logistics, quality assurance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="lg:w-1/2 p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Join K2C Today'}
              </h2>
              <p className="text-gray-600">
                {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
              </p>
            </div>

            {/* Role Selection */}
            {!selectedRole && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  Select Your Role
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { role: 'farmer', label: 'Farmer', description: 'Sell crops, get insights' },
                    { role: 'customer', label: 'Customer', description: 'Buy fresh produce' },
                    { role: 'retailer', label: 'Retailer', description: 'Bulk purchases, logistics' }
                  ].map(({ role, label, description }) => (
                    <button
                      key={role}
                      onClick={() => handleRoleSelect(role as any)}
                      className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
                    >
                      <div className="text-3xl mr-4">{getRoleIcon(role)}</div>
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900 group-hover:text-green-700">
                          {label}
                        </h4>
                        <p className="text-sm text-gray-600">{description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-green-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedRole && (
              <>
                <div className="mb-6 p-4 bg-green-50 rounded-lg flex items-center">
                  <span className="text-2xl mr-3">{getRoleIcon(selectedRole)}</span>
                  <div>
                    <p className="font-semibold text-green-800 capitalize">{selectedRole}</p>
                    <p className="text-sm text-green-600">Selected role</p>
                  </div>
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="ml-auto text-green-600 hover:text-green-800"
                  >
                    Change
                  </button>
                </div>

                {isLogin && (
                  <div className="mb-6">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setLoginMethod('phone')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          loginMethod === 'phone'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone
                      </button>
                      <button
                        onClick={() => setLoginMethod('email')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          loginMethod === 'email'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {(loginMethod === 'phone' || !isLogin) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {(loginMethod === 'email' || !isLogin) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your email address"
                          required={loginMethod === 'email'}
                        />
                      </div>
                    </div>
                  )}

                  {!isLogin && selectedRole === 'farmer' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Village
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.village}
                            onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your village"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          District
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.district}
                            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your district"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {isLogin && loginMethod === 'phone' && otpSent && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OTP
                      </label>
                      <input
                        type="text"
                        value={formData.otp}
                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter OTP (use: 1234)"
                        maxLength={4}
                        required
                      />
                    </div>
                  )}

                  {isLogin && loginMethod === 'email' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter password (use: password)"
                        required
                      />
                    </div>
                  )}

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : isLogin ? 
                      (loginMethod === 'phone' && !otpSent ? 'Send OTP' : 'Sign In') : 
                      'Create Account'
                    }
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setOtpSent(false);
                      setError('');
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        password: '',
                        otp: '',
                        village: '',
                        district: '',
                      });
                    }}
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;