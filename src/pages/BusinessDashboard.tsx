import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, Plus, Edit, Trash2, Eye, BarChart3, 
  Settings, Calendar, DollarSign, Users, TrendingUp,
  CheckCircle, XCircle, Clock, AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import SEO from '../components/SEO';
import ProtectedRoute from '../components/ProtectedRoute';

interface Business {
  id: string;
  name: string;
  business_type: string;
  status: string;
  verification_status: string;
  description: string;
  location: string;
  island: string;
}

interface BusinessListing {
  id: string;
  title: string;
  listing_type: string;
  status: string;
  price: number;
  featured: boolean;
}

export default function BusinessDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [business, setBusiness] = useState<Business | null>(null);
  const [listings, setListings] = useState<BusinessListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'analytics' | 'settings'>('overview');

  useEffect(() => {
    if (!user) {
      navigate('/business/signin');
      return;
    }
    loadBusinessData();
  }, [user]);

  const loadBusinessData = async () => {
    try {
      // Load business
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (businessError) throw businessError;
      setBusiness(businessData);

      // Load listings
      const { data: listingsData, error: listingsError } = await supabase
        .from('business_listings')
        .select('*')
        .eq('business_id', businessData.id)
        .order('created_at', { ascending: false });

      if (listingsError) throw listingsError;
      setListings(listingsData || []);
    } catch (error: any) {
      console.error('Error loading business data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Business Found</h2>
          <p className="text-gray-600 mb-6">You don't have a business account yet.</p>
          <button
            onClick={() => navigate('/business/signup')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
          >
            Create Business Account
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { icon: <CheckCircle className="w-4 h-4" />, color: 'bg-green-100 text-green-800', label: 'Approved' },
      pending: { icon: <Clock className="w-4 h-4" />, color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      rejected: { icon: <XCircle className="w-4 h-4" />, color: 'bg-red-100 text-red-800', label: 'Rejected' },
      suspended: { icon: <AlertCircle className="w-4 h-4" />, color: 'bg-red-100 text-red-800', label: 'Suspended' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  return (
    <ProtectedRoute>
      <SEO
        title={`${business.name} - Business Dashboard`}
        description="Manage your business listings, analytics, and profile on Discover Cyclades."
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
                <div className="mt-2 flex items-center gap-4">
                  {getStatusBadge(business.status)}
                  <span className="text-sm text-gray-600 capitalize">
                    {business.business_type.replace('_', ' ')}
                  </span>
                  {business.island && (
                    <span className="text-sm text-gray-600">
                      📍 {business.island.charAt(0).toUpperCase() + business.island.slice(1)}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => navigate('/business/listings/new')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Listing
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
                { id: 'listings', label: 'Listings', icon: <Building2 className="w-5 h-5" /> },
                { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> },
                { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Listings', value: listings.length, icon: <Building2 className="w-6 h-6" />, color: 'bg-blue-500' },
                  { label: 'Active Listings', value: listings.filter(l => l.status === 'active').length, icon: <CheckCircle className="w-6 h-6" />, color: 'bg-green-500' },
                  { label: 'Featured', value: listings.filter(l => l.featured).length, icon: <Star className="w-6 h-6" />, color: 'bg-yellow-500' },
                  { label: 'Total Views', value: '0', icon: <Eye className="w-6 h-6" />, color: 'bg-purple-500' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {listings.slice(0, 5).map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{listing.title}</p>
                        <p className="text-sm text-gray-600 capitalize">{listing.listing_type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(listing.status)}
                        {listing.price && (
                          <span className="text-sm font-medium text-gray-900">
                            €{listing.price}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {listings.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No listings yet. Create your first listing!</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Your Listings</h2>
                <button
                  onClick={() => navigate('/business/listings/new')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
                >
                  <Plus className="w-5 h-5" />
                  New Listing
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {listings.length === 0 ? (
                  <div className="text-center py-12">
                    <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Listings Yet</h3>
                    <p className="text-gray-600 mb-6">Create your first listing to get started.</p>
                    <button
                      onClick={() => navigate('/business/listings/new')}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
                    >
                      <Plus className="w-5 h-5" />
                      Create Listing
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {listings.map((listing) => (
                      <div key={listing.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
                              {listing.featured && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                                  Featured
                                </span>
                              )}
                              {getStatusBadge(listing.status)}
                            </div>
                            <p className="text-sm text-gray-600 capitalize mb-2">
                              {listing.listing_type.replace('_', ' ')}
                            </p>
                            {listing.price && (
                              <p className="text-lg font-semibold text-gray-900">
                                €{listing.price} <span className="text-sm font-normal text-gray-600">per unit</span>
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Analytics coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    defaultValue={business.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    defaultValue={business.description || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    defaultValue={business.location || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

