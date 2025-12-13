import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import SEO from '../components/SEO';
import {
    Sparkles,
    Sun,
    Moon,
    Heart,
    Users,
    Wallet,
    Camera,
    Utensils,
    Waves,
    Music,
    Mountain,
    ChevronRight,
    RotateCcw,
    MapPin
} from 'lucide-react';

// Quiz questions with weighted answers
const quizData = {
    questions: [
        {
            id: 'vibe',
            icon: Sparkles,
            answers: [
                { id: 'romantic', icon: Heart, islands: ['santorini', 'folegandros', 'sifnos'] },
                { id: 'party', icon: Music, islands: ['mykonos', 'ios', 'paros'] },
                { id: 'adventure', icon: Mountain, islands: ['naxos', 'amorgos', 'serifos'] },
                { id: 'authentic', icon: Utensils, islands: ['sifnos', 'tinos', 'syros'] },
            ]
        },
        {
            id: 'travel',
            icon: Users,
            answers: [
                { id: 'couple', islands: ['santorini', 'folegandros', 'milos'] },
                { id: 'solo', islands: ['naxos', 'paros', 'ios'] },
                { id: 'family', islands: ['naxos', 'paros', 'antiparos'] },
                { id: 'friends', islands: ['mykonos', 'paros', 'ios'] },
            ]
        },
        {
            id: 'budget',
            icon: Wallet,
            answers: [
                { id: 'budget', islands: ['naxos', 'sifnos', 'serifos', 'koufonisia'] },
                { id: 'midRange', islands: ['paros', 'milos', 'tinos'] },
                { id: 'luxury', islands: ['santorini', 'mykonos'] },
                { id: 'flexible', islands: ['paros', 'naxos', 'milos'] },
            ]
        },
        {
            id: 'priority',
            icon: Camera,
            answers: [
                { id: 'beaches', icon: Waves, islands: ['milos', 'koufonisia', 'naxos'] },
                { id: 'food', icon: Utensils, islands: ['sifnos', 'tinos', 'naxos'] },
                { id: 'sunsets', icon: Sun, islands: ['santorini', 'folegandros', 'milos'] },
                { id: 'nightlife', icon: Moon, islands: ['mykonos', 'ios', 'paros'] },
            ]
        },
        {
            id: 'crowd',
            icon: MapPin,
            answers: [
                { id: 'popular', islands: ['santorini', 'mykonos', 'paros'] },
                { id: 'balanced', islands: ['naxos', 'milos', 'paros'] },
                { id: 'offPath', islands: ['folegandros', 'serifos', 'sifnos'] },
                { id: 'hidden', islands: ['koufonisia', 'sikinos', 'anafi'] },
            ]
        }
    ]
};

// Island data for results
const islandData: Record<string, { image: string; slug: string }> = {
    santorini: { image: '/images/islands/santorini/hero.jpg', slug: 'santorini' },
    mykonos: { image: '/images/islands/mykonos/hero.webp', slug: 'mykonos' },
    naxos: { image: '/images/islands/naxos/hero.webp', slug: 'naxos' },
    paros: { image: '/images/islands/paros/hero.webp', slug: 'paros' },
    milos: { image: '/images/islands/milos/hero.webp', slug: 'milos' },
    sifnos: { image: '/images/islands/sifnos/hero.webp', slug: 'sifnos' },
    folegandros: { image: '/images/islands/folegandros/hero.webp', slug: 'folegandros' },
    ios: { image: '/images/islands/ios/hero.webp', slug: 'ios' },
    tinos: { image: '/images/islands/tinos/hero.webp', slug: 'tinos' },
    serifos: { image: '/images/islands/serifos/hero.webp', slug: 'serifos' },
    koufonisia: { image: '/images/islands/koufonisia/hero.webp', slug: 'koufonisia' },
    amorgos: { image: '/images/islands/amorgos/hero.webp', slug: 'amorgos' },
    syros: { image: '/images/islands/syros/hero.webp', slug: 'syros' },
    antiparos: { image: '/images/islands/antiparos/hero.webp', slug: 'antiparos' },
    sikinos: { image: '/images/islands/sikinos/hero.webp', slug: 'sikinos' },
    anafi: { image: '/images/islands/anafi/hero.webp', slug: 'anafi' },
};

