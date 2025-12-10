import React, { useState, useEffect } from 'react';
import {
    Users,
    Vote,
    Calculator,
    Share2,
    Copy,
    Check,
    Plus,
    X,
    Calendar,
    MapPin,
    ThumbsUp,
    ThumbsDown,
    MessageCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { cyclades } from '../data/cyclades';

interface Participant {
    id: string;
    name: string;
    avatar: string;
    role: 'organizer' | 'member';
}

interface VoteItem {
    id: string;
    type: 'island' | 'activity' | 'restaurant';
    name: string;
    votes: { up: number; down: number };
    userVote?: 'up' | 'down' | null;
}

interface Expense {
    id: string;
    description: string;
    amount: number;
    paidBy: string;
    splitWith: string[];
}

const GroupTripPage: React.FC = () => {
    const { id } = useParams();
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const [activeTab, setActiveTab] = useState<'itinerary' | 'voting' | 'expenses' | 'chat'>('itinerary');
    const [inviteCode] = useState('CYCLADES-2024');
    const [copied, setCopied] = useState(false);

    // Mock data
    const [participants] = useState<Participant[]>([
        { id: '1', name: 'You', avatar: '👤', role: 'organizer' },
        { id: '2', name: 'Maria', avatar: '👩', role: 'member' },
        { id: '3', name: 'John', avatar: '👨', role: 'member' },
        { id: '4', name: 'Elena', avatar: '👩‍🦱', role: 'member' },
    ]);

    const [voteItems, setVoteItems] = useState<VoteItem[]>([
        { id: 'v1', type: 'island', name: 'Santorini', votes: { up: 4, down: 0 }, userVote: 'up' },
        { id: 'v2', type: 'island', name: 'Mykonos', votes: { up: 2, down: 1 }, userVote: null },
        { id: 'v3', type: 'activity', name: 'Caldera Cruise', votes: { up: 3, down: 0 }, userVote: 'up' },
        { id: 'v4', type: 'restaurant', name: 'Sunset Taverna', votes: { up: 2, down: 1 }, userVote: null },
    ]);

    const [expenses, setExpenses] = useState<Expense[]>([
        { id: 'e1', description: 'Ferry tickets', amount: 160, paidBy: 'You', splitWith: ['Maria', 'John', 'Elena'] },
        { id: 'e2', description: 'Hotel deposit', amount: 400, paidBy: 'Maria', splitWith: ['You', 'John', 'Elena'] },
    ]);

    const copyInviteLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/group/join/${inviteCode}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleVote = (itemId: string, vote: 'up' | 'down') => {
        setVoteItems(prev =>
            prev.map(item => {
                if (item.id !== itemId) return item;

                const newVotes = { ...item.votes };
                if (item.userVote === vote) {
                    // Remove vote
                    newVotes[vote]--;
                    return { ...item, votes: newVotes, userVote: null };
                } else {
                    // Change or add vote
                    if (item.userVote) newVotes[item.userVote]--;
                    newVotes[vote]++;
                    return { ...item, votes: newVotes, userVote: vote };
                }
            })
        );
    };

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const perPerson = totalExpenses / participants.length;

    return (
        <>
            <SEO
                title="Group Trip | Discover Cyclades"
                description="Plan your group trip to the Cyclades with voting, expense splitting, and shared itinerary."
            />

            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {/* Header */}
                <div className={`${isDarkMode ? 'bg-gradient-to-r from-indigo-900 to-blue-900' : 'bg-gradient-to-r from-indigo-600 to-blue-600'} text-white py-12 px-4`}>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-8 h-8" />
                            <h1 className="text-3xl md:text-4xl font-bold">Cyclades Summer Trip 2024</h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                July 15-25, 2024
                            </span>
                            <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {participants.length} travelers
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                3 islands
                            </span>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Invite Card */}
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-lg mb-6`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Invite Code</p>
                                <p className={`font-mono font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {inviteCode}
                                </p>
                            </div>
                            <button
                                onClick={copyInviteLink}
                                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${copied
                                        ? 'bg-green-500 text-white'
                                        : isDarkMode
                                            ? 'bg-gray-700 text-white hover:bg-gray-600'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                {copied ? 'Copied!' : 'Copy Invite'}
                            </button>
                        </div>
                    </div>

                    {/* Participants */}
                    <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                        {participants.map(p => (
                            <div
                                key={p.id}
                                className={`flex-shrink-0 flex flex-col items-center gap-1 p-3 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    } shadow`}
                            >
                                <span className="text-2xl">{p.avatar}</span>
                                <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{p.name}</span>
                                {p.role === 'organizer' && (
                                    <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                                        Organizer
                                    </span>
                                )}
                            </div>
                        ))}
                        <button className={`flex-shrink-0 flex flex-col items-center justify-center gap-1 p-3 rounded-xl border-2 border-dashed ${isDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'
                            } hover:border-indigo-500 hover:text-indigo-500 transition-colors`}>
                            <Plus className="w-6 h-6" />
                            <span className="text-sm">Invite</span>
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}>
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            {['itinerary', 'voting', 'expenses', 'chat'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`flex-1 py-4 px-4 text-sm font-medium capitalize transition-all ${activeTab === tab
                                            ? isDarkMode
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                                            : isDarkMode
                                                ? 'text-gray-400 hover:text-white'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    {tab === 'voting' && <Vote className="w-4 h-4 inline mr-1" />}
                                    {tab === 'expenses' && <Calculator className="w-4 h-4 inline mr-1" />}
                                    {tab === 'chat' && <MessageCircle className="w-4 h-4 inline mr-1" />}
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="p-6">
                            {/* Voting Tab */}
                            {activeTab === 'voting' && (
                                <div className="space-y-4">
                                    <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Vote on activities and destinations for the trip
                                    </p>
                                    {voteItems.map(item => (
                                        <div
                                            key={item.id}
                                            className={`flex items-center justify-between p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                                }`}
                                        >
                                            <div>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${item.type === 'island' ? 'bg-blue-100 text-blue-700' :
                                                        item.type === 'activity' ? 'bg-green-100 text-green-700' :
                                                            'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {item.type}
                                                </span>
                                                <p className={`font-medium mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {item.name}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleVote(item.id, 'up')}
                                                    className={`p-2 rounded-lg flex items-center gap-1 ${item.userVote === 'up'
                                                            ? 'bg-green-500 text-white'
                                                            : isDarkMode
                                                                ? 'bg-gray-600 text-gray-300 hover:bg-green-600'
                                                                : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                                                        }`}
                                                >
                                                    <ThumbsUp className="w-4 h-4" />
                                                    {item.votes.up}
                                                </button>
                                                <button
                                                    onClick={() => handleVote(item.id, 'down')}
                                                    className={`p-2 rounded-lg flex items-center gap-1 ${item.userVote === 'down'
                                                            ? 'bg-red-500 text-white'
                                                            : isDarkMode
                                                                ? 'bg-gray-600 text-gray-300 hover:bg-red-600'
                                                                : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                                                        }`}
                                                >
                                                    <ThumbsDown className="w-4 h-4" />
                                                    {item.votes.down}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Expenses Tab */}
                            {activeTab === 'expenses' && (
                                <div>
                                    <div className={`p-4 rounded-xl mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                                        <div className="grid grid-cols-2 gap-4 text-center">
                                            <div>
                                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Expenses</p>
                                                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    €{totalExpenses}
                                                </p>
                                            </div>
                                            <div>
                                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Per Person</p>
                                                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    €{perPerson.toFixed(0)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {expenses.map(expense => (
                                            <div
                                                key={expense.id}
                                                className={`flex items-center justify-between p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                                    }`}
                                            >
                                                <div>
                                                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        {expense.description}
                                                    </p>
                                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        Paid by {expense.paidBy}
                                                    </p>
                                                </div>
                                                <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    €{expense.amount}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <button className={`w-full mt-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${isDarkMode
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                            : 'bg-indigo-500 text-white hover:bg-indigo-600'
                                        }`}>
                                        <Plus className="w-5 h-5" />
                                        Add Expense
                                    </button>
                                </div>
                            )}

                            {/* Itinerary Tab */}
                            {activeTab === 'itinerary' && (
                                <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>Use the Island Hopping Planner to create your shared itinerary</p>
                                    <a
                                        href="/planner"
                                        className="inline-block mt-4 px-6 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600"
                                    >
                                        Open Planner
                                    </a>
                                </div>
                            )}

                            {/* Chat Tab */}
                            {activeTab === 'chat' && (
                                <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>Group chat coming soon!</p>
                                    <p className="text-sm mt-2">For now, use WhatsApp or your preferred messaging app</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupTripPage;
