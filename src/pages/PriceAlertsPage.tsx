import React, { useState, useEffect } from 'react';
import {
    Bell,
    Plus,
    Trash2,
    Plane,
    Ship,
    Building2,
    TrendingDown,
    TrendingUp,
    ChevronDown,
    AlertCircle,
    CheckCircle,
    X,
    Euro,
    Calendar,
    MapPin
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';

interface PriceAlert {
    id: string;
    alertType: 'flight' | 'hotel' | 'ferry';
    routeFrom: string;
    routeTo: string;
    travelDate: string;
    thresholdPrice: number;
    currentPrice: number | null;
    active: boolean;
    notificationSent: boolean;
    createdAt: string;
}

const PriceAlertsPage: React.FC = () => {
    const { isDarkMode } = useTheme();
    const { user } = useAuthStore();
    const [alerts, setAlerts] = useState<PriceAlert[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAlert, setNewAlert] = useState({
        alertType: 'flight' as 'flight' | 'hotel' | 'ferry',
        routeFrom: '',
        routeTo: '',
        travelDate: '',
        thresholdPrice: 0,
    });

    // Popular routes for quick selection
    const popularRoutes = {
        flight: [
            { from: 'Athens (ATH)', to: 'Santorini (JTR)' },
            { from: 'Athens (ATH)', to: 'Mykonos (JMK)' },
            { from: 'London (LHR)', to: 'Santorini (JTR)' },
        ],
        ferry: [
            { from: 'Piraeus', to: 'Santorini' },
            { from: 'Piraeus', to: 'Mykonos' },
            { from: 'Piraeus', to: 'Paros' },
            { from: 'Piraeus', to: 'Naxos' },
        ],
        hotel: [
            { from: 'Santorini', to: '' },
            { from: 'Mykonos', to: '' },
            { from: 'Paros', to: '' },
        ],
    };

    // Load alerts
    useEffect(() => {
        if (user) {
            loadAlerts();
        } else {
            setIsLoading(false);
        }
    }, [user]);

    const loadAlerts = async () => {
        if (!user) return;

        setIsLoading(true);
        const { data, error } = await supabase
            .from('price_alerts')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (!error && data) {
            setAlerts(data.map(a => ({
                id: a.id,
                alertType: a.alert_type,
                routeFrom: a.route_from,
                routeTo: a.route_to,
                travelDate: a.travel_date,
                thresholdPrice: a.threshold_price,
                currentPrice: a.current_price,
                active: a.active,
                notificationSent: a.notification_sent,
                createdAt: a.created_at,
            })));
        }
        setIsLoading(false);
    };

    // Create alert
    const createAlert = async () => {
        if (!user) {
            alert('Please sign in to create price alerts');
            return;
        }

        const { error } = await supabase
            .from('price_alerts')
            .insert({
                user_id: user.id,
                alert_type: newAlert.alertType,
                route_from: newAlert.routeFrom,
                route_to: newAlert.routeTo,
                travel_date: newAlert.travelDate || null,
                threshold_price: newAlert.thresholdPrice,
                active: true,
            });

        if (!error) {
            setShowCreateModal(false);
            setNewAlert({
                alertType: 'flight',
                routeFrom: '',
                routeTo: '',
                travelDate: '',
                thresholdPrice: 0,
            });
            loadAlerts();
        }
    };

    // Delete alert
    const deleteAlert = async (id: string) => {
        const { error } = await supabase
            .from('price_alerts')
            .delete()
            .eq('id', id);

        if (!error) {
            setAlerts(prev => prev.filter(a => a.id !== id));
        }
    };

    // Toggle alert active status
    const toggleAlert = async (id: string, active: boolean) => {
        const { error } = await supabase
            .from('price_alerts')
            .update({ active })
            .eq('id', id);

        if (!error) {
            setAlerts(prev =>
                prev.map(a => (a.id === id ? { ...a, active } : a))
            );
        }
    };

    const getAlertIcon = (type: string) => {
        switch (type) {
            case 'flight':
                return <Plane className="w-5 h-5" />;
            case 'ferry':
                return <Ship className="w-5 h-5" />;
            case 'hotel':
                return <Building2 className="w-5 h-5" />;
            default:
                return <Bell className="w-5 h-5" />;
        }
    };

    const getAlertColor = (type: string) => {
        switch (type) {
            case 'flight':
                return 'bg-blue-500';
            case 'ferry':
                return 'bg-cyan-500';
            case 'hotel':
                return 'bg-purple-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <>
            <SEO
                title="Price Alerts | Discover Cyclades"
                description="Set price alerts for flights, ferries, and hotels to the Greek islands. Get notified when prices drop."
                url="https://discovercyclades.gr/price-alerts"
            />

            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {/* Header */}
                <div className={`${isDarkMode ? 'bg-gradient-to-r from-green-900 to-emerald-900' : 'bg-gradient-to-r from-green-600 to-emerald-600'} text-white py-12 px-4`}>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <Bell className="w-8 h-8" />
                            <h1 className="text-3xl md:text-4xl font-bold">Price Alerts</h1>
                        </div>
                        <p className="text-lg opacity-90">
                            Track prices and get notified when they drop. Never miss a deal on your Cyclades trip.
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 text-center shadow`}>
                            <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {alerts.filter(a => a.active).length}
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Alerts</div>
                        </div>
                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 text-center shadow`}>
                            <div className={`text-3xl font-bold mb-1 text-green-500`}>
                                {alerts.filter(a => a.currentPrice && a.currentPrice < a.thresholdPrice).length}
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Price Drops</div>
                        </div>
                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 text-center shadow`}>
                            <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {alerts.length}
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Alerts</div>
                        </div>
                    </div>

                    {/* Create Alert Button */}
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="w-full py-4 mb-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Price Alert
                    </button>

                    {/* Alerts List */}
                    {!user ? (
                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 text-center shadow-lg`}>
                            <AlertCircle className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Sign in to use Price Alerts
                            </h3>
                            <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Create an account to track prices and get notified when they drop.
                            </p>
                            <a
                                href="/signin"
                                className="inline-block px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                            >
                                Sign In
                            </a>
                        </div>
                    ) : isLoading ? (
                        <div className="text-center py-12">
                            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Loading alerts...</p>
                        </div>
                    ) : alerts.length === 0 ? (
                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 text-center shadow-lg`}>
                            <Bell className={`w-12 h-12 mx-auto mb-4 opacity-50 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                No Price Alerts Yet
                            </h3>
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                Create your first alert to start tracking prices.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence>
                                {alerts.map(alert => (
                                    <motion.div
                                        key={alert.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg ${!alert.active ? 'opacity-60' : ''
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Alert Type Icon */}
                                            <div className={`p-3 rounded-xl ${getAlertColor(alert.alertType)} text-white`}>
                                                {getAlertIcon(alert.alertType)}
                                            </div>

                                            {/* Alert Details */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        {alert.routeFrom}
                                                        {alert.routeTo && (
                                                            <>
                                                                <span className="mx-2">→</span>
                                                                {alert.routeTo}
                                                            </>
                                                        )}
                                                    </h3>
                                                    {alert.currentPrice && alert.currentPrice < alert.thresholdPrice && (
                                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                                                            <TrendingDown className="w-3 h-3" />
                                                            Price Drop!
                                                        </span>
                                                    )}
                                                </div>

                                                <div className={`flex flex-wrap gap-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    <span className="flex items-center gap-1">
                                                        <Euro className="w-4 h-4" />
                                                        Alert when below €{alert.thresholdPrice}
                                                    </span>
                                                    {alert.travelDate && (
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {new Date(alert.travelDate).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                    <span className="capitalize">{alert.alertType}</span>
                                                </div>

                                                {alert.currentPrice && (
                                                    <div className={`mt-2 text-sm ${alert.currentPrice < alert.thresholdPrice
                                                            ? 'text-green-500'
                                                            : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                                        }`}>
                                                        Current price: €{alert.currentPrice}
                                                        {alert.currentPrice < alert.thresholdPrice && (
                                                            <span className="ml-2">
                                                                (€{(alert.thresholdPrice - alert.currentPrice).toFixed(0)} below target!)
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => toggleAlert(alert.id, !alert.active)}
                                                    className={`p-2 rounded-lg transition-colors ${alert.active
                                                            ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                                            : isDarkMode
                                                                ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                        }`}
                                                    title={alert.active ? 'Pause alert' : 'Activate alert'}
                                                >
                                                    {alert.active ? <CheckCircle className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                                                </button>
                                                <button
                                                    onClick={() => deleteAlert(alert.id)}
                                                    className={`p-2 rounded-lg transition-colors ${isDarkMode
                                                            ? 'bg-gray-700 text-red-400 hover:bg-red-900/30'
                                                            : 'bg-gray-100 text-red-500 hover:bg-red-50'
                                                        }`}
                                                    title="Delete alert"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Create Alert Modal */}
                <AnimatePresence>
                    {showCreateModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                            onClick={() => setShowCreateModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto`}
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Create Price Alert
                                    </h3>
                                    <button
                                        onClick={() => setShowCreateModal(false)}
                                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Alert Type */}
                                <div className="mb-4">
                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Alert Type
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['flight', 'ferry', 'hotel'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setNewAlert(prev => ({ ...prev, alertType: type as any }))}
                                                className={`py-3 px-4 rounded-xl font-medium capitalize flex items-center justify-center gap-2 transition-all ${newAlert.alertType === type
                                                        ? getAlertColor(type) + ' text-white'
                                                        : isDarkMode
                                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {getAlertIcon(type)}
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Routes */}
                                {popularRoutes[newAlert.alertType] && (
                                    <div className="mb-4">
                                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Popular Routes
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {popularRoutes[newAlert.alertType].map((route, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setNewAlert(prev => ({
                                                        ...prev,
                                                        routeFrom: route.from,
                                                        routeTo: route.to,
                                                    }))}
                                                    className={`px-3 py-1.5 rounded-full text-sm ${isDarkMode
                                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {route.from}{route.to && ` → ${route.to}`}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* From */}
                                <div className="mb-4">
                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {newAlert.alertType === 'hotel' ? 'Location' : 'From'}
                                    </label>
                                    <input
                                        type="text"
                                        value={newAlert.routeFrom}
                                        onChange={e => setNewAlert(prev => ({ ...prev, routeFrom: e.target.value }))}
                                        placeholder={newAlert.alertType === 'hotel' ? 'e.g., Santorini' : 'e.g., Athens'}
                                        className={`w-full px-4 py-3 rounded-xl border ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                            }`}
                                    />
                                </div>

                                {/* To (not for hotels) */}
                                {newAlert.alertType !== 'hotel' && (
                                    <div className="mb-4">
                                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            To
                                        </label>
                                        <input
                                            type="text"
                                            value={newAlert.routeTo}
                                            onChange={e => setNewAlert(prev => ({ ...prev, routeTo: e.target.value }))}
                                            placeholder="e.g., Santorini"
                                            className={`w-full px-4 py-3 rounded-xl border ${isDarkMode
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                                }`}
                                        />
                                    </div>
                                )}

                                {/* Travel Date */}
                                <div className="mb-4">
                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Travel Date (optional)
                                    </label>
                                    <input
                                        type="date"
                                        value={newAlert.travelDate}
                                        onChange={e => setNewAlert(prev => ({ ...prev, travelDate: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl border ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                            }`}
                                    />
                                </div>

                                {/* Threshold Price */}
                                <div className="mb-6">
                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Alert me when price drops below (€)
                                    </label>
                                    <input
                                        type="number"
                                        value={newAlert.thresholdPrice || ''}
                                        onChange={e => setNewAlert(prev => ({ ...prev, thresholdPrice: parseFloat(e.target.value) || 0 }))}
                                        placeholder="e.g., 100"
                                        className={`w-full px-4 py-3 rounded-xl border ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                            }`}
                                    />
                                </div>

                                {/* Create Button */}
                                <button
                                    onClick={createAlert}
                                    disabled={!newAlert.routeFrom || !newAlert.thresholdPrice}
                                    className={`w-full py-4 rounded-xl font-semibold transition-all ${newAlert.routeFrom && newAlert.thresholdPrice
                                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Create Alert
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default PriceAlertsPage;
