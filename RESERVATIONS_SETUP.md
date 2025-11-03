# Reservations System Setup Guide

This guide explains how the reservations/bookings system works in Trapihaus and how to integrate it with the checkout flow.

## Overview

The reservations system allows users to:
- Book properties and view their upcoming trips
- View their booking history (past trips)
- Manage cancelled reservations
- Cancel upcoming bookings

## Data Structure

### Reservation Type
Location: `src/types/reservation.ts`

Each reservation includes:
- **Booking details**: Check-in/out dates, guests, nights
- **Guest information**: Name, email, phone, special requests
- **Property snapshot**: Name, location, image, type (preserved even if listing changes)
- **Pricing breakdown**: Per-night rate, subtotal, service fee, VAT, total
- **Payment info**: Method (card/cash/gcash), status, booking reference
- **Host information**: Host ID, name, contact details
- **Status tracking**: upcoming, ongoing, completed, cancelled

## Database Services

Location: `src/lib/services/reservations.ts`

### Core Functions

#### Creating Reservations
```typescript
await createReservation({
  userId: user.uid,
  listingId: "listing-id",
  checkInDate: new Date("2025-11-10"),
  checkOutDate: new Date("2025-11-12"),
  guests: 2,
  guestFirstName: "Juan",
  guestLastName: "Dela Cruz",
  guestEmail: "juan@email.com",
  guestPhone: "+639123456789",
  propertyName: "Loakan Heights Residences",
  propertyLocation: "Baguio City",
  propertyImage: "https://...",
  propertyType: "Transient",
  pricePerNight: 2500,
  serviceFee: 500,
  vat: 360,
  paymentMethod: "card",
  hostId: "host-uid",
  hostName: "Host Name",
  hostEmail: "host@email.com",
});
```

#### Fetching Reservations
```typescript
// Get upcoming/ongoing trips
const upcoming = await getUpcomingReservations(userId);

// Get past trips
const past = await getPastReservations(userId);

// Get cancelled trips
const cancelled = await getCancelledReservations(userId);

// Get all reservations for a specific status
const completed = await getUserReservations(userId, "completed");
```

#### Managing Reservations
```typescript
// Cancel a reservation
await cancelReservation(reservationId, userId, "Change of plans");

// Update reservation status
await updateReservation(reservationId, userId, {
  status: "completed",
  paymentStatus: "paid",
});
```

#### Host View (for property owners)
```typescript
// Get all reservations for a specific listing
const reservations = await getListingReservations(listingId, hostId);
```

## Security Rules

The Firestore security rules have been updated to include the `reservations` collection:

- **Read**: Users can read their own reservations (as guest) or reservations for their listings (as host)
- **Create**: Only authenticated users can create reservations for themselves
- **Update**: Only the guest can update their own reservation
- **Delete**: Only the guest can delete their own reservation

## Integration with Checkout

### Step 1: Update Checkout Component

In `src/app/Checkout/Checkout.tsx`, after successful payment:

```typescript
import { createReservation } from "@/lib/services/reservations";
import { getFirebaseAuth } from "@/lib/auth/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

// Add state for user
const [userId, setUserId] = useState<string | null>(null);

// Listen to auth state
useEffect(() => {
  const auth = getFirebaseAuth();
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUserId(user?.uid || null);
  });
  return () => unsubscribe();
}, []);

// In the payment confirmation handler
const handlePayment = async () => {
  if (!userId) {
    alert("Please log in to complete booking");
    router.push("/login");
    return;
  }

  try {
    // Create the reservation in Firestore
    const reservationId = await createReservation({
      userId,
      listingId: listingId, // Pass from property listing page
      checkInDate: new Date(checkIn),
      checkOutDate: new Date(checkOut),
      guests,
      guestFirstName: firstName,
      guestLastName: lastName,
      guestEmail: email,
      guestPhone: phone,
      specialRequest: request,
      propertyName,
      propertyLocation,
      propertyImage,
      propertyType,
      isVerified,
      pricePerNight: PRICE_PER_NIGHT,
      serviceFee: SERVICE_FEE,
      vat,
      paymentMethod: method,
      hostId: hostId, // From listing data
      hostName: hostName, // From listing data
      hostEmail: hostEmail, // From listing data
    });

    // Mark as confirmed and show success
    setConfirmed(true);
    
    // Optionally redirect to trips page
    // router.push("/trips");
  } catch (error) {
    console.error("Error creating reservation:", error);
    alert("Failed to complete booking. Please try again.");
  }
};
```

