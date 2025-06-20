# 🚀 Supabase Database Setup Guide

This guide will help you set up your Supabase database with all the necessary tables, policies, and storage buckets for the profile functionality.

## 📋 Prerequisites

1. **Supabase Project**: Make sure you have a Supabase project created
2. **Service Role Key**: You'll need your Supabase service role key (not the anon key)
3. **Environment Variables**: Set up your `.env` file

## 🔧 Environment Setup

Create a `.env` file in your project root with:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Required for database setup scripts
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 🔑 Getting Your Service Role Key

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **service_role** key (not the anon key!)
5. Add it to your `.env` file

## 🚀 Automated Setup (Recommended)

Run all setup scripts in sequence:

```bash
npm run setup:all
```

Or run them individually:

```bash
# 1. Create database tables
npm run setup:database

# 2. Set up security policies
npm run setup:policies

# 3. Create storage buckets
npm run setup:storage
```

## 🧪 Test Your Setup

Verify everything is working:

```bash
npm run test:setup
```

This will check:
- ✅ Database connection
- ✅ All tables exist
- ✅ Storage buckets are created
- ✅ Policies are working

## 📊 What Gets Created

### Database Tables

| Table | Purpose | Features |
|-------|---------|----------|
| `profiles` | User profile data | Name, bio, avatar, interests |
| `posts` | User photo posts | Images, descriptions, tags |
| `favorites` | Saved items | Islands, hotels, activities |
| `trip_plans` | Travel itineraries | Dates, islands, budget |
| `diary_entries` | Travel diary | Stories, photos, mood |

### Storage Buckets

| Bucket | Purpose | Access |
|--------|---------|--------|
| `avatars` | Profile pictures | Public, user-owned |
| `posts` | Post images | Public, user-owned |
| `diary` | Diary photos | Public, user-owned |

### Security Features

- **Row Level Security (RLS)** on all tables
- **User-specific policies** (users can only access their own data)
- **Storage policies** for file uploads
- **Automatic profile creation** on user signup

## 🔍 Manual Setup (Alternative)

If the automated scripts don't work, you can run the SQL manually:

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Copy and paste the content from `quick-setup.sql`
3. Click **Run**
4. Copy and paste the content from `setup-storage.sql`
5. Click **Run**

## 🐛 Troubleshooting

### Common Issues

**❌ "Service role key required"**
- Make sure `SUPABASE_SERVICE_ROLE_KEY` is in your `.env` file
- Use the service role key, not the anon key

**❌ "Table already exists"**
- This is normal! The scripts use `IF NOT EXISTS`
- Tables won't be recreated if they already exist

**❌ "Policy already exists"**
- This is also normal and safe to ignore

**❌ "exec_sql function not found"**
- Your Supabase project might not have this function
- Use the manual setup method instead

### Getting Help

1. Check the console output for specific error messages
2. Verify your environment variables are correct
3. Make sure your Supabase project is active
4. Try the manual setup method if scripts fail

## ✅ Success Indicators

When setup is complete, you should see:

```
🎉 All systems ready! Your profile functionality should work perfectly.

🚀 Next steps:
1. Start your development server: npm run dev
2. Sign up or log in to test profile editing
3. Try uploading a profile picture
4. Create a post with an image
```

## 🔄 Profile Features Now Available

After successful setup:

- ✅ **Functional Profile Tabs** - Overview, Photos, Trips, Diary, Favorites, Analytics
- ✅ **Profile Editing** - Update name, bio, location, interests
- ✅ **Photo Uploads** - Profile pictures and post images
- ✅ **Post Creation** - Share photos with descriptions and tags
- ✅ **Data Persistence** - All data stored in separate Supabase tables
- ✅ **Security** - User data is protected with RLS policies

## 📞 Support

If you encounter issues:
1. Run `npm run test:setup` to diagnose problems
2. Check the browser console for error messages
3. Verify your Supabase project settings
4. Try the manual setup method as a fallback 