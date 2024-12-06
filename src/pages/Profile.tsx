import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { auth } from '../config/firebase';
import { Heart, MessageSquare, MapPin, Plus, Settings, X } from 'lucide-react';
import { generateProfileSEO } from '../utils/seo';

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

export default function Profile() {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    phoneNumber: '+30 123 456 7890',
    location: 'Athens, Greece',
    bio: 'Travel enthusiast | Photography lover | Greek island hopper',
    website: 'www.greececyclades.com',
    interests: ['Travel', 'Photography', 'Culture', 'Food'],
    followers: 1234,
    following: 567,
    posts: MOCK_POSTS
  });

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
      <div className="min-h-screen bg-gray-50">
        {/* Profile Header */}
        <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <img
                  src="https://instagram.fath3-4.fna.fbcdn.net/v/t51.2885-19/469222829_895249452726168_4100497481490358698_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_ht=instagram.fath3-4.fna.fbcdn.net&_nc_cat=100&_nc_ohc=_FexR_LiFocQ7kNvgGKVoMV&_nc_gid=1372eba398d84e38aa9e34d48e7ea14c&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYAHAPOyY2QgI1Ag8bKVa9HJm40zjPuzfo9E1yP82YYGLA&oe=67563951&_nc_sid=8b3546"
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-grow space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {auth.currentUser.displayName || 'User'}
                  </h1>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Post
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-xl font-semibold">{profileData.posts.length}</div>
                    <div className="text-sm text-gray-500">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold">{profileData.followers}</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold">{profileData.following}</div>
                    <div className="text-sm text-gray-500">Following</div>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <p className="text-gray-700">{profileData.bio}</p>
                  <p className="text-blue-600 hover:underline cursor-pointer">
                    {profileData.website}
                  </p>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profileData.location}
                  </div>
                </div>

                {/* Interests */}
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileData.posts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative pb-[100%]">
                  <img
                    src={post.imageUrl}
                    alt={post.description}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {post.location}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center text-gray-500">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </span>
                      <span className="flex items-center text-gray-500">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{post.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-blue-600 text-sm hover:underline cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePost}
        />
      </div>
    </>
  );
}
