# Quick Start - Profile Management Backend

## ✅ What's Been Implemented

### Files Created
1. **`src/lib/firebase/firestore.ts`** - Firestore client
2. **`src/lib/firebase/storage.ts`** - Photo upload/delete functions
3. **`src/lib/services/userProfile.ts`** - Complete profile management service
4. **`src/types/user.ts`** - TypeScript interfaces for UserProfile

### Files Updated
1. **`src/app/dashboard/settings/page.tsx`** - Full profile editing with photo upload
2. **`src/app/components/layout/Navbar.tsx`** - Real-time profile updates
3. **`src/app/dashboard/components/Header.tsx`** - Profile display with real-time updates
4. **`src/app/dashboard/layout.tsx`** - Removed hardcoded userName prop
5. **`src/app/login/page.tsx`** - Profile initialization on login
6. **`src/app/Register/page.tsx`** - Profile creation on registration

## 🚀 Setup Instructions

### 1. Firebase Configuration
Ensure you have these environment variables in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2. Firestore Database Setup

**Create the users collection:**
- Collection name: `users`
- Document ID: `{userId}` (auto-generated)

**Set Security Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create, update: if request.auth != null && request.auth.uid == userId;
      allow delete: if false;
    }
  }
}
```

### 3. Firebase Storage Setup

**Set Security Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/profile/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow write: if request.resource.size < 2 * 1024 * 1024 
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

### 4. Test the Implementation

1. **Register a new user** → Profile created in Firestore
2. **Login** → Profile loaded from Firestore
3. **Go to Dashboard → Settings**
4. **Upload a profile photo** → Stored in Firebase Storage
5. **Update personal info** → Saved to Firestore
6. **Check Navbar** → Photo and name updated
7. **Check Dashboard Header** → Photo and name updated

## 📁 Data Structure

### Firestore Collection: `/users/{userId}`
```json
{
  "uid": "abc123",
  "email": "user@example.com",
  "firstName": "Juan",
  "lastName": "Dela Cruz",
  "displayName": "Juan Dela Cruz",
  "phoneNumber": "+63 917 123 4567",
  "address": "Baguio City, Benguet",
  "bio": "Host description...",
  "photoURL": "https://firebasestorage.googleapis.com/...",
  "createdAt": "2025-10-24T10:30:00.000Z",
  "updatedAt": "2025-10-24T15:45:00.000Z"
}
```

### Firebase Storage Path: `/users/{userId}/profile/{filename}`
- Example: `/users/abc123/profile/profile-1729777800000.jpg`

## 🔄 How It Works

### Profile Photo Upload Flow
1. User selects image file in Settings
2. File validated (type: image, size: <2MB)
3. Preview shown immediately
4. On "Save Changes":
   - Upload new photo to Storage
   - Get download URL
   - Update Firestore with new URL
   - Update Firebase Auth photoURL
   - Delete old photo from Storage
5. Navbar/Header listeners detect change
6. UI updates automatically

### Profile Data Update Flow
1. User edits text fields in Settings
2. On "Save Changes":
   - Update Firestore document
   - Update Firebase Auth displayName
   - Update UI state
3. Navbar/Header re-fetch profile
4. Display updated information

## 🔍 Key Functions

### Client-Side
```typescript
// Get user profile
const profile = await getUserProfile(userId);

// Update profile
await updateUserProfile(userId, {
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "+1234567890"
});

// Upload photo
const photoURL = await updateProfilePhoto(userId, file, currentPhotoURL);

// Ensure profile exists (on login)
await ensureUserProfile(userId, email, displayName, photoURL);
```

## 🎨 UI Components

### Settings Page Features
- ✅ Profile photo upload with preview
- ✅ Remove photo selection
- ✅ First Name / Last Name fields
- ✅ Email (read-only, from Firebase Auth)
- ✅ Phone Number
- ✅ Address
- ✅ Bio with character counter (500 max)
- ✅ Save button with loading state
- ✅ Success/error messages
- ✅ File validation errors

### Navbar Updates
- ✅ Real-time profile photo
- ✅ Real-time display name
- ✅ Dropdown menu with user info

### Dashboard Header Updates
- ✅ Profile photo in user menu button
- ✅ Profile photo in dropdown
- ✅ User name display
- ✅ Logout functionality

## 🐛 Troubleshooting

### Photo not uploading?
- Check Storage rules are deployed
- Verify file size < 2MB
- Check browser console for errors

### Profile not saving?
- Check Firestore rules are deployed
- Verify user is authenticated
- Check Network tab in DevTools

### Updates not showing immediately?
- Check if `onAuthStateChanged` listener is running
- Verify Firestore document exists
- Hard refresh page (Ctrl+Shift+R)

## 📝 Next Steps

### Recommended Enhancements
1. Add image cropping before upload
2. Implement profile completion percentage
3. Add email change with verification
4. Add phone number verification
5. Create public host profile pages
6. Add profile activity log

## 📚 Related Documentation

- Full backend guide: `BACKEND_SETUP.md`
- Firebase Storage: https://firebase.google.com/docs/storage
- Firestore: https://firebase.google.com/docs/firestore
- Firebase Auth: https://firebase.google.com/docs/auth

---

**Status:** ✅ Ready for testing and deployment
**Last Updated:** October 24, 2025