export default function IslandQuiz() {
    const { t } = useTranslation();
    const { resolvedTheme } = useTheme();
    const navigate = useNavigate();
    const isDark = resolvedTheme === 'dark';

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedIslands, setSelectedIslands] = useState<string[]>([]);

    const handleAnswer = (answerId: string, islands: string[]) => {
        const newAnswers = [...answers, answerId];
        setAnswers(newAnswers);

        // Track island scores
        const allIslands = [...selectedIslands, ...islands];
        setSelectedIslands(allIslands);

        if (currentQuestion < quizData.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate results
            calculateResults(allIslands);
        }
    };

    const calculateResults = (allIslands: string[]) => {
        // Count island occurrences
        const islandCounts: Record<string, number> = {};
        allIslands.forEach(island => {
            islandCounts[island] = (islandCounts[island] || 0) + 1;
        });

        // Sort by count and get top 3
        const sorted = Object.entries(islandCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([island]) => island);

        setSelectedIslands(sorted);
        setShowResults(true);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResults(false);
        setSelectedIslands([]);
    };

    const question = quizData.questions[currentQuestion];
    const QuestionIcon = question?.icon;

    return (
        <>
            <SEO
                title={t('quiz.meta.title')}
                description={t('quiz.meta.description')}
                pageType="general"
            />

            <div className={`min-h-screen transition-colors duration-300 ${isDark
                ? 'bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg'
                : 'bg-gradient-to-b from-blue-50 via-white to-blue-50'
                }`}>

                {/* Hero Header */}
                <div className={`relative py-16 px-4 text-center ${isDark ? 'bg-dark-card/50' : 'bg-gradient-to-r from-primary-500 to-accent-500'
                    }`}>
                    <div className="max-w-3xl mx-auto">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${isDark ? 'bg-primary-500/20 text-primary-400' : 'bg-white/20 text-white'
                            }`}>
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">{t('quiz.badge')}</span>
                        </div>

                        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-white'
                            }`}>
                            {t('quiz.title')}
                        </h1>

                        <p className={`text-lg md:text-xl ${isDark ? 'text-dark-muted' : 'text-white/90'
                            }`}>
                            {t('quiz.subtitle')}
                        </p>
                    </div>
                </div>

                {/* Quiz Content */}
                <div className="max-w-3xl mx-auto px-4 py-12">

                    {!showResults ? (
                        <>
                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className={isDark ? 'text-dark-muted' : 'text-gray-600'}>
                                        {t('quiz.questionOf', { current: currentQuestion + 1, total: quizData.questions.length })}
                                    </span>
                                    <span className={isDark ? 'text-primary-400' : 'text-primary-600'}>
                                        {Math.round(((currentQuestion + 1) / quizData.questions.length) * 100)}%
                                    </span>
                                </div>
                                <div className={`h-2 rounded-full ${isDark ? 'bg-dark-border' : 'bg-gray-200'}`}>
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
                                        style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Question Card */}
                            <div className={`rounded-2xl p-8 mb-8 ${isDark
                                ? 'bg-dark-card border border-dark-border'
                                : 'bg-white shadow-xl'
                                }`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 rounded-xl ${isDark ? 'bg-primary-500/20' : 'bg-primary-100'
                                        }`}>
                                        {QuestionIcon && <QuestionIcon className={`w-6 h-6 ${isDark ? 'text-primary-400' : 'text-primary-600'
                                            }`} />}
                                    </div>
                                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        {t(`quiz.questions.${question.id}.question`)}
                                    </h2>
                                </div>

                                {/* Answer Options */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {question.answers.map((answer) => {
                                        const AnswerIcon = 'icon' in answer ? answer.icon : null;
                                        return (
                                            <button
                                                key={answer.id}
                                                onClick={() => handleAnswer(answer.id, answer.islands)}
                                                className={`group p-5 rounded-xl text-left transition-all duration-300 ${isDark
                                                    ? 'bg-dark-bg border border-dark-border hover:border-primary-500 hover:bg-primary-500/10'
                                                    : 'bg-gray-50 border-2 border-transparent hover:border-primary-500 hover:bg-primary-50'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {AnswerIcon && (
                                                        <AnswerIcon className={`w-5 h-5 ${isDark ? 'text-primary-400' : 'text-primary-600'
                                                            }`} />
                                                    )}
                                                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'
                                                        }`}>
                                                        {t(`quiz.questions.${question.id}.answers.${answer.id}`)}
                                                    </span>
                                                    <ChevronRight className={`w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-primary-400' : 'text-primary-600'
                                                        }`} />
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Results Section */
                        <div className={`rounded-2xl p-8 ${isDark
                            ? 'bg-dark-card border border-dark-border'
                            : 'bg-white shadow-xl'
                            }`}>
                            <div className="text-center mb-8">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${isDark ? 'bg-accent-500/20 text-accent-400' : 'bg-accent-100 text-accent-600'
                                    }`}>
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-sm font-medium">{t('quiz.results.badge')}</span>
                                </div>

                                <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {t('quiz.results.title')}
                                </h2>

                                <p className={`text-lg ${isDark ? 'text-dark-muted' : 'text-gray-600'
                                    }`}>
                                    {t('quiz.results.subtitle')}
                                </p>
                            </div>

                            {/* Top Island Matches */}
                            <div className="space-y-4 mb-8">
                                {selectedIslands.map((island, index) => (
                                    <div
                                        key={island}
                                        onClick={() => navigate(`/guides/${islandData[island]?.slug || island}`)}
                                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${isDark
                                            ? 'bg-dark-bg border border-dark-border hover:border-primary-500'
                                            : 'bg-gray-50 hover:bg-primary-50'
                                            }`}
                                    >
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${index === 0
                                            ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
                                            : index === 1
                                                ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                                                : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
                                            }`}>
                                            #{index + 1}
                                        </div>

                                        <div className="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden">
                                            <img
                                                src={islandData[island]?.image || '/images/placeholder.jpg'}
                                                alt={island}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className={`font-bold text-lg capitalize ${isDark ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                {t(`islands.${island}`)}
                                            </h3>
                                            <p className={`text-sm ${isDark ? 'text-dark-muted' : 'text-gray-600'
                                                }`}>
                                                {t(`quiz.results.matchText.${index === 0 ? 'perfect' : index === 1 ? 'great' : 'good'}`)}
                                            </p>
                                        </div>

                                        <ChevronRight className={`w-5 h-5 ${isDark ? 'text-dark-muted' : 'text-gray-400'
                                            }`} />
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={resetQuiz}
                                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${isDark
                                        ? 'bg-dark-bg border border-dark-border text-white hover:bg-dark-border'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    {t('quiz.results.retake')}
                                </button>

                                <button
                                    onClick={() => navigate(`/guides/${islandData[selectedIslands[0]]?.slug || selectedIslands[0]}`)}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:opacity-90 transition-opacity"
                                >
                                    {t('quiz.results.exploreTop')}
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
