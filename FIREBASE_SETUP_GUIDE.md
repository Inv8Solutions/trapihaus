# Firebase Setup Guide - Fix CSP and Permissions Errors

## Issues Resolved
1. ✅ CSP (Content Security Policy) blocking Google APIs
2. ✅ Firestore "Missing or insufficient permissions" error
3. ✅ Firebase Storage access configuration

---

## Step 1: Update Content Security Policy (DONE ✅)

The `next.config.ts` has been updated to allow:
- Google APIs (`https://apis.google.com`)
- Firebase Storage images
- Firebase Authentication frames
- All necessary Firebase endpoints

**Changes made:**
- Added `https://apis.google.com` to `script-src`
- Added `https://firebasestorage.googleapis.com` to `img-src` and `connect-src`
- Added `blob:` to `img-src` for file previews
- Added `frame-src` for Google OAuth
- Updated Next.js Image remote patterns for Firebase Storage

---

## Step 2: Deploy Firestore Security Rules

### Option A: Using Firebase Console (Recommended for Quick Setup)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** → **Rules**
4. Copy and paste the rules from `firestore.rules` file
5. Click **Publish**

### Option B: Using Firebase CLI

```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not done)
firebase init firestore

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

---

## Step 3: Deploy Firebase Storage Security Rules

### Option A: Using Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Storage** → **Rules**
4. Copy and paste the rules from `storage.rules` file
5. Click **Publish**

### Option B: Using Firebase CLI

```bash
# Initialize Storage (if not done)
firebase init storage

# Deploy Storage rules
firebase deploy --only storage
```

---

## Step 4: Restart Development Server

**IMPORTANT:** After updating `next.config.ts`, you MUST restart your dev server:

```bash
# Stop the current dev server (Ctrl+C)

# Start it again
npm run dev
```

The CSP changes won't take effect until you restart!

---

## Verification Checklist

### 1. Check CSP is Working
- [ ] Open browser DevTools (F12)
- [ ] Go to Console tab
- [ ] Reload the page
- [ ] You should NOT see any CSP violation errors about `apis.google.com`

### 2. Check Firestore Rules are Working
- [ ] Register a new user or login
- [ ] Go to Dashboard → Settings
- [ ] You should NOT see "Missing or insufficient permissions" error
- [ ] Try updating your profile information
- [ ] Changes should save successfully

### 3. Check Storage Rules are Working
- [ ] Go to Dashboard → Settings
- [ ] Upload a profile photo
- [ ] Photo should upload successfully
- [ ] Photo should appear in Navbar and Dashboard Header
- [ ] Check Firebase Storage in console - file should be visible

---

## Current Security Rules

### Firestore Rules (`firestore.rules`)

**What they do:**
- ✅ Users can read their own profile only
- ✅ Users can create their own profile only
- ✅ Users can update their own profile (except email)
- ❌ Users cannot delete profiles
- ❌ Users cannot access other users' profiles

**Collection structure:**
```
/users/{userId}
  - Only accessible by the user with that userId
  - Email field is protected from modification
  - UID field must match the document ID
```

### Storage Rules (`storage.rules`)

**What they do:**
- ✅ Anyone can read profile photos (for public profiles)
- ✅ Only owners can upload/delete their photos
- ✅ File size limited to 2MB
- ✅ Only image files allowed

**Storage structure:**
```
/users/{userId}/profile/{filename}
  - Only writable by the user with that userId
  - Readable by anyone (for displaying on public profiles)
  - Images only, max 2MB
