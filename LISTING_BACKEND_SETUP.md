# Property Listing Backend - Setup Guide

## Overview
Complete backend implementation for property listing management in Trapihaus. Users can create, manage, and submit property listings for approval.

---

## 🏗️ Architecture

### Database Structure (Firestore)

#### Collection: `listings`
Each document represents a property listing with the following structure:

```typescript
{
  // Metadata
  id: string (auto-generated)
  userId: string (owner's Firebase Auth UID)
  status: "draft" | "pending" | "approved" | "rejected"
  createdAt: Timestamp
  updatedAt: Timestamp

  // Host Information
  hostEmail: string
  hostFirstName: string
  hostLastName: string
  hostPhone: string
  hostPhoneCountry: string (e.g., "+63")

  // Property Details
  propertyType: "apartment" | "transient" | "hotel"
  propertyName: string
  description: string
  city: string
  barangay: string
  streetAddress: string
  landmark?: string

  // Property Specifications
  bedrooms: number
  guests: number
  bathrooms: number
  size?: string (e.g., "55sqm")

  // Pricing
  rate: string (e.g., "₱2,500")
  ratePeriod: "per night" | "per week" | "per month"

  // Amenities & Rules
  amenities: string[] (e.g., ["Wi-Fi", "Parking", "Pool"])
  houseRules?: string

  // Photos
  photos: string[] (Firebase Storage URLs)
  coverPhoto?: string (primary photo URL)

  // Availability
  availability: "Available for Booking" | "Temporarily Unavailable" | "Coming Soon"
  minStay: string (e.g., "1 Night")
  maxStay: string (e.g., "1 Week")

  // Statistics (optional)
  totalBookings?: number
  averageRating?: number
  reviewCount?: number
}
```

---

## 📁 Files Created

### 1. Type Definitions
**File:** `src/types/listing.ts`
- `PropertyListing` - Complete listing interface
- `CreateListingData` - Data required to create a listing
- `UpdateListingData` - Partial data for updates

### 2. Firestore Service
**File:** `src/lib/services/listings.ts`

#### Functions:
- `createListing(userId, data)` - Create a new listing (starts as "draft")
- `getListing(listingId)` - Fetch a single listing by ID
- `getUserListings(userId)` - Get all listings for a specific user
- `updateListing(listingId, userId, data)` - Update existing listing
- `submitListingForReview(listingId, userId)` - Change status to "pending"
- `getApprovedListings(limitCount?)` - Get public approved listings
- `searchListings(searchTerm)` - Search by city or barangay

### 3. Updated Components
**File:** `src/app/ListProperty/Listing.tsx`
- Added authentication check
- Integrated with Firestore service
- Added success/error handling
- Added loading states
- Auto-redirects to dashboard after submission

### 4. Security Rules
**File:** `firestore.rules`
- Public can read approved listings
- Users can only create/update/delete their own listings
- Status validation (draft/pending only on creation)
- Ownership verification on all operations

---

## 🔒 Security Rules

### Firestore Rules
```javascript
match /listings/{listingId} {
  // Anyone can read approved listings
  allow read: if resource.data.status == "approved" 
               || isOwner(resource.data.userId);
  
  // Only authenticated users can create listings
  allow create: if isSignedIn()
                && request.resource.data.userId == request.auth.uid
                && request.resource.data.status in ["draft", "pending"];
  
  // Only owner can update their listing
  allow update: if isOwner(resource.data.userId)
                && request.resource.data.userId == resource.data.userId;
  
  // Only owner can delete their listing
  allow delete: if isOwner(resource.data.userId);
}
```

---

## 🚀 Deployment Steps

### Step 1: Deploy Firestore Rules
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select **trapihaus** project
3. Navigate to **Firestore Database** → **Rules** tab
4. Copy content from `firestore.rules`
5. Click **Publish**

### Step 2: Create Indexes (if needed)
Firestore may require composite indexes for queries. If you see errors:

1. Click the error link in console (auto-generated index creation link)
2. Or manually create in Firebase Console → Firestore → Indexes

**Required Indexes:**
- Collection: `listings`
  - Fields: `userId` (Ascending), `createdAt` (Descending)
  - Fields: `status` (Ascending), `createdAt` (Descending)
  - Fields: `status` (Ascending), `city` (Ascending), `createdAt` (Descending)
  - Fields: `status` (Ascending), `barangay` (Ascending), `createdAt` (Descending)

