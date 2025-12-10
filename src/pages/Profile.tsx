import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
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
  Camera,
  Edit3,
  Share2,
  Trophy,
  Target,
  TrendingUp,
  Star,
  Users,
  Globe,
  Bookmark,
  CheckCircle,
  Zap,
  Crown,
  Map,
  Route,
  Waves,
  Wind,
  Coffee,
  Camera as CameraIcon,
  Image as ImageIcon,
  DollarSign
} from 'lucide-react';
import { generateProfileSEO } from '../utils/seo';
import { Switch } from '../components/ui/Switch';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { ProfileService, type Profile, type Post, type Favorite, type TripPlan, type DiaryEntry } from '../services/profileService';

interface UserStats {
  postsCount: number;
  favoritesCount: number;
  tripPlansCount: number;
  diaryEntriesCount: number;
  totalLikes: number;
  totalComments: number;
}


// Create Post Modal Component
const CreatePostModal = ({ onCreatePost, isUploading }: { 
  onCreatePost: (post: { description: string; location: string; tags: string[]; file?: File }) => void;
  isUploading: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    onCreatePost({
      description,
      location,
      tags,
      file: selectedFile
    });
    
    // Reset form
    setDescription('');
    setLocation('');
    setTags([]);
    setTagInput('');
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsOpen(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Create Post
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Create New Post</h3>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
              required
            />
            {previewUrl && (
              <img src={previewUrl} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-lg" />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Where was this taken?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isUploading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditProfileModal = ({ 
  profile, 
  onUpdateProfile, 
  onClose, 
  isUploading 
}: { 
  profile: any; 
  onUpdateProfile: (data: any) => void; 
  onClose: () => void; 
  isUploading: boolean; 
}) => {
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    website: profile?.website || '',
    phone_number: profile?.phone_number || '',
    interests: profile?.interests || []
  });
  const [interestInput, setInterestInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('EditProfileModal form submitted with data:', formData);
    onUpdateProfile(formData);
  };

  const addInterest = () => {
    if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interestInput.trim()]
      });
      setInterestInput('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((interest: string) => interest !== interestToRemove)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Edit Profile</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Where are you based?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="your-website.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="+30 123 456 7890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Add an interest"
              />
              <button
                type="button"
                onClick={addInterest}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest: string) => (
                <span
                  key={interest}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isUploading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, loading, initialized, initialize } = useAuthStore();
  
  // Modal states
  const [isCreateTripModalOpen, setIsCreateTripModalOpen] = useState(false);
  const [isCreateDiaryModalOpen, setIsCreateDiaryModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  
  // UI states
  const [activeTab, setActiveTab] = useState('overview');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Data states
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [tripPlans, setTripPlans] = useState<TripPlan[]>([]);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  // Load user data from Supabase
  const loadUserData = async () => {
    if (!user?.id) return;
    
    setDataLoading(true);
    try {
      const [userProfile, userPosts, userFavorites, userTripPlans, userDiaryEntries, userStats] = await Promise.all([
        ProfileService.getProfile(user.id),
        ProfileService.getUserPosts(user.id),
        ProfileService.getUserFavorites(user.id),
        ProfileService.getUserTripPlans(user.id),
        ProfileService.getUserDiaryEntries(user.id),
        ProfileService.getUserStats(user.id)
      ]);

      setProfile(userProfile);
      setPosts(userPosts);
      setFavorites(userFavorites);
      setTripPlans(userTripPlans);
      setDiaryEntries(userDiaryEntries);
      setStats(userStats);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handlePhotoChange = async () => {
    if (!user?.id) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          const avatarUrl = await ProfileService.uploadAvatar(user.id, file);
          if (avatarUrl) {
            await ProfileService.updateProfile(user.id, { avatar_url: avatarUrl });
            setProfile(prev => prev ? { ...prev, avatar_url: avatarUrl } : null);
            alert('Profile photo updated successfully!');
          }
        } catch (error) {
          console.error('Error uploading avatar:', error);
          alert('Failed to update profile photo. Please try again.');
        } finally {
          setIsUploading(false);
        }
      }
    };
    input.click();
  };

  const handleCreatePost = async (postData: { description: string; location: string; tags: string[]; file?: File }) => {
    if (!user?.id || !postData.file) return;
    
    setIsUploading(true);
    try {
      // Upload image first
      const imageUrl = await ProfileService.uploadPostImage(user.id, postData.file);
      if (!imageUrl) throw new Error('Failed to upload image');
      
      // Create post
      const newPost = await ProfileService.createPost({
        user_id: user.id,
        image_url: imageUrl,
        description: postData.description,
        location: postData.location || null,
        tags: postData.tags.length > 0 ? postData.tags : null,
        likes_count: 0,
        comments_count: 0
      });
      
      if (newPost) {
        setPosts(prev => [newPost, ...prev]);
        setStats(prev => prev ? { ...prev, postsCount: prev.postsCount + 1 } : null);
        alert('Post created successfully!');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateProfile = async (profileData: { full_name?: string; bio?: string; location?: string; website?: string; phone_number?: string; interests?: string[] }) => {
    console.log('handleUpdateProfile called with:', { profileData, userId: user?.id });
    
    if (!user?.id) {
      console.error('No user ID available');
      alert('User not authenticated. Please log in again.');
      return;
    }
    
    setIsUploading(true);
    try {
      console.log('Calling ProfileService.updateProfile...');
      const updatedProfile = await ProfileService.updateProfile(user.id, profileData);
      console.log('ProfileService.updateProfile result:', updatedProfile);
      
      if (updatedProfile) {
        setProfile(updatedProfile);
        setIsEditingProfile(false);
        alert('Profile updated successfully!');
      } else {
        throw new Error('Profile update returned null');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleShare = async () => {
    const shareData = {
      title: `${user?.name}'s Profile - Greece Cyclades`,
      text: `Check out ${user?.name}'s travel adventures in the Greek Cyclades!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  useEffect(() => {
    if (initialized && !user) {
      navigate('/signin');
    }
  }, [user, initialized, navigate]);

  useEffect(() => {
    if (initialized && user) {
      loadUserData();
    }
  }, [initialized, user]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  if (loading || !initialized || dataLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-dark-bg' : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30'}`}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-cyclades-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            {loading || !initialized ? 'Loading your profile...' : 'Loading your data...'}
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <SEO {...generateProfileSEO()} />
      <div className={`min-h-screen pt-16 ${isDark ? 'bg-dark-bg' : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30'}`}>
        {/* Enhanced Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
            <div className="absolute top-60 -left-20 w-60 h-60 bg-gradient-to-tr from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
            <div className="absolute top-80 right-20 w-40 h-40 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full blur-2xl"></div>
          </div>

          {/* Cover Photo */}
          <div className="relative h-64 lg:h-80 bg-gradient-to-r from-[#1E2E48] via-blue-600 to-purple-600">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <img 
              src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&h=600&fit=crop"
              alt="Cover"
              className="w-full h-full object-cover mix-blend-multiply"
            />
            <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-all duration-300 group">
              <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Profile Header */}
          <div className="relative px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 -mt-16 p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Enhanced Profile Picture */}
                <div className="flex-shrink-0 relative">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#1E2E48] via-blue-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <img
                      src={profile?.avatar_url || user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || user?.name || 'User')}&size=160&background=1E2E48&color=ffffff&bold=true`}
                      alt={`${profile?.full_name || user?.name}'s Profile`}
                      className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white shadow-2xl"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-2 shadow-lg">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                    {/* Online Status Indicator */}
                    <div className={`absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-white shadow-lg ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} title={isOnline ? 'Online' : 'Offline'}></div>
                    <button 
                      className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110"
                      onClick={handlePhotoChange}
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* User Status Badge */}
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Pro Explorer
                    </div>
                  </div>
                </div>

                {/* Enhanced Profile Info */}
                <div className="flex-grow space-y-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1E2E48] via-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {profile?.full_name || user?.name || 'Travel Explorer'}
                        </h1>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-6 h-6 text-blue-500" />
                          <Star className="w-6 h-6 text-yellow-500" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          <span className="font-medium">{profile?.location || 'Greek Islands Explorer'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Joined {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 text-lg leading-relaxed max-w-2xl">
                        {profile?.bio || `Passionate traveler exploring the magical Cyclades islands 🏝️ | Sharing authentic experiences from ${user?.name || 'Greece'} | Island hopping enthusiast`}
                      </p>

                      {profile?.website && (
                        <a href={`https://${profile.website}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                          <Globe className="w-4 h-4" />
                          {profile.website}
                        </a>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 w-full lg:w-auto">
                      <button 
                        onClick={() => setIsEditingProfile(true)}
                        className="flex-1 sm:flex-none bg-gradient-to-r from-[#1E2E48] to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit Profile</span>
                        <span className="sm:hidden">Edit</span>
                      </button>
                      <button 
                        onClick={handleShare}
                        className="flex-1 sm:flex-none bg-white border-2 border-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:border-gray-300 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <Share2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Share</span>
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="flex-1 sm:flex-none bg-white border-2 border-red-200 text-red-600 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:border-red-300 hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <Settings className="w-4 h-4" />
                        <span className="hidden sm:inline">Logout</span>
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-200/50">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <div className="p-1.5 sm:p-2 bg-blue-500 rounded-lg">
                          <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-blue-700">Posts</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-blue-900">{stats?.postsCount || 0}</div>
                      <div className="text-xs text-blue-600 hidden sm:block">+{Math.floor(Math.random() * 5) + 1} this month</div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-emerald-200/50">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <div className="p-1.5 sm:p-2 bg-emerald-500 rounded-lg">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-emerald-700">Followers</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-emerald-900">{Math.floor(Math.random() * 500) + 200}</div>
                      <div className="text-xs text-emerald-600 hidden sm:block">+{Math.floor(Math.random() * 20) + 5} this week</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-200/50">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <div className="p-1.5 sm:p-2 bg-purple-500 rounded-lg">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-purple-700">Following</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-purple-900">{Math.floor(Math.random() * 300) + 150}</div>
                      <div className="text-xs text-purple-600 hidden sm:block">Active connections</div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-orange-200/50">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <div className="p-1.5 sm:p-2 bg-orange-500 rounded-lg">
                          <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-orange-700">Level</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-orange-900">Pro</div>
                      <div className="text-xs text-orange-600 hidden sm:block">Explorer status</div>
                    </div>
                  </div>

                  {/* Interest Tags */}
                  <div className="flex flex-wrap gap-3">
                    {(profile?.interests || ['Island Hopping', 'Photography', 'Greek Culture', 'Local Cuisine', 'Sunset Watching']).map((interest, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:from-blue-100 hover:to-blue-200 hover:text-blue-800 transition-all duration-300 cursor-pointer"
                      >
                        #{interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Enhanced Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-6 sm:mt-8">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-2">
            <div className="flex overflow-x-auto scrollbar-hide gap-1 sm:gap-0">
              {[
                { name: 'Overview', id: 'overview', icon: Target },
                { name: 'Photos', id: 'photos', icon: CameraIcon, count: stats?.postsCount || 0 },
                { name: 'Trips', id: 'trips', icon: Route, count: stats?.tripPlansCount || 0 },
                { name: 'Diary', id: 'diary', icon: Coffee, count: stats?.diaryEntriesCount || 0 },
                { name: 'Favorites', id: 'favorites', icon: Bookmark },
                { name: 'Analytics', id: 'analytics', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#1E2E48] to-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{tab.name}</span>
                  {tab.count !== undefined && (
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold ${
                      activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
          {activeTab === 'overview' && (
            <>
              {/* Favorites Section */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold">My Favorites</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Favorite Islands
                    </h3>
                    <div className="space-y-2">
                      {favorites.filter(f => f.item_type === 'island').length > 0 ? (
                        favorites.filter(f => f.item_type === 'island').map((island) => (
                          <div 
                            key={island.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                          >
                            <img 
                              src={island.item_image} 
                              alt={island.item_name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-medium">{island.item_name}</div>
                              <div className="text-sm text-gray-500">Added {new Date(island.created_at).toLocaleDateString()}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500 text-sm">No favorite islands yet</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-500" />
                      Favorite Hotels
                    </h3>
                    <div className="space-y-2">
                      {favorites.filter(f => f.item_type === 'hotel').length > 0 ? (
                        favorites.filter(f => f.item_type === 'hotel').map((hotel) => (
                          <div 
                            key={hotel.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                          >
                            <img 
                              src={hotel.item_image} 
                              alt={hotel.item_name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-medium">{hotel.item_name}</div>
                              <div className="text-sm text-gray-500">{hotel.item_location}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500 text-sm">No favorite hotels yet</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Compass className="w-5 h-5 text-green-500" />
                      Saved Activities
                    </h3>
                    <div className="space-y-2">
                      {favorites.filter(f => f.item_type === 'activity').length > 0 ? (
                        favorites.filter(f => f.item_type === 'activity').map((activity) => (
                          <div 
                            key={activity.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                          >
                            <img 
                              src={activity.item_image} 
                              alt={activity.item_name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-medium">{activity.item_name}</div>
                              <div className="text-sm text-gray-500">{activity.item_location}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500 text-sm">No saved activities yet</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Quick Actions Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Quick Actions */}
                <div className="lg:col-span-8 space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1E2E48] to-blue-600 bg-clip-text text-transparent">
                    Quick Actions
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Trip Cost Calculator Card */}
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsCalculatorOpen(true)}
                      className="bg-gradient-to-br from-blue-50 via-blue-100/50 to-cyan-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-blue-200/50 group"
                    >
                      <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-bold text-blue-900 mb-1">Trip Calculator</h3>
                      <p className="text-sm text-blue-700 leading-relaxed">Plan your perfect budget</p>
                      <div className="mt-3 flex items-center text-xs text-blue-600">
                        <Zap className="w-3 h-3 mr-1" />
                        AI-powered estimates
                      </div>
                    </div>
                  </div>
                </motion.button>

                {/* Ferry Routes Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to="/ferry-tracking"
                    className="block bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-teal-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-emerald-200/50 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
                        <Ship className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-bold text-emerald-900 mb-1">Ferry Tracking</h3>
                        <p className="text-sm text-emerald-700 leading-relaxed">Real-time tracking</p>
                        <div className="mt-3 flex items-center text-xs text-emerald-600">
                          <Waves className="w-3 h-3 mr-1" />
                          Live updates
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Weather Forecast Card */}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-yellow-50 via-orange-100/50 to-amber-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-yellow-200/50 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg group-hover:shadow-yellow-500/25 transition-all duration-300">
                      <Sun className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-bold text-yellow-900 mb-1">Weather Forecast</h3>
                      <p className="text-sm text-yellow-700 leading-relaxed">7-day predictions</p>
                      <div className="mt-3 flex items-center text-xs text-yellow-600">
                        <Wind className="w-3 h-3 mr-1" />
                        Detailed insights
                      </div>
                    </div>
                  </div>
                </motion.button>

                {/* AI Travel Assistant */}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-purple-50 via-violet-100/50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-200/50 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-bold text-purple-900 mb-1">AI Assistant</h3>
                      <p className="text-sm text-purple-700 leading-relaxed">Smart recommendations</p>
                      <div className="mt-3 flex items-center text-xs text-purple-600">
                        <Crown className="w-3 h-3 mr-1" />
                        Personalized advice
                      </div>
                    </div>
                  </div>
                </motion.button>

                {/* Island Explorer */}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-rose-50 via-pink-100/50 to-red-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-rose-200/50 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl shadow-lg group-hover:shadow-rose-500/25 transition-all duration-300">
                      <Map className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-bold text-rose-900 mb-1">Island Explorer</h3>
                      <p className="text-sm text-rose-700 leading-relaxed">Discover hidden gems</p>
                      <div className="mt-3 flex items-center text-xs text-rose-600">
                        <Compass className="w-3 h-3 mr-1" />
                        Interactive maps
                      </div>
                    </div>
                  </div>
                </motion.button>

                {/* Photo Gallery */}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('photos')}
                  className="bg-gradient-to-br from-slate-50 via-gray-100/50 to-zinc-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200/50 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-gray-600 to-slate-600 rounded-xl shadow-lg group-hover:shadow-gray-500/25 transition-all duration-300">
                      <CameraIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">Add Photo</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">Share your journey</p>
                      <div className="mt-3 flex items-center text-xs text-gray-600">
                        <Plus className="w-3 h-3 mr-1" />
                        Create memories
                      </div>
                    </div>
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Achievement Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: Crown, name: 'Island Explorer', desc: 'Visited 5+ islands', progress: 100, color: 'yellow' },
                    { icon: Camera, name: 'Memory Keeper', desc: '50+ photos shared', progress: 80, color: 'blue' },
                    { icon: Ship, name: 'Ferry Master', desc: '20+ ferry trips', progress: 60, color: 'green' },
                    { icon: Heart, name: 'Community Star', desc: '100+ likes received', progress: 90, color: 'red' },
                  ].map((achievement) => (
                    <div key={achievement.name} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 transition-all duration-300">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${
                        achievement.color === 'yellow' ? 'from-yellow-400 to-yellow-500' :
                        achievement.color === 'blue' ? 'from-blue-400 to-blue-500' :
                        achievement.color === 'green' ? 'from-green-400 to-green-500' :
                        'from-red-400 to-red-500'
                      }`}>
                        <achievement.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{achievement.name}</div>
                        <div className="text-xs text-gray-600">{achievement.desc}</div>
                        <div className="mt-1 bg-gray-200 rounded-full h-1">
                          <div 
                            className={`h-1 rounded-full bg-gradient-to-r ${
                              achievement.color === 'yellow' ? 'from-yellow-400 to-yellow-500' :
                              achievement.color === 'blue' ? 'from-blue-400 to-blue-500' :
                              achievement.color === 'green' ? 'from-green-400 to-green-500' :
                              'from-red-400 to-red-500'
                            }`}
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-gray-700">{achievement.progress}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
            </>
          )}

          {activeTab === 'photos' && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Photos</h2>
                <CreatePostModal onCreatePost={handleCreatePost} isUploading={isUploading} />
              </div>
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-gray-50 rounded-lg overflow-hidden">
                      <img 
                        src={post.image_url} 
                        alt={post.description || 'Post image'} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <p className="text-gray-700 text-sm">{post.description}</p>
                        {post.location && (
                          <p className="text-gray-500 text-xs mt-2 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {post.location}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-3 text-gray-500 text-xs">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.likes_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {post.comments_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CameraIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No photos yet. Share your first memory!</p>
                  <div className="mt-4">
                    <CreatePostModal onCreatePost={handleCreatePost} isUploading={isUploading} />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">My Trips</h2>
              {tripPlans.length > 0 ? (
                <div className="space-y-4">
                  {tripPlans.map((trip) => (
                    <div key={trip.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{trip.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                          trip.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {trip.status}
                        </span>
                      </div>
                      {trip.notes && <p className="text-gray-600 mb-2">{trip.notes}</p>}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {trip.start_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(trip.start_date).toLocaleDateString()}
                          </span>
                        )}
                        {trip.estimated_budget && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            €{trip.estimated_budget}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Route className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No trips planned yet. Start planning your adventure!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'diary' && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Travel Diary</h2>
              {diaryEntries.length > 0 ? (
                <div className="space-y-6">
                  {diaryEntries.map((entry) => (
                    <div key={entry.id} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{entry.title}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{entry.content}</p>
                      {entry.location && (
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {entry.location}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        {entry.mood && (
                          <span className="flex items-center gap-1">
                            <span className="text-yellow-500">😊</span>
                            {entry.mood}
                          </span>
                        )}
                        {entry.weather && (
                          <span className="flex items-center gap-1">
                            <span className="text-blue-500">🌤️</span>
                            {entry.weather}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No diary entries yet. Start documenting your travels!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((favorite) => (
                    <div key={favorite.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{favorite.item_name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          favorite.item_type === 'island' ? 'bg-blue-100 text-blue-800' :
                          favorite.item_type === 'hotel' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {favorite.item_type}
                        </span>
                      </div>
                      {favorite.item_location && <p className="text-gray-600 text-sm">{favorite.item_location}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No favorites saved yet. Start exploring and save your favorites!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Posts</p>
                      <p className="text-2xl font-bold">{stats?.postsCount || 0}</p>
                    </div>
                    <CameraIcon className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Trips Planned</p>
                      <p className="text-2xl font-bold">{stats?.tripPlansCount || 0}</p>
                    </div>
                    <Route className="w-8 h-8 text-green-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Diary Entries</p>
                      <p className="text-2xl font-bold">{stats?.diaryEntriesCount || 0}</p>
                    </div>
                    <Coffee className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Favorites</p>
                      <p className="text-2xl font-bold">{favorites.length}</p>
                    </div>
                    <Bookmark className="w-8 h-8 text-orange-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Edit Profile Modal */}
        {isEditingProfile && (
          <EditProfileModal
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onClose={() => setIsEditingProfile(false)}
            isUploading={isUploading}
          />
        )}

        {/* Stories Section - Only show in overview */}
        {activeTab === 'overview' && (
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
        )}



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