```

---

## Troubleshooting

### Issue: Still seeing CSP errors after restart

**Solution:**
1. Make sure you stopped and restarted the dev server (not just refreshed)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try in incognito/private mode
4. Check if `next.config.ts` was saved correctly

### Issue: Still seeing "Missing or insufficient permissions"

**Solutions:**

1. **Verify rules are deployed:**
   - Go to Firebase Console → Firestore → Rules
   - Check if the rules match `firestore.rules` file
   - Look for "Published" timestamp

2. **Check if user is authenticated:**
   - Open DevTools → Application → Cookies
   - Look for Firebase auth cookies
   - Try logging out and logging in again

3. **Verify Firestore is enabled:**
   - Go to Firebase Console → Firestore Database
   - Make sure database is created (not in "Get started" mode)
   - Check if it's in "production mode" or "test mode"

4. **Check browser console for auth errors:**
   - Look for Firebase Auth errors
   - Verify Firebase config in `.env.local`

### Issue: Profile photo upload fails

**Solutions:**

1. **Verify Storage rules are deployed:**
   - Go to Firebase Console → Storage → Rules
   - Check if rules match `storage.rules` file

2. **Check if Storage is enabled:**
   - Go to Firebase Console → Storage
   - Make sure Storage bucket exists
   - Verify bucket name in Firebase config

3. **Verify file constraints:**
   - File must be an image (JPG, PNG, GIF)
   - File must be under 2MB
   - Check browser console for specific errors

### Issue: Profile photo doesn't appear in Navbar/Header

**Solutions:**

1. **Hard refresh the page:** `Ctrl+Shift+R`
2. **Check if photo URL is valid:**
   - Open DevTools → Network tab
   - Look for image requests
   - Check if Firebase Storage URL is being loaded
3. **Verify Next.js Image remote pattern:**
   - Check `next.config.ts` includes `firebasestorage.googleapis.com`
4. **Check Firebase Storage permissions:**
   - Make sure read access is allowed in storage rules

---

## Firebase Console Quick Links

- **Firestore Rules:** https://console.firebase.google.com/project/YOUR_PROJECT/firestore/rules
- **Storage Rules:** https://console.firebase.google.com/project/YOUR_PROJECT/storage/rules
- **Authentication:** https://console.firebase.google.com/project/YOUR_PROJECT/authentication/users
- **Firestore Data:** https://console.firebase.google.com/project/YOUR_PROJECT/firestore/data
- **Storage Files:** https://console.firebase.google.com/project/YOUR_PROJECT/storage

---

## Next Steps After Setup

1. **Test user registration:**
   - Register a new user
   - Check if profile is created in Firestore
   - Verify in Firebase Console → Firestore → users collection

2. **Test profile updates:**
   - Login to dashboard
   - Go to Settings
   - Update name, phone, address, bio
   - Upload profile photo
   - Verify changes saved

3. **Test real-time updates:**
   - Update profile in Settings
   - Check if Navbar updates immediately
   - Check if Dashboard Header updates immediately

4. **Monitor Firebase usage:**
   - Go to Firebase Console → Usage & billing
   - Monitor Firestore reads/writes
   - Monitor Storage bandwidth
   - Set up billing alerts (optional)

---

## Security Best Practices

✅ **Already implemented:**
- CSP headers for XSS protection
- Strict Transport Security (HSTS)
- Frame protection (X-Frame-Options: DENY)
- Content-Type sniffing protection
- User data isolation (users can only access their own data)
- File upload validation (size + type)

🔒 **Additional recommendations:**
- Enable Firebase App Check (prevents abuse)
- Set up Firebase monitoring and alerts
- Regular security audits of Firestore rules
- Rate limiting for API endpoints
- Regular backups of Firestore data

---

## Summary

✅ **Files created/updated:**
- `next.config.ts` - Updated CSP headers
- `firestore.rules` - Firestore security rules
- `storage.rules` - Storage security rules
- This guide

🚀 **Action required:**
1. Deploy Firestore rules to Firebase Console
2. Deploy Storage rules to Firebase Console
3. **Set up NextAuth environment variables** (see below)
4. Restart development server
5. Test profile functionality

---

## Step 6: NextAuth Environment Variables ⚡ NEW

### Required Environment Variables

NextAuth requires two environment variables to be set in your `.env.local` file:

1. **NEXTAUTH_URL** - The URL of your application
2. **NEXTAUTH_SECRET** - A secret key used to encrypt JWT tokens

### Setup Instructions

#### 1. Copy `.env.example` to `.env.local` (if not already done)

```bash
cp .env.example .env.local
```

#### 2. Set NEXTAUTH_URL

For **local development**:
```bash
NEXTAUTH_URL=http://localhost:3000
```

For **production** (update when deploying):
```bash
NEXTAUTH_URL=https://your-domain.com
```

#### 3. Generate and Set NEXTAUTH_SECRET

Run this command to generate a secure random secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and add it to your `.env.local`:

```bash
NEXTAUTH_SECRET=your_generated_secret_here
```

⚠️ **IMPORTANT:** 
- Use a **different secret** for production
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Keep your secret secure and private

### Warnings Fixed

After setting these variables, the following warnings will be resolved:
- ✅ `[next-auth][warn][NEXTAUTH_URL]`
- ✅ `[next-auth][warn][NO_SECRET]`

### Restart Development Server

After updating `.env.local`, restart your development server:

```bash
# Stop the server (Ctrl+C)
# Start it again
npm run dev
```

---

**Last Updated:** October 27, 2025
