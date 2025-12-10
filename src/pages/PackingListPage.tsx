import React, { useState, useEffect } from 'react';
import {
    Luggage,
    Plus,
    Check,
    Trash2,
    Sparkles,
    Share2,
    Download,
    Sun,
    Umbrella,
    Camera,
    Shirt,
    Footprints,
    Pill,
    FileText,
    Smartphone,
    Waves,
    Mountain,
    Moon
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface PackingItem {
    id: string;
    name: string;
    category: string;
    packed: boolean;
    essential: boolean;
    quantity: number;
}

interface PackingCategory {
    id: string;
    name: string;
    icon: React.ReactNode;
    items: PackingItem[];
}

// Default packing list template
const getDefaultCategories = (season: string, activities: string[]): PackingCategory[] => {
    const categories: PackingCategory[] = [
        {
            id: 'documents',
            name: 'Documents & Essentials',
            icon: <FileText className="w-5 h-5" />,
            items: [
                { id: 'd1', name: 'Passport / ID', category: 'documents', packed: false, essential: true, quantity: 1 },
                { id: 'd2', name: 'Travel Insurance Documents', category: 'documents', packed: false, essential: true, quantity: 1 },
                { id: 'd3', name: 'Flight/Ferry Tickets', category: 'documents', packed: false, essential: true, quantity: 1 },
                { id: 'd4', name: 'Hotel Confirmations', category: 'documents', packed: false, essential: true, quantity: 1 },
                { id: 'd5', name: 'Credit Cards', category: 'documents', packed: false, essential: true, quantity: 2 },
                { id: 'd6', name: 'Cash (Euros)', category: 'documents', packed: false, essential: true, quantity: 1 },
                { id: 'd7', name: 'Copies of Important Documents', category: 'documents', packed: false, essential: false, quantity: 1 },
            ]
        },
        {
            id: 'electronics',
            name: 'Electronics',
            icon: <Smartphone className="w-5 h-5" />,
            items: [
                { id: 'e1', name: 'Phone + Charger', category: 'electronics', packed: false, essential: true, quantity: 1 },
                { id: 'e2', name: 'Power Bank', category: 'electronics', packed: false, essential: true, quantity: 1 },
                { id: 'e3', name: 'Camera', category: 'electronics', packed: false, essential: false, quantity: 1 },
                { id: 'e4', name: 'Universal Adapter', category: 'electronics', packed: false, essential: true, quantity: 1 },
                { id: 'e5', name: 'Headphones', category: 'electronics', packed: false, essential: false, quantity: 1 },
                { id: 'e6', name: 'E-Reader / Tablet', category: 'electronics', packed: false, essential: false, quantity: 1 },
            ]
        },
        {
            id: 'clothing',
            name: 'Clothing',
            icon: <Shirt className="w-5 h-5" />,
            items: [
                { id: 'c1', name: 'Swimwear', category: 'clothing', packed: false, essential: true, quantity: 2 },
                { id: 'c2', name: 'Light T-shirts', category: 'clothing', packed: false, essential: true, quantity: 5 },
                { id: 'c3', name: 'Shorts', category: 'clothing', packed: false, essential: true, quantity: 3 },
                { id: 'c4', name: 'Light Dress / Shirt (for evenings)', category: 'clothing', packed: false, essential: true, quantity: 2 },
                { id: 'c5', name: 'Underwear', category: 'clothing', packed: false, essential: true, quantity: 7 },
                { id: 'c6', name: 'Socks', category: 'clothing', packed: false, essential: true, quantity: 4 },
                { id: 'c7', name: 'Light Jacket / Cardigan', category: 'clothing', packed: false, essential: true, quantity: 1 },
                { id: 'c8', name: 'Sleepwear', category: 'clothing', packed: false, essential: false, quantity: 2 },
            ]
        },
        {
            id: 'footwear',
            name: 'Footwear',
            icon: <Footprints className="w-5 h-5" />,
            items: [
                { id: 'f1', name: 'Comfortable Walking Sandals', category: 'footwear', packed: false, essential: true, quantity: 1 },
                { id: 'f2', name: 'Flip Flops (for beach)', category: 'footwear', packed: false, essential: true, quantity: 1 },
                { id: 'f3', name: 'Comfortable Sneakers', category: 'footwear', packed: false, essential: false, quantity: 1 },
                { id: 'f4', name: 'Water Shoes', category: 'footwear', packed: false, essential: false, quantity: 1 },
            ]
        },
        {
            id: 'beach',
            name: 'Beach Essentials',
            icon: <Waves className="w-5 h-5" />,
            items: [
                { id: 'b1', name: 'Sunscreen SPF 50+', category: 'beach', packed: false, essential: true, quantity: 2 },
                { id: 'b2', name: 'Sunglasses', category: 'beach', packed: false, essential: true, quantity: 1 },
                { id: 'b3', name: 'Sun Hat', category: 'beach', packed: false, essential: true, quantity: 1 },
                { id: 'b4', name: 'Beach Towel', category: 'beach', packed: false, essential: true, quantity: 1 },
                { id: 'b5', name: 'Snorkel Mask', category: 'beach', packed: false, essential: false, quantity: 1 },
                { id: 'b6', name: 'Beach Bag', category: 'beach', packed: false, essential: false, quantity: 1 },
                { id: 'b7', name: 'After-Sun Lotion', category: 'beach', packed: false, essential: false, quantity: 1 },
            ]
        },
        {
            id: 'health',
            name: 'Health & Toiletries',
            icon: <Pill className="w-5 h-5" />,
            items: [
                { id: 'h1', name: 'Prescription Medications', category: 'health', packed: false, essential: true, quantity: 1 },
                { id: 'h2', name: 'Seasickness Pills', category: 'health', packed: false, essential: true, quantity: 1 },
                { id: 'h3', name: 'Pain Relief (Ibuprofen)', category: 'health', packed: false, essential: true, quantity: 1 },
                { id: 'h4', name: 'Insect Repellent', category: 'health', packed: false, essential: true, quantity: 1 },
                { id: 'h5', name: 'First Aid Kit', category: 'health', packed: false, essential: false, quantity: 1 },
                { id: 'h6', name: 'Toiletries Bag', category: 'health', packed: false, essential: true, quantity: 1 },
                { id: 'h7', name: 'Hand Sanitizer', category: 'health', packed: false, essential: true, quantity: 1 },
                { id: 'h8', name: 'Reusable Water Bottle', category: 'health', packed: false, essential: true, quantity: 1 },
            ]
        },
    ];

    // Add activity-specific items
    if (activities.includes('hiking')) {
        categories.push({
            id: 'hiking',
            name: 'Hiking Gear',
            icon: <Mountain className="w-5 h-5" />,
            items: [
                { id: 'hk1', name: 'Hiking Boots', category: 'hiking', packed: false, essential: true, quantity: 1 },
                { id: 'hk2', name: 'Backpack (Day Pack)', category: 'hiking', packed: false, essential: true, quantity: 1 },
                { id: 'hk3', name: 'Hiking Socks', category: 'hiking', packed: false, essential: true, quantity: 2 },
                { id: 'hk4', name: 'Trekking Poles', category: 'hiking', packed: false, essential: false, quantity: 1 },
            ]
        });
    }

    if (activities.includes('nightlife')) {
        categories.push({
            id: 'nightlife',
            name: 'Nightlife & Going Out',
            icon: <Moon className="w-5 h-5" />,
            items: [
                { id: 'n1', name: 'Smart Casual Outfit', category: 'nightlife', packed: false, essential: true, quantity: 2 },
                { id: 'n2', name: 'Nice Shoes', category: 'nightlife', packed: false, essential: true, quantity: 1 },
                { id: 'n3', name: 'Jewelry / Accessories', category: 'nightlife', packed: false, essential: false, quantity: 1 },
            ]
        });
    }

    // Season-specific adjustments
    if (season === 'spring' || season === 'autumn') {
        categories[2].items.push({
            id: 'c9', name: 'Rain Jacket', category: 'clothing', packed: false, essential: true, quantity: 1
        });
    }

    return categories;
};

const PackingListPage: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [categories, setCategories] = useState<PackingCategory[]>([]);
    const [tripDuration, setTripDuration] = useState(7);
    const [season, setSeason] = useState('summer');
    const [activities, setActivities] = useState<string[]>([]);
    const [newItemName, setNewItemName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);

    const activityOptions = [
        { id: 'beach', label: 'Beach & Swimming', icon: <Waves className="w-4 h-4" /> },
        { id: 'hiking', label: 'Hiking', icon: <Mountain className="w-4 h-4" /> },
        { id: 'photography', label: 'Photography', icon: <Camera className="w-4 h-4" /> },
        { id: 'nightlife', label: 'Nightlife', icon: <Moon className="w-4 h-4" /> },
    ];

    // Generate packing list
    const generateList = () => {
        const newCategories = getDefaultCategories(season, activities);
        setCategories(newCategories);
        setIsGenerated(true);

        // Save to localStorage
        localStorage.setItem('packingList', JSON.stringify(newCategories));
        localStorage.setItem('packingListMeta', JSON.stringify({ tripDuration, season, activities }));
    };

    // Load saved list on mount
    useEffect(() => {
        const saved = localStorage.getItem('packingList');
        const meta = localStorage.getItem('packingListMeta');

        if (saved && meta) {
            setCategories(JSON.parse(saved));
            const { tripDuration: td, season: s, activities: a } = JSON.parse(meta);
            setTripDuration(td);
            setSeason(s);
            setActivities(a);
            setIsGenerated(true);
        }
    }, []);

    // Toggle item packed status
    const togglePacked = (categoryId: string, itemId: string) => {
        setCategories(prev =>
            prev.map(cat =>
                cat.id === categoryId
                    ? {
                        ...cat,
                        items: cat.items.map(item =>
                            item.id === itemId ? { ...item, packed: !item.packed } : item
                        )
                    }
                    : cat
            )
        );
    };

    // Save to localStorage whenever categories change
    useEffect(() => {
        if (categories.length > 0) {
            localStorage.setItem('packingList', JSON.stringify(categories));
        }
    }, [categories]);

    // Add custom item
    const addCustomItem = () => {
        if (!newItemName.trim() || !selectedCategory) return;

        setCategories(prev =>
            prev.map(cat =>
                cat.id === selectedCategory
                    ? {
                        ...cat,
                        items: [
                            ...cat.items,
                            {
                                id: `custom-${Date.now()}`,
                                name: newItemName.trim(),
                                category: selectedCategory,
                                packed: false,
                                essential: false,
                                quantity: 1
                            }
                        ]
                    }
                    : cat
            )
        );
        setNewItemName('');
    };

    // Remove item
    const removeItem = (categoryId: string, itemId: string) => {
        setCategories(prev =>
            prev.map(cat =>
                cat.id === categoryId
                    ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
                    : cat
            )
        );
    };

    // Calculate progress
    const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
    const packedItems = categories.reduce(
        (sum, cat) => sum + cat.items.filter(item => item.packed).length,
        0
    );
    const progressPercent = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

    // Export to text
    const exportList = () => {
        let text = '🏝️ CYCLADES PACKING LIST\n\n';
        categories.forEach(cat => {
            text += `📦 ${cat.name.toUpperCase()}\n`;
            cat.items.forEach(item => {
                const status = item.packed ? '✅' : '⬜';
                text += `  ${status} ${item.name}${item.quantity > 1 ? ` (x${item.quantity})` : ''}\n`;
            });
            text += '\n';
        });
        text += `\nProgress: ${packedItems}/${totalItems} items packed (${progressPercent}%)`;
        text += '\n\nGenerated by Discover Cyclades - discovercyclades.gr';

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cyclades-packing-list.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Toggle activity
    const toggleActivity = (activityId: string) => {
        setActivities(prev =>
            prev.includes(activityId)
                ? prev.filter(a => a !== activityId)
                : [...prev, activityId]
        );
    };

    return (
        <>
            <SEO
                title="Packing List Generator | Discover Cyclades"
                description="Generate a personalized packing list for your Cyclades trip based on season, duration, and planned activities."
                url="https://discovercyclades.gr/packing-list"
            />

            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {/* Header */}
                <div className={`${isDarkMode ? 'bg-gradient-to-r from-amber-900 to-orange-900' : 'bg-gradient-to-r from-amber-500 to-orange-500'} text-white py-12 px-4`}>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <Luggage className="w-8 h-8" />
                            <h1 className="text-3xl md:text-4xl font-bold">Packing List Generator</h1>
                        </div>
                        <p className="text-lg opacity-90">
                            Never forget essentials again. Get a personalized packing list for your Greek island adventure.
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-8">
                    {!isGenerated ? (
                        /* Generation Form */
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg`}
                        >
                            <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Tell us about your trip
                            </h2>

                            {/* Duration */}
                            <div className="mb-6">
                                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Trip Duration (days)
                                </label>
                                <input
                                    type="range"
                                    min="3"
                                    max="21"
                                    value={tripDuration}
                                    onChange={(e) => setTripDuration(parseInt(e.target.value))}
                                    className="w-full"
                                />
                                <div className={`text-center mt-2 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {tripDuration} days
                                </div>
                            </div>

                            {/* Season */}
                            <div className="mb-6">
                                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    When are you traveling?
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {['spring', 'summer', 'autumn', 'winter'].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setSeason(s)}
                                            className={`py-3 px-4 rounded-xl font-medium capitalize transition-all ${season === s
                                                    ? 'bg-orange-500 text-white'
                                                    : isDarkMode
                                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {s === 'summer' && <Sun className="w-4 h-4 inline mr-2" />}
                                            {s === 'spring' && <Umbrella className="w-4 h-4 inline mr-2" />}
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Activities */}
                            <div className="mb-8">
                                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Planned Activities (select all that apply)
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {activityOptions.map(activity => (
                                        <button
                                            key={activity.id}
                                            onClick={() => toggleActivity(activity.id)}
                                            className={`py-3 px-4 rounded-xl font-medium flex items-center gap-2 transition-all ${activities.includes(activity.id)
                                                    ? 'bg-orange-500 text-white'
                                                    : isDarkMode
                                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {activity.icon}
                                            {activity.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={generateList}
                                className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                            >
                                <Sparkles className="w-5 h-5" />
                                Generate My Packing List
                            </button>
                        </motion.div>
                    ) : (
                        /* Packing List */
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {/* Progress Bar */}
                            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg mb-6`}>
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Packing Progress
                                    </span>
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {packedItems} / {totalItems} items
                                    </span>
                                </div>
                                <div className={`h-4 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercent}%` }}
                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                    />
                                </div>
                                <p className={`text-center mt-2 font-semibold ${progressPercent === 100 ? 'text-green-500' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {progressPercent === 100 ? '🎉 All packed! Ready for adventure!' : `${progressPercent}% complete`}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mb-6">
                                <button
                                    onClick={exportList}
                                    className={`flex-1 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${isDarkMode
                                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                                        }`}
                                >
                                    <Download className="w-4 h-4" />
                                    Export
                                </button>
                                <button
                                    onClick={() => {
                                        const url = window.location.href;
                                        navigator.clipboard.writeText(url);
                                        alert('Link copied!');
                                    }}
                                    className={`flex-1 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${isDarkMode
                                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                                        }`}
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                                <button
                                    onClick={() => {
                                        setIsGenerated(false);
                                        setCategories([]);
                                        localStorage.removeItem('packingList');
                                        localStorage.removeItem('packingListMeta');
                                    }}
                                    className={`py-3 px-4 rounded-xl font-medium ${isDarkMode
                                            ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                                        }`}
                                >
                                    Reset
                                </button>
                            </div>

                            {/* Add Custom Item */}
                            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-lg mb-6`}>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newItemName}
                                        onChange={(e) => setNewItemName(e.target.value)}
                                        placeholder="Add custom item..."
                                        className={`flex-1 px-4 py-2 rounded-xl border ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                            }`}
                                    />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className={`px-4 py-2 rounded-xl border ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                            }`}
                                    >
                                        <option value="">Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={addCustomItem}
                                        disabled={!newItemName.trim() || !selectedCategory}
                                        className={`px-4 py-2 rounded-xl ${newItemName.trim() && selectedCategory
                                                ? 'bg-orange-500 text-white hover:bg-orange-600'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {categories.map(category => (
                                        <motion.div
                                            key={category.id}
                                            layout
                                            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}
                                        >
                                            <div className={`p-4 flex items-center gap-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                                                    {category.icon}
                                                </div>
                                                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {category.name}
                                                </h3>
                                                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {category.items.filter(i => i.packed).length}/{category.items.length}
                                                </span>
                                            </div>
                                            <div className="p-4 space-y-2">
                                                {category.items.map(item => (
                                                    <motion.div
                                                        key={item.id}
                                                        layout
                                                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${item.packed
                                                                ? isDarkMode
                                                                    ? 'bg-green-900/20'
                                                                    : 'bg-green-50'
                                                                : isDarkMode
                                                                    ? 'bg-gray-700/50'
                                                                    : 'bg-gray-50'
                                                            }`}
                                                    >
                                                        <button
                                                            onClick={() => togglePacked(category.id, item.id)}
                                                            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${item.packed
                                                                    ? 'bg-green-500 border-green-500 text-white'
                                                                    : isDarkMode
                                                                        ? 'border-gray-500 hover:border-gray-400'
                                                                        : 'border-gray-300 hover:border-gray-400'
                                                                }`}
                                                        >
                                                            {item.packed && <Check className="w-4 h-4" />}
                                                        </button>
                                                        <span className={`flex-1 ${item.packed
                                                                ? 'line-through opacity-60'
                                                                : ''
                                                            } ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                            {item.name}
                                                            {item.quantity > 1 && (
                                                                <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                    (x{item.quantity})
                                                                </span>
                                                            )}
                                                        </span>
                                                        {item.essential && !item.packed && (
                                                            <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
                                                                Essential
                                                            </span>
                                                        )}
                                                        <button
                                                            onClick={() => removeItem(category.id, item.id)}
                                                            className={`p-1 rounded hover:bg-red-100 ${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PackingListPage;
