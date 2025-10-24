# Firebase Storage CORS Configuration

## Issue
Firebase Storage is blocking requests from `localhost:3000` due to CORS policy.

## Solution
Configure CORS settings for your Firebase Storage bucket.

---

## Method 1: Using Google Cloud Console (Recommended)

### Step 1: Create `cors.json` file

Create a file named `cors.json` in your project root with this content:

```json
[
  {
    "origin": ["http://localhost:3000", "http://localhost:3001"],
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD"],
    "maxAgeSeconds": 3600
  }
]
```

### Step 2: Install Google Cloud SDK

Download and install: https://cloud.google.com/sdk/docs/install

### Step 3: Authenticate

```bash
gcloud auth login
```

### Step 4: Apply CORS Configuration

```bash
gcloud storage buckets update gs://trapihaus.firebasestorage.app --cors-file=cors.json
```

---

## Method 2: Using gsutil (Alternative)

### Step 1: Install gsutil

Already included with Google Cloud SDK, or install separately:
```bash
pip install gsutil
```

### Step 2: Create `cors.json` (same as above)

### Step 3: Apply CORS

```bash
gsutil cors set cors.json gs://trapihaus.firebasestorage.app
```

### Step 4: Verify CORS

```bash
gsutil cors get gs://trapihaus.firebasestorage.app
```

---

## Method 3: Production Workaround (Add your domains)

For production, update `cors.json` to include your production domain:

```json
[
  {
    "origin": [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://yourdomain.com",
      "https://www.yourdomain.com"
    ],
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD"],
    "maxAgeSeconds": 3600
  }
]
```

Then reapply:
```bash
gcloud storage buckets update gs://trapihaus.firebasestorage.app --cors-file=cors.json
```

---

## Quick Fix for Development (Temporary)

If you can't configure CORS right now, here's a temporary workaround:

### Use Firebase Storage Upload via Firebase Admin SDK (Server-side)

This requires setting up a Next.js API route to handle uploads server-side, bypassing CORS entirely.

**Would you like me to implement this workaround?**

---

## Verification

After applying CORS configuration:

1. Wait 1-2 minutes for changes to propagate
2. Restart your dev server
3. Try uploading a photo again
4. Check browser console - CORS error should be gone

---

## Common Issues

### Issue: "gcloud: command not found"
**Solution:** Install Google Cloud SDK first

### Issue: "Permission denied"
**Solution:** Make sure you're authenticated:
```bash
gcloud auth login
gcloud config set project trapihaus
```

### Issue: "Bucket not found"
**Solution:** Verify your bucket name. Go to Firebase Console → Storage and check the exact bucket name.

---

## Need Help?

If you're having trouble with Google Cloud SDK, I can implement a **server-side upload solution** using Next.js API routes that will bypass CORS completely. Just let me know!
