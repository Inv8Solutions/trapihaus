# Barangay Auto-Population Feature

## Overview
The listing form now automatically populates barangay options based on the selected city/municipality in Step 2 (Property Details).

## How It Works

### 1. City Selection
- Users can type in the **City/Municipality** field
- An autocomplete datalist shows available cities from the Cordillera Administrative Region
- Currently supports:
  - Baguio City (128 barangays)
  - La Trinidad (16 barangays)
  - Tabuk City (36 barangays)
  - Bontoc (16 barangays)
  - Itogon (9 barangays)
  - Tuba (14 barangays)
  - Sablan (8 barangays)

### 2. Automatic Barangay Loading
- When a user enters/selects a city, the system automatically:
  - Fetches the list of barangays for that city
  - Populates the **Barangay** dropdown with options
  - Shows a count of available barangays below the city field

### 3. Smart Validation
- If no city is selected, the barangay dropdown is disabled with message "Select a city first"
- If an unrecognized city is entered, a warning appears: "⚠️ No barangays found for [city name]"
- If a barangay is selected and then the city changes, the barangay resets if it's not valid for the new city

## Technical Implementation

### Files Created/Modified

1. **`src/lib/data/barangays.ts`** (NEW)
   - Contains comprehensive barangay data for Cordillera cities
   - Exports helper functions:
     - `getBarangays(city)` - Returns barangays for a city
     - `getCities()` - Returns list of all available cities

2. **`src/app/ListProperty/Listing.tsx`** (MODIFIED)
   - Added imports: `getBarangays`, `getCities`
   - Added state:
     - `availableBarangays` - Current barangays for selected city
     - `availableCities` - All available cities
   - Added `useEffect` hook to auto-populate barangays when city changes
   - Updated UI:
     - City input now has datalist autocomplete
     - Barangay dropdown dynamically populated
     - Helper text and validation messages

## Adding More Cities

To add more cities/municipalities:

1. Open `src/lib/data/barangays.ts`
2. Add to the `barangayData` object:

```typescript
export const barangayData: CityBarangayData = {
  // ... existing cities ...
  
  "Your City Name": [
    "Barangay 1",
    "Barangay 2",
    "Barangay 3",
    // ... add all barangays
  ],
};
```

## User Experience Benefits

✅ **Faster Input** - No need to manually type barangay names
✅ **Accuracy** - Only valid barangays for the selected city are shown
✅ **Guidance** - Clear feedback when city is not recognized
✅ **Consistency** - Standardized barangay names across listings

## Future Enhancements

- [ ] Add more cities from Cordillera region
- [ ] Add support for other regions (Luzon, Visayas, Mindanao)
- [ ] Implement fuzzy matching for city names (e.g., "baguio" matches "Baguio City")
- [ ] Add province selection before city
- [ ] API integration for real-time barangay data from PSGC (Philippine Standard Geographic Code)

---

**Last Updated:** October 27, 2025
