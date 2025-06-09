import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Calendar, Truck, Weight, MapPin, Shield } from 'lucide-react';

const SkipSizeSelector = () => {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock API data as fallback (keeping original structure for fallback)
  const mockSkipsData = [
    {
      id: 17933,
      size: 4,
      hire_period_days: 14,
      price_before_vat: 278,
      vat: 20,
      allowed_on_road: true,
      allows_heavy_waste: true
    },
    {
      id: 17934,
      size: 6,
      hire_period_days: 14,
      price_before_vat: 305,
      vat: 20,
      allowed_on_road: true,
      allows_heavy_waste: true
    },
    {
      id: 17935,
      size: 8,
      hire_period_days: 14,
      price_before_vat: 375,
      vat: 20,
      allowed_on_road: true,
      allows_heavy_waste: true
    },
    {
      id: 17936,
      size: 10,
      hire_period_days: 14,
      price_before_vat: 400,
      vat: 20,
      allowed_on_road: false,
      allows_heavy_waste: false
    },
    {
      id: 17937,
      size: 12,
      hire_period_days: 14,
      price_before_vat: 439,
      vat: 20,
      allowed_on_road: false,
      allows_heavy_waste: false
    },
    {
      id: 17938,
      size: 14,
      hire_period_days: 14,
      price_before_vat: 470,
      vat: 20,
      allowed_on_road: false,
      allows_heavy_waste: false
    }
  ];

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Filter out the very large skips (20+ yards) for better UX
        const filteredSkips = data.filter(skip => skip.size <= 16);
        // console.log('Fetched skips:', filteredSkips);
        setSkips(filteredSkips);
      } catch (err) {
        console.error('API fetch failed, using fallback data:', err);
        // Fallback to mock data if API fails
        setSkips(mockSkipsData);
        setError('Using demo data - API temporarily unavailable');
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  const calculateTotalPrice = (priceBeforeVat, vat) => {
    return Math.round(priceBeforeVat * (1 + vat / 100));
  };

  const getSkipRecommendation = (size) => {
    if (size <= 4) return "Perfect for small home projects";
    if (size <= 6) return "Great for garden clearances";
    if (size <= 8) return "Ideal for kitchen renovations";
    if (size <= 10) return "Perfect for bathroom refits";
    if (size <= 12) return "Suitable for house clearances";
    if (size <= 14) return "Great for loft conversions";
    return "Ideal for large construction projects";
  };

  const getSkipCapacity = (size) => {
    const bags = Math.round(size * 25); // Approximate conversion
    return `≈ ${bags} bin bags`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading skip options...</p>
        </div>
      </div>
    );
  }

  if (error && skips.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <p className="text-red-600 text-lg">Failed to load skip options</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">NR32, Lowestoft</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span>Step 3 of 6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-1 bg-gray-200 rounded-full">
            <div className="h-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <p className="text-sm text-yellow-800 text-center">
              ⚠️ {error}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Skip Size
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the skip size that best matches your project needs. All prices include VAT and delivery.
          </p>
        </div>

        {/* Skip Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skips.map((skip) => {
            const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat);
            const isSelected = selectedSkip?.id === skip.id;
            
            return (
              <div
                key={skip.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                  isSelected ? 'ring-2 ring-blue-600 ring-offset-2' : ''
                }`}
                onClick={() => setSelectedSkip(skip)}
              >
                {/* Popular Badge */}
                {skip.size === 6 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className="p-6">
                  {/* Skip Visual */}
                  <div className="relative mb-6">
                    <div className="w-full h-32 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
                      <div className="text-center z-10">
                        <div className="text-white font-bold text-2xl">{skip.size}</div>
                        <div className="text-white text-sm">Yard Skip</div>
                      </div>
                      {/* Size indicator */}
                      <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                        {skip.size}yd³
                      </div>
                    </div>
                  </div>

                  {/* Skip Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {skip.size} Yard Skip
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {getSkipRecommendation(skip.size)}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        {getSkipCapacity(skip.size)}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                        {skip.hire_period_days} day hire period
                      </div>
                      {skip.allowed_on_road && (
                        <div className="flex items-center text-sm text-green-600">
                          <Truck className="w-4 h-4 mr-2" />
                          Road placement allowed
                        </div>
                      )}
                      {skip.allows_heavy_waste && (
                        <div className="flex items-center text-sm text-green-600">
                          <Weight className="w-4 h-4 mr-2" />
                          Heavy waste accepted
                        </div>
                      )}
                      {!skip.allowed_on_road && (
                        <div className="flex items-center text-sm text-amber-600">
                          <Shield className="w-4 h-4 mr-2" />
                          Driveway placement only
                        </div>
                      )}
                    </div>

                    {/* Pricing */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            £{totalPrice}
                          </div>
                          <div className="text-sm text-gray-500">
                            (£{skip.price_before_vat} + £{Math.round(skip.price_before_vat * skip.vat / 100)} VAT)
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            Per skip
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Select Button */}
                    <button
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select This Skip'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

       

        {/* Spacer for fixed bottom bar */}
        <div className="h-24"></div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              {selectedSkip && (
                <>
                  <div className="w-12 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{selectedSkip.size}yd</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {selectedSkip.size} Yard Skip Selected
                    </div>
                    <div className="text-sm text-gray-600">
                      £{calculateTotalPrice(selectedSkip.price_before_vat, selectedSkip.vat)} total
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Back
              </button>
              <button
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center ${
                  selectedSkip
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!selectedSkip}
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipSizeSelector;