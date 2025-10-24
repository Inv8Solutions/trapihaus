# Backend Implementation Guide - User Profile Management

## Overview
This document describes the backend architecture for user profile management in Trapihaus, including profile photos and personal information storage.

## Architecture

### Client-Side Components
- **Settings Page** (`src/app/dashboard/settings/page.tsx`)
  - Profile photo upload with preview
  - Personal information editing
  - Real-time validation
  - Save status feedback

- **Navbar** (`src/app/components/layout/Navbar.tsx`)
  - Real-time profile photo updates
  - User display name updates

- **Dashboard Header** (`src/app/dashboard/components/Header.tsx`)
  - Profile photo in user menu
  - User name display
  - Logout functionality

### Backend Services

#### 1. Firebase Storage (`src/lib/firebase/storage.ts`)
**Purpose:** Handle profile photo uploads to Firebase Storage

**Key Functions:**
- `uploadProfilePhoto(userId, file)` - Uploads photo to `/users/{userId}/profile/{filename}`
- `deleteProfilePhoto(photoURL)` - Removes old photos from storage
- **Validations:** File type (images only), size (max 2MB)

#### 2. Firestore Database (`src/lib/firebase/firestore.ts`)
**Purpose:** Get Firestore client instance

**Usage:** Client-side database operations

#### 3. User Profile Service (`src/lib/services/userProfile.ts`)
**Purpose:** Complete user profile management

**Key Functions:**
- `getUserProfile(userId)` - Fetch profile from Firestore
- `createUserProfile(userId, email, displayName, photoURL)` - Initialize profile on registration
- `updateUserProfile(userId, data)` - Update profile fields
- `updateProfilePhoto(userId, file, currentPhotoURL)` - Upload new photo and update profile
- `ensureUserProfile(userId, email, displayName, photoURL)` - Create profile if missing (login)

**Data Flow:**
1. Update Firestore with new data
2. Update Firebase Auth displayName/photoURL
3. Delete old photo from storage (if changed)
4. Return success/error to client

### Data Structure

#### UserProfile Type (`src/types/user.ts`)
```typescript
interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  address: string;
  bio: string;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
}
```

#### UpdateProfileData Type
```typescript
interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  bio?: string;
  photoURL?: string;
}
```

## Security Rules (Firestore)

**Recommended Rules for `/users/{userId}` collection:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Users can read their own profile
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Users can create/update their own profile
      allow create, update: if request.auth != null && request.auth.uid == userId;
      
      // Prevent deletion (optional)
      allow delete: if false;
    }
  }
}
```

## Security Rules (Storage)

**Recommended Rules for `/users/{userId}/profile/` storage:**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/profile/{allPaths=**} {
      // Users can read/write their own profile photos
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Validate file size (2MB max)
      allow write: if request.resource.size < 2 * 1024 * 1024;
      
      // Validate file type (images only)
      allow write: if request.resource.contentType.matches('image/.*');
    }
  }
}
```

## User Flow

### Registration Flow
1. User fills out registration form
2. `registerEmailPassword()` creates Firebase Auth user
3. `createUserProfile()` creates Firestore document with initial data
4. User redirected to login page

### Login Flow
1. User signs in with email/password
2. `signInEmailPassword()` authenticates with Firebase
3. `ensureUserProfile()` checks/creates Firestore profile
4. User redirected to home/dashboard

### Profile Update Flow
1. User uploads new photo (optional) → creates preview
2. User edits text fields
3. User clicks "Save Changes"
4. If photo selected: `updateProfilePhoto()` uploads to Storage
5. `updateUserProfile()` updates Firestore with all changes
6. Firebase Auth displayName/photoURL synced
7. UI shows success message
8. Navbar and Dashboard Header automatically update via `onAuthStateChanged` listener

## Environment Variables Required

Add these to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Error Handling

### Client-Side
- File validation (type, size) before upload
- Loading states during save operations
- Success/error messages displayed to user
- Form disabled during submission

### Service-Level
- Try-catch blocks around all async operations
- Graceful fallbacks if profile fetch fails
- Console errors for debugging
- Non-critical failures (e.g., old photo deletion) don't block main operation

## Real-Time Updates

### How It Works
1. `onAuthStateChanged` listener in Navbar/Header
2. Fetches latest profile from Firestore on auth state change
3. Updates local state with new photo/name
4. React re-renders components automatically

### When Updates Trigger
- User logs in
- User updates profile in Settings
- Page refresh
- Tab focus (Firebase reconnects)

## Testing Checklist

- [ ] Upload profile photo (JPG, PNG, GIF)
- [ ] Validate file size rejection (>2MB)
- [ ] Validate file type rejection (non-image)
- [ ] Update first name, last name
- [ ] Update phone number, address, bio
- [ ] Check photo appears in Navbar
- [ ] Check photo appears in Dashboard Header
- [ ] Check name updates in both locations
- [ ] Test photo preview before save
- [ ] Test remove photo selection
- [ ] Verify old photo deleted from Storage
- [ ] Test with slow network (loading states)
- [ ] Test error handling (disconnect during save)

## Future Enhancements

### Suggested Features
1. **Image Cropping** - Allow users to crop/resize before upload
2. **Multiple Photos** - Profile gallery or listing photos
3. **Profile Visibility** - Public profile pages for hosts
4. **Activity Log** - Track profile changes
5. **Email Verification** - Verify email addresses
6. **Social Login** - Google, Facebook sign-in with profile sync
7. **Profile Completion** - Progress indicator for complete profiles
8. **Avatar Options** - Default avatar selection if no photo

### Performance Optimizations
1. **Image Optimization** - Resize images server-side (Cloud Functions)
2. **CDN Caching** - Cache profile photos
3. **Lazy Loading** - Load profile data on-demand
4. **Debouncing** - Debounce auto-save on text fields

## Troubleshooting

### Photo Not Updating
- Check Firebase Storage rules
- Verify file size < 2MB
- Check browser console for errors
- Verify Storage bucket in Firebase config

### Profile Data Not Saving
- Check Firestore rules
- Verify user is authenticated
- Check network tab for failed requests
- Verify Firestore indexes if using queries

### Old Photos Not Deleting
- Check Storage rules for delete permission
- Verify photo URL format
- Check if URL points to Firebase Storage
- Non-critical - profile will still update

## Resources

- [Firebase Storage Docs](https://firebase.google.com/docs/storage)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
