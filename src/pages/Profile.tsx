import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { auth } from '../config/firebase';
import { 
  Heart, 
  MessageSquare, 
  MapPin, 
  Plus, 
  Settings, 
  X, 
  Building2, 
  Compass, 
  Calendar, 
  Calculator, 
  Ship, 
  Sun, 
  Camera 
} from 'lucide-react';
import { generateProfileSEO } from '../utils/seo';
import Switch from '../components/ui/Switch';
import { Link } from 'react-router-dom';

interface PostData {
  id: string;
  imageUrl: string;
  description: string;
  location: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: Date;
}

interface ProfileData {
  phoneNumber: string;
  location: string;
  bio: string;
  website: string;
  interests: string[];
  followers: number;
  following: number;
  posts: PostData[];
  favorites?: {
    islands?: { id: string; name: string; slug: string; image: string; addedAt: Date }[];
    hotels?: { id: string; name: string; slug: string; image: string; location: string }[];
    activities?: { id: string; name: string; slug: string; image: string; location: string }[];
  };
  tripPlans?: {
    id: string;
    startDate: string;
    endDate: string;
    duration: number;
    islands: string[];
    estimatedBudget: number;
    notes: string;
  }[];
  diaryEntries?: {
    id: string;
    title: string;
    image: string;
    date: Date;
    location: string;
    content: string;
  }[];
}

// Mock posts data
const MOCK_POSTS: PostData[] = [
  {
    id: '1',
    imageUrl: 'https://source.unsplash.com/800x800/?santorini',
    description: 'Beautiful sunset in Santorini 🌅',
    location: 'Oia, Santorini',
    tags: ['sunset', 'greece', 'travel'],
    likes: 124,
    comments: 12,
    createdAt: new Date('2024-03-10')
  },
  {
    id: '2',
    imageUrl: 'https://source.unsplash.com/800x800/?mykonos',
    description: 'Exploring the streets of Mykonos 🏰',
    location: 'Mykonos Town',
    tags: ['mykonos', 'greece', 'architecture'],
    likes: 98,
    comments: 8,
    createdAt: new Date('2024-03-08')
  },
  {
    id: '3',
    imageUrl: 'https://source.unsplash.com/800x800/?beach,greece',
    description: 'Paradise found 🏖️',
    location: 'Naxos',
    tags: ['beach', 'summer', 'island'],
    likes: 156,
    comments: 15,
    createdAt: new Date('2024-03-05')
  }
];

// Create Post Modal Component
const CreatePostModal = ({ isOpen, onClose, onSubmit }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (post: Omit<PostData, 'id' | 'likes' | 'comments' | 'createdAt'>) => void; 
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      imageUrl,
      description,
      location,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    });
    setImageUrl('');
    setDescription('');
    setLocation('');
    setTags('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Post</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Write a caption..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Add location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Add tags separated by commas"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Profile() {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateTripModalOpen, setIsCreateTripModalOpen] = useState(false);
  const [isCreateDiaryModalOpen, setIsCreateDiaryModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    phoneNumber: '+30 123 456 7890',
    location: 'Athens, Greece',
    bio: 'Travel enthusiast | Photography lover | Greek island hopper',
    website: 'www.greececyclades.com',
    interests: ['Travel', 'Photography', 'Culture', 'Food'],
    followers: 1234,
    following: 567,
    posts: MOCK_POSTS,
    favorites: {
      islands: [
        { id: '1', name: 'Santorini', slug: 'santorini', image: 'https://source.unsplash.com/800x800/?santorini', addedAt: new Date('2024-03-10') },
        { id: '2', name: 'Mykonos', slug: 'mykonos', image: 'https://source.unsplash.com/800x800/?mykonos', addedAt: new Date('2024-03-08') },
        { id: '3', name: 'Naxos', slug: 'naxos', image: 'https://source.unsplash.com/800x800/?beach,greece', addedAt: new Date('2024-03-05') },
      ],
      hotels: [
        { id: '1', name: 'Hotel Santorini', slug: 'hotel-santorini', image: 'https://source.unsplash.com/800x800/?hotel', location: 'Santorini' },
        { id: '2', name: 'Hotel Mykonos', slug: 'hotel-mykonos', image: 'https://source.unsplash.com/800x800/?hotel', location: 'Mykonos' },
        { id: '3', name: 'Hotel Naxos', slug: 'hotel-naxos', image: 'https://source.unsplash.com/800x800/?hotel', location: 'Naxos' },
      ],
      activities: [
        { id: '1', name: 'Snorkeling in Santorini', slug: 'snorkeling-santorini', image: 'https://source.unsplash.com/800x800/?snorkeling', location: 'Santorini' },
        { id: '2', name: 'Hiking in Mykonos', slug: 'hiking-mykonos', image: 'https://source.unsplash.com/800x800/?hiking', location: 'Mykonos' },
        { id: '3', name: 'Beach Relaxation in Naxos', slug: 'beach-relaxation-naxos', image: 'https://source.unsplash.com/800x800/?beach', location: 'Naxos' },
      ],
    },
    tripPlans: [
      {
        id: '1',
        startDate: '2024-03-10',
        endDate: '2024-03-15',
        duration: 5,
        islands: ['Santorini', 'Mykonos'],
        estimatedBudget: 1000,
        notes: 'This is a sample trip plan',
      },
      {
        id: '2',
        startDate: '2024-03-15',
        endDate: '2024-03-20',
        duration: 5,
        islands: ['Naxos', 'Paros'],
        estimatedBudget: 1200,
        notes: 'This is another sample trip plan',
      },
    ],
    diaryEntries: [
      {
        id: '1',
        title: 'Day 1 in Santorini',
        image: 'https://source.unsplash.com/800x800/?santorini',
        date: new Date('2024-03-10'),
        location: 'Santorini',
        content: 'This is a sample diary entry',
      },
      {
        id: '2',
        title: 'Day 2 in Mykonos',
        image: 'https://source.unsplash.com/800x800/?mykonos',
        date: new Date('2024-03-11'),
        location: 'Mykonos',
        content: 'This is another sample diary entry',
      },
    ],
  });

  const user = auth.currentUser;

  const handlePhotoChange = () => {
    // Implement photo change logic
  };

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/auth');
    }
  }, [navigate]);

  const handleCreatePost = (postData: Omit<PostData, 'id' | 'likes' | 'comments' | 'createdAt'>) => {
    const newPost: PostData = {
      ...postData,
      id: Date.now().toString(),
      likes: 0,
      comments: 0,
      createdAt: new Date()
    };
    setProfileData(prev => ({
      ...prev,
      posts: [newPost, ...prev.posts]
    }));
  };

  if (!auth.currentUser) return null;

  return (
    <>
      <SEO {...generateProfileSEO()} />
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Profile Header */}
        <div className="pt-8 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src="https://instagram.fath3-4.fna.fbcdn.net/v/t51.2885-19/469222829_895249452726168_4100497481490358698_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_ht=instagram.fath3-4.fna.fbcdn.net&_nc_cat=100&_nc_ohc=_FexR_LiFocQ7kNvgGKVoMV&_nc_gid=1372eba398d84e38aa9e34d48e7ea14c&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYAHAPOyY2QgI1Ag8bKVa9HJm40zjPuzfo9E1yP82YYGLA&oe=67563951&_nc_sid=8b3546"
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button 
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                    onClick={handlePhotoChange}
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                    <p className="text-gray-500 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {profileData.location}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                      Edit Profile
                    </button>
                    <Link 
                      to="/ferry-tracking"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Ship className="w-4 h-4 mr-2" />
                      Ferry Tracking
                    </Link>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-6">
                  <div className="text-center">
                    <div className="text-xl font-semibold">{profileData.posts.length}</div>
                    <div className="text-gray-500">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold">{profileData.followers}</div>
                    <div className="text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold">{profileData.following}</div>
                    <div className="text-gray-500">Following</div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700">{profileData.bio}</p>
                  <a href={`https://${profileData.website}`} className="text-blue-500 hover:underline mt-1 block">
                    {profileData.website}
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Profile content goes here */}
          </div>
        </div>

        {/* Favorites Section */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold">My Favorites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Favorite Islands
                </h3>
                <div className="space-y-2">
                  {profileData.favorites?.islands?.map((island) => (
                    <div 
                      key={island.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                    >
                      <img 
                        src={island.image} 
                        alt={island.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{island.name}</div>
                        <div className="text-sm text-gray-500">Added {new Date(island.addedAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  Favorite Hotels
                </h3>
                <div className="space-y-2">
                  {profileData.favorites?.hotels?.map((hotel) => (
                    <div 
                      key={hotel.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                    >
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{hotel.name}</div>
                        <div className="text-sm text-gray-500">{hotel.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Compass className="w-5 h-5 text-green-500" />
                  Saved Activities
                </h3>
                <div className="space-y-2">
                  {profileData.favorites?.activities?.map((activity) => (
                    <div 
                      key={activity.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                    >
                      <img 
                        src={activity.image} 
                        alt={activity.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{activity.name}</div>
                        <div className="text-sm text-gray-500">{activity.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Trip Cost Calculator Card */}
            <button 
              onClick={() => setIsCalculatorOpen(true)}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Calculator className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Trip Cost Calculator</h3>
                <p className="text-sm text-gray-500">Plan your budget</p>
              </div>
            </button>

            {/* Ferry Routes Card */}
            <Link 
              to="/ferry-tracking"
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <Ship className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Ferry Tracking</h3>
                <p className="text-sm text-gray-500">Track ferries in real-time</p>
              </div>
            </Link>

            {/* Weather Forecast Card */}
            <button className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                <Sun className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Weather Forecast</h3>
                <p className="text-sm text-gray-500">7-day forecast</p>
              </div>
            </button>
          </div>
        </div>

        {/* Stories Section */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
          <h2 className="text-2xl font-bold mb-6">Stories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Add Story Button */}
            <button className="relative w-full aspect-square rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 hover:border-blue-500 transition-colors group">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-500" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-blue-500 mt-2">Add Story</span>
              </div>
            </button>
            {/* Story Previews */}
            {[1, 2, 3, 4, 5].map((story) => (
              <button key={story} className="relative w-full aspect-square rounded-xl overflow-hidden group">
                <img 
                  src={`https://source.unsplash.com/800x800/?greece,travel&${story}`} 
                  alt={`Story ${story}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Story {story}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trip Planning Section */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Trip Plans</h2>
              <button 
                onClick={() => setIsCreateTripModalOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Trip
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileData.tripPlans?.map((trip) => (
                <div key={trip.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">{trip.startDate} - {trip.endDate}</span>
                    </div>
                    <span className="text-sm text-gray-500">{trip.duration} days</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium mb-1">Islands</div>
                      <div className="flex flex-wrap gap-2">
                        {trip.islands.map((island) => (
                          <span key={island} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                            {island}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-1">Estimated Budget</div>
                      <div className="text-gray-600">€{trip.estimatedBudget}</div>
                    </div>
                    <div>
                      <div className="font-medium mb-1">Notes</div>
                      <div className="text-gray-600 text-sm">{trip.notes}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Diary Section */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Travel Diary</h2>
              <button 
                onClick={() => setIsCreateDiaryModalOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Entry
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileData.diaryEntries?.map((entry) => (
                <div key={entry.id} className="border rounded-lg overflow-hidden">
                  <img 
                    src={entry.image} 
                    alt={entry.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{entry.title}</h3>
                      <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{entry.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">{entry.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePost}
        />

        {/* Create Trip Modal */}
        {isCreateTripModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Create New Trip</h3>
                <button onClick={() => setIsCreateTripModalOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Islands</label>
                  <select multiple className="w-full rounded-lg border border-gray-300 px-3 py-2">
                    <option>Santorini</option>
                    <option>Mykonos</option>
                    <option>Naxos</option>
                    <option>Paros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget (€)</label>
                  <input type="number" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea className="w-full rounded-lg border border-gray-300 px-3 py-2" rows={4} />
                </div>
                <div className="flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsCreateTripModalOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Create Trip
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Diary Entry Modal */}
        {isCreateDiaryModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Add Diary Entry</h3>
                <button onClick={() => setIsCreateDiaryModalOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
                  <input type="file" accept="image/*" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea className="w-full rounded-lg border border-gray-300 px-3 py-2" rows={6} />
                </div>
                <div className="flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsCreateDiaryModalOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Settings Menu */}
        {isSettingsOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Settings</h3>
                <button onClick={() => setIsSettingsOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Account Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-gray-500">Get updates about your trips</div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Dark Mode</div>
                        <div className="text-sm text-gray-500">Toggle dark theme</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Privacy</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Profile Visibility</div>
                        <div className="text-sm text-gray-500">Who can see your profile</div>
                      </div>
                      <select className="rounded-lg border border-gray-300 px-3 py-2">
                        <option>Everyone</option>
                        <option>Friends Only</option>
                        <option>Private</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Language & Region</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                      <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                        <option>English</option>
                        <option>Greek</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                        <option>EUR (€)</option>
                        <option>USD ($)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trip Cost Calculator Modal */}
        {isCalculatorOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Trip Cost Calculator</h3>
                <button onClick={() => setIsCalculatorOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Transportation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Flights</label>
                      <input type="number" className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="€" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ferry Tickets</label>
                      <input type="number" className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="€" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Car Rental</label>
                      <input type="number" className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="€" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Accommodation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hotels</label>
                      <input type="number" className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="€" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Activities & Food</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Activities & Tours</label>
                      <input type="number" className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="€" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Food & Dining</label>
                      <input type="number" className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="€" />
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Estimated Cost</span>
                    <span>€0</span>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsCalculatorOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    Close
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save Estimate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