### Step 2: Pass Listing Data to Checkout

When navigating from property listing to checkout, pass the listing data:

```typescript
// In PropertyListing component
const handleBookNow = () => {
  const params = new URLSearchParams({
    listingId: listing.id,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests: guests.toString(),
    pricePerNight: listing.rate,
    serviceFee: "500",
    propertyName: listing.propertyName,
    propertyLocation: `${listing.city}, ${listing.barangay}`,
    propertyImage: listing.coverPhoto || listing.photos[0],
    propertyType: listing.propertyType,
    verified: listing.status === "approved" ? "true" : "false",
    hostId: listing.userId,
    hostName: `${listing.hostFirstName} ${listing.hostLastName}`,
    hostEmail: listing.hostEmail,
  });
  
  router.push(`/Checkout?${params.toString()}`);
};
```

## Trips Page Features

Location: `src/app/trips/page.tsx`

### Three Tabs

1. **Upcoming**: Shows upcoming and ongoing reservations
   - Actions: Get Directions, Message Host, Cancel Booking
   - Status badge for ongoing trips

2. **Past**: Shows completed reservations
   - Actions: Leave a Review, Download Receipt
   - Can rebook the same property

3. **Cancelled**: Shows cancelled reservations
   - Shows cancellation reason
   - Actions: Book Again (redirects to browse)

### Features

- Authentication guard (redirects to login if not authenticated)
- Real-time status updates
- Empty states for each tab
- Responsive card layout with property images
- Booking reference display
- Cancellation confirmation dialog

## Status Management

Reservations automatically determine status based on dates:

- **upcoming**: Check-in date is in the future
- **ongoing**: Current date is between check-in and check-out
- **completed**: Check-out date has passed
- **cancelled**: User manually cancelled the booking

The status is calculated when creating a reservation and should be updated periodically (you can add a cloud function or cron job to update statuses).

## Next Steps

### Recommended Enhancements

1. **Auto-update statuses**: Create a Firebase Cloud Function to update reservation statuses daily
2. **Email notifications**: Send confirmation emails when bookings are created
3. **Host notifications**: Notify hosts when they receive a new booking
4. **Reviews system**: Allow guests to leave reviews after completed trips
5. **Receipt generation**: Generate PDF receipts for completed bookings
6. **Refund handling**: Implement refund logic for cancellations
7. **Calendar blocking**: Prevent double-bookings by checking existing reservations

### Example: Status Update Cloud Function

```typescript
// functions/src/updateReservationStatuses.ts
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const updateReservationStatuses = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context) => {
    const db = admin.firestore();
    const now = admin.firestore.Timestamp.now();
    
    const snapshot = await db.collection("reservations")
      .where("status", "in", ["upcoming", "ongoing"])
      .get();
    
    const batch = db.batch();
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const checkIn = data.checkInDate;
      const checkOut = data.checkOutDate;
      
      let newStatus = data.status;
      if (now < checkIn) newStatus = "upcoming";
      else if (now >= checkIn && now < checkOut) newStatus = "ongoing";
      else newStatus = "completed";
      
      if (newStatus !== data.status) {
        batch.update(doc.ref, { status: newStatus });
      }
    });
    
    await batch.commit();
    console.log("Updated reservation statuses");
  });
```

## Testing

To test the reservations system:

1. Ensure Firebase is properly configured
2. Deploy the updated Firestore rules: `firebase deploy --only firestore:rules`
3. Log in as a user
4. Navigate to a property listing
5. Complete the checkout flow
6. Visit `/trips` to see your booking

## Troubleshooting

### "Permission denied" errors
- Verify Firestore rules are deployed
- Check that user is authenticated
- Ensure `userId` matches the authenticated user's UID

### Reservations not showing
- Check browser console for errors
- Verify data was written to Firestore (check Firebase Console)
- Ensure user ID matches between auth and reservation document

### Date/time issues
- Firestore stores dates as Timestamps
- Convert to JavaScript Date objects when reading
- Use `serverTimestamp()` for creation timestamps