### Step 3: Test the Feature
1. Start dev server: `npm run dev`
2. Navigate to `/ListProperty`
3. Fill out the 4-step form:
   - Basic Information
   - Property Details
   - Photos & Pricing
   - Contact & Availability
4. Click **Finish**
5. Verify listing appears in Firestore Console
6. Check redirect to `/dashboard/listings`

---

## 📝 Usage Examples

### Creating a Listing
```typescript
import { createListing } from "@/lib/services/listings";

const listingData = {
  hostEmail: "host@example.com",
  hostFirstName: "John",
  hostLastName: "Doe",
  // ... all other fields
};

const listingId = await createListing(userId, listingData);
```

### Getting User's Listings
```typescript
import { getUserListings } from "@/lib/services/listings";

const listings = await getUserListings(userId);
// Returns array of PropertyListing objects
```

### Updating a Listing
```typescript
import { updateListing } from "@/lib/services/listings";

await updateListing(listingId, userId, {
  rate: "₱3,000",
  availability: "Temporarily Unavailable"
});
```

### Searching Public Listings
```typescript
import { searchListings } from "@/lib/services/listings";

const results = await searchListings("Baguio City");
// Returns approved listings matching the search term
```

---

## 🔄 Workflow

### Listing Creation Flow:
1. **User** fills out 4-step form
2. **System** validates user is authenticated
3. **System** creates listing with status="draft"
4. **System** immediately submits for review (status="pending")
5. **System** redirects to `/dashboard/listings`
6. **Admin** reviews and approves/rejects (manual process for now)
7. **Approved listings** appear in public browse pages

### Status Transitions:
- `draft` → `pending` (automatic on submission)
- `pending` → `approved` (admin action - future feature)
- `pending` → `rejected` (admin action - future feature)
- `approved` → `draft` (owner can unpublish - future feature)

---

## 🛠️ Future Enhancements

### 1. Photo Upload Integration
- Create API route for photo uploads (similar to profile photos)
- Update `Listing.tsx` to handle file uploads
- Store URLs in `photos[]` array

### 2. Admin Dashboard
- Create admin view to approve/reject listings
- Add bulk operations (approve multiple, delete spam)
- Email notifications to hosts on status change

### 3. Listing Management
- Edit existing listings (update form)
- Draft saving (auto-save progress)
- Duplicate listing feature
- Deactivate/reactivate listings

### 4. Advanced Search
- Filter by property type, price range, amenities
- Map view integration
- Sort by price, rating, date

### 5. Analytics
- View count tracking
- Booking request metrics
- Performance insights for hosts

---

## ⚠️ Important Notes

### Authentication Required
- Users must be logged in to create listings
- The form pre-fills email from Firebase Auth
- UserId is automatically attached to listings

### Data Validation
- All required fields enforced client-side
- Server-side validation via Security Rules
- Type safety via TypeScript interfaces

### Performance Considerations
- Queries use indexes for fast retrieval
- Approved listings cached on client
- Pagination recommended for large datasets (future)

---

## 🐛 Troubleshooting

### "Missing or insufficient permissions"
- **Cause:** Firestore rules not deployed
- **Fix:** Deploy `firestore.rules` to Firebase Console

### "Index required" error
- **Cause:** Missing composite index
- **Fix:** Click the error link or manually create index

### "You must be logged in"
- **Cause:** User not authenticated
- **Fix:** Ensure user is signed in before accessing `/ListProperty`

### Listing not appearing in dashboard
- **Cause:** Query not fetching user's listings
- **Fix:** Verify `userId` matches logged-in user

---

## ✅ Verification Checklist

- [ ] Firestore rules deployed
- [ ] Composite indexes created (if needed)
- [ ] Dev server running (`npm run dev`)
- [ ] User can log in
- [ ] Form loads at `/ListProperty`
- [ ] All 4 steps navigate correctly
- [ ] Submit creates document in Firestore
- [ ] Listing has correct `userId`
- [ ] Status is set to "pending"
- [ ] Redirect to dashboard works
- [ ] No console errors

---

## 📚 Related Documentation

- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- [Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated:** October 24, 2025  
**Status:** ✅ Ready for Testing
