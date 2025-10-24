"use client";

import { useState, useEffect } from "react";
import { getFirebaseAuth } from "@/lib/auth/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { getUserProfile, updateUserProfile, updateProfilePhoto, createUserProfile } from "@/lib/services/userProfile";
import Image from "next/image";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "security" | "preferences">("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Notification settings state
  const [bookingConfirmations, setBookingConfirmations] = useState(true);
  const [newMessages, setNewMessages] = useState(true);
  const [reviews, setReviews] = useState(true);
  const [promotionsTips, setPromotionsTips] = useState(false);
  const [bookingAlerts, setBookingAlerts] = useState(true);
  const [checkInReminders, setCheckInReminders] = useState(true);
  const [enablePushNotifications, setEnablePushNotifications] = useState(true);

  // Security settings state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  // Preferences state
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Manila (PHT)");
  const [currency, setCurrency] = useState("PHP (₱)");
  const [defaultCheckIn, setDefaultCheckIn] = useState("2:00 PM");
  const [defaultCheckOut, setDefaultCheckOut] = useState("12:00 PM");
  const [defaultCancellationPolicy, setDefaultCancellationPolicy] = useState("Moderate");

  // Load user data on mount
  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setEmail(user.email || "");
        
        // Load profile from Firestore
        try {
          let profile = await getUserProfile(user.uid);
          
          // Create profile if it doesn't exist
          if (!profile) {
            const displayName = user.displayName || "";
            
            await createUserProfile(
              user.uid,
              user.email || "",
              displayName,
              user.photoURL || undefined
            );
            
            profile = await getUserProfile(user.uid);
          }
          
          if (profile) {
            setFirstName(profile.firstName);
            setLastName(profile.lastName);
            setPhone(profile.phoneNumber);
            setAddress(profile.address);
            setBio(profile.bio);
            setPhotoURL(profile.photoURL);
          }
        } catch (error) {
          console.error("Failed to load profile:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Handle photo file selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file (JPG, PNG, or GIF)");
      return;
    }
    
    // Validate file size (2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError("Image must be less than 2MB");
      return;
    }
    
    setUploadError(null);
    setPhotoFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    if (!userId) return;
    
    setSaving(true);
    setSaveMessage(null);
    
    try {
      let newPhotoURL = photoURL;
      
      // Upload new photo if selected
      if (photoFile) {
        newPhotoURL = await updateProfilePhoto(userId, photoFile, photoURL);
        setPhotoURL(newPhotoURL);
        setPhotoPreview(null);
        setPhotoFile(null);
      }
      
      // Update profile data
      await updateUserProfile(userId, {
        firstName,
        lastName,
        phoneNumber: phone,
        address,
        bio,
        photoURL: newPhotoURL,
      });
      
      setSaveMessage("Profile updated successfully!");
      
      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
      setSaveMessage("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-lexend font-semibold text-[#1F2937]">Settings</h1>
        <p className="text-sm text-[#6B7280] font-lexend mt-1">Manage your account and preferences</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1078CF]"></div>
        </div>
      )}

      {/* Content - only show when not loading */}
      {!loading && (
        <>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[#E5E7EB]">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 px-1 text-sm font-lexend font-medium border-b-2 transition-colors ${
            activeTab === "profile"
              ? "border-[#1078CF] text-[#1078CF]"
              : "border-transparent text-[#6B7280] hover:text-[#374151]"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Profile
          </span>
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`pb-3 px-1 text-sm font-lexend font-medium border-b-2 transition-colors ${
            activeTab === "notifications"
              ? "border-[#1078CF] text-[#1078CF]"
              : "border-transparent text-[#6B7280] hover:text-[#374151]"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Notifications
          </span>
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`pb-3 px-1 text-sm font-lexend font-medium border-b-2 transition-colors ${
            activeTab === "security"
              ? "border-[#1078CF] text-[#1078CF]"
              : "border-transparent text-[#6B7280] hover:text-[#374151]"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Security
          </span>
        </button>
        <button
          onClick={() => setActiveTab("preferences")}
          className={`pb-3 px-1 text-sm font-lexend font-medium border-b-2 transition-colors ${
            activeTab === "preferences"
              ? "border-[#1078CF] text-[#1078CF]"
              : "border-transparent text-[#6B7280] hover:text-[#374151]"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Preferences
          </span>
        </button>
      </div>

      {/* Profile Tab Content */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          {/* Profile Photo */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h3 className="font-lexend font-semibold text-[#1F2937] mb-1">Profile Photo</h3>
            <p className="text-sm text-[#6B7280] font-lexend mb-4">Update your profile picture</p>
            
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#E5E7EB] flex items-center justify-center overflow-hidden relative">
                {photoPreview || photoURL ? (
                  <Image 
                    src={photoPreview || photoURL} 
                    alt="Profile" 
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <svg className="w-10 h-10 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div>
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <label
                  htmlFor="photo-upload"
                  className="h-10 px-4 rounded-lg border border-[#E5E7EB] bg-white text-[#374151] text-sm font-lexend hover:bg-[#F9FAFB] transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Upload Photo
                </label>
                {photoFile && (
                  <button
                    onClick={() => {
                      setPhotoFile(null);
                      setPhotoPreview(null);
                      setUploadError(null);
                    }}
                    className="ml-2 text-sm text-[#EF4444] hover:text-[#DC2626] font-lexend"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs text-[#9CA3AF] font-lexend mt-3">JPG, PNG or GIF. Max size 2MB.</p>
            {uploadError && (
              <p className="text-xs text-[#EF4444] font-lexend mt-2">{uploadError}</p>
            )}
            {photoFile && (
              <p className="text-xs text-[#10B981] font-lexend mt-2">New photo selected: {photoFile.name}</p>
            )}
          </div>

          {/* Personal Information */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h3 className="font-lexend font-semibold text-[#1F2937] mb-1">Personal Information</h3>
            <p className="text-sm text-[#6B7280] font-lexend mb-6">Update your personal details</p>

            <div className="space-y-4">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-lexend text-[#374151]">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-lexend text-[#374151]">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="block text-sm font-lexend text-[#374151]">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-11 pr-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-lexend text-[#374151]">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 pl-11 pr-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="block text-sm font-lexend text-[#374151]">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-11 pl-11 pr-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="block text-sm font-lexend text-[#374151]">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell guests about yourself..."
                  maxLength={500}
                  className="w-full min-h-24 px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors resize-none"
                />
                <p className="text-xs text-[#9CA3AF] font-lexend">{bio.length} / 500 characters</p>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6">
              <button 
                onClick={handleSaveProfile}
                disabled={saving}
                className="h-10 px-6 rounded-lg bg-[#1078CF] text-white text-sm font-lexend font-medium hover:bg-[#0e6dbb] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
              {saveMessage && (
                <p className={`text-sm font-lexend mt-2 ${saveMessage.includes("success") ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                  {saveMessage}
                </p>
              )}
            </div>
          </div>

          {/* Account Verification */}
          <div className="bg-[#F0F9FF] border-2 border-[#83C12C] rounded-2xl p-6">
            <h3 className="font-lexend font-semibold text-[#1F2937] mb-1">Account Verification</h3>
            <p className="text-sm text-[#6B7280] font-lexend mb-6">Verify your identity to build trust</p>

            <div className="space-y-4">
              {/* Email Verified */}
              <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D1FAE5] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-lexend font-medium text-sm text-[#1F2937]">Email Verified</p>
                    <p className="text-xs text-[#6B7280] font-lexend">{email}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#D1FAE5] text-[#10B981] text-xs font-lexend font-semibold">
                  ✓ Verified
                </span>
              </div>

              {/* Phone Verified */}
              <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D1FAE5] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-lexend font-medium text-sm text-[#1F2937]">Phone Verified</p>
                    <p className="text-xs text-[#6B7280] font-lexend">{phone}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#D1FAE5] text-[#10B981] text-xs font-lexend font-semibold">
                  ✓ Verified
                </span>
              </div>

              {/* Government ID */}
              <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-lexend font-medium text-sm text-[#1F2937]">Government ID</p>
                    <p className="text-xs text-[#6B7280] font-lexend">Not verified</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#1078CF] text-xs font-lexend font-semibold hover:bg-[#F9FAFB] transition-colors">
                  Verify Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab Content */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          {/* Email Notifications */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h3 className="font-lexend font-semibold text-[#1F2937] mb-1">Email Notifications</h3>
            <p className="text-sm text-[#6B7280] font-lexend mb-6">Choose what updates you receive via email</p>

            <div className="space-y-4">
              {/* Booking Confirmations */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-lexend font-medium text-sm text-[#1F2937]">Booking Confirmations</p>
                  <p className="text-xs text-[#6B7280] font-lexend mt-0.5">Get notified when you receive a new booking</p>
                </div>
                <button
                  onClick={() => setBookingConfirmations(!bookingConfirmations)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    bookingConfirmations ? "bg-[#1078CF]" : "bg-[#E5E7EB]"
                  }`}
                  role="switch"
                  aria-checked={bookingConfirmations}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      bookingConfirmations ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* New Messages */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-lexend font-medium text-sm text-[#1F2937]">New Messages</p>
                  <p className="text-xs text-[#6B7280] font-lexend mt-0.5">Get notified when guests send you messages</p>
                </div>
                <button
                  onClick={() => setNewMessages(!newMessages)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    newMessages ? "bg-[#1078CF]" : "bg-[#E5E7EB]"
                  }`}
                  role="switch"
                  aria-checked={newMessages}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      newMessages ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Reviews */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-lexend font-medium text-sm text-[#1F2937]">Reviews</p>
                  <p className="text-xs text-[#6B7280] font-lexend mt-0.5">Get notified when you receive a new review</p>
                </div>
                <button
                  onClick={() => setReviews(!reviews)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    reviews ? "bg-[#1078CF]" : "bg-[#E5E7EB]"
                  }`}
                  role="switch"
                  aria-checked={reviews}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      reviews ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Promotions & Tips */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-lexend font-medium text-sm text-[#1F2937]">Promotions & Tips</p>
                  <p className="text-xs text-[#6B7280] font-lexend mt-0.5">Receive hosting tips and promotional offers</p>
                </div>
                <button
                  onClick={() => setPromotionsTips(!promotionsTips)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    promotionsTips ? "bg-[#1078CF]" : "bg-[#E5E7EB]"
                  }`}
                  role="switch"
                  aria-checked={promotionsTips}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      promotionsTips ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h3 className="font-lexend font-semibold text-[#1F2937] mb-1">SMS Notifications</h3>
            <p className="text-sm text-[#6B7280] font-lexend mb-6">Receive important updates via text message</p>

            <div className="space-y-4">
              {/* Booking Alerts */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-lexend font-medium text-sm text-[#1F2937]">Booking Alerts</p>
                  <p className="text-xs text-[#6B7280] font-lexend mt-0.5">Urgent booking-related notifications</p>
                </div>
                <button
                  onClick={() => setBookingAlerts(!bookingAlerts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    bookingAlerts ? "bg-[#1078CF]" : "bg-[#E5E7EB]"
                  }`}
                  role="switch"
                  aria-checked={bookingAlerts}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      bookingAlerts ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Check-in Reminders */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-lexend font-medium text-sm text-[#1F2937]">Check-in Reminders</p>
                  <p className="text-xs text-[#6B7280] font-lexend mt-0.5">Reminders for upcoming check-ins</p>
                </div>
                <button
                  onClick={() => setCheckInReminders(!checkInReminders)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    checkInReminders ? "bg-[#1078CF]" : "bg-[#E5E7EB]"
                  }`}
                  role="switch"
                  aria-checked={checkInReminders}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      checkInReminders ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Push Notifications */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h3 className="font-lexend font-semibold text-[#1F2937] mb-1">Push Notifications</h3>
            <p className="text-sm text-[#6B7280] font-lexend mb-6">Browser notifications for real-time updates</p>

            <div className="space-y-4">
              {/* Enable Push Notifications */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-lexend font-medium text-sm text-[#1F2937]">Enable Push Notifications</p>
                  <p className="text-xs text-[#6B7280] font-lexend mt-0.5">Get instant alerts in your browser</p>
                </div>
                <button
                  onClick={() => setEnablePushNotifications(!enablePushNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    enablePushNotifications ? "bg-[#1078CF]" : "bg-[#E5E7EB]"
                  }`}
                  role="switch"
                  aria-checked={enablePushNotifications}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      enablePushNotifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div>
            <button className="h-10 px-6 rounded-lg bg-[#1078CF] text-white text-sm font-lexend font-medium hover:bg-[#0e6dbb] transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* Security Tab Content */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Change Password */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h3 className="font-lexend font-semibold text-[#1F2937] mb-1">Change Password</h3>
            <p className="text-sm text-[#6B7280] font-lexend mb-6">Update your password regularly for security</p>

            <div className="space-y-4">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="block text-sm font-lexend text-[#374151]">Current Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-11 pl-11 pr-12 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors"
                  />
                  <button className="absolute inset-y-0 right-4 flex items-center text-[#9CA3AF] hover:text-[#6B7280]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="block text-sm font-lexend text-[#374151]">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors"
                />
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <label className="block text-sm font-lexend text-[#374151]">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Update Password Button */}
            <div className="mt-6">
              <button className="h-10 px-6 rounded-lg bg-[#1078CF] text-white text-sm font-lexend font-medium hover:bg-[#0e6dbb] transition-colors">
                Update Password
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h3 className="font-lexend font-semibold text-[#1F2937] mb-1">Two-Factor Authentication</h3>
            <p className="text-sm text-[#6B7280] font-lexend mb-6">Add an extra layer of security to your account</p>

            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-4 bg-[#F0F9FF] rounded-xl mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D1FAE5] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-lexend font-medium text-sm text-[#1F2937]">Two-Factor Authentication</p>
                  <p className="text-xs text-[#6B7280] font-lexend">Currently enabled</p>
                </div>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  twoFactorEnabled ? "bg-[#10B981]" : "bg-[#E5E7EB]"
                }`}
                role="switch"
                aria-checked={twoFactorEnabled}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* 2FA Info */}
            {twoFactorEnabled && (
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-4">
                <p className="text-sm text-[#1F2937] font-lexend mb-2">
                  You&apos;re using SMS-based 2FA. A code will be sent to <strong>+63 917 123 4567</strong> when you log in.
                </p>
                <button className="text-sm text-[#1078CF] font-lexend font-medium hover:text-[#0e6dbb] transition-colors">
                  Change 2FA Method
                </button>
              </div>
            )}
          </div>

          {/* Login Activity */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h3 className="font-lexend font-semibold text-[#1F2937] mb-1">Login Activity</h3>
            <p className="text-sm text-[#6B7280] font-lexend mb-6">Monitor your account access</p>

            {/* Login Alerts Toggle */}
            <div className="flex items-center justify-between py-3 mb-4">
              <div>
                <p className="font-lexend font-medium text-sm text-[#1F2937]">Login Alerts</p>
                <p className="text-xs text-[#6B7280] font-lexend mt-0.5">Get notified of new login attempts</p>
              </div>
              <button
                onClick={() => setLoginAlerts(!loginAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  loginAlerts ? "bg-[#1078CF]" : "bg-[#E5E7EB]"
                }`}
                role="switch"
                aria-checked={loginAlerts}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    loginAlerts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Current Session */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl">
                <div>
                  <p className="font-lexend font-medium text-sm text-[#1F2937]">Current Session</p>
                  <p className="text-xs text-[#6B7280] font-lexend mt-1">Chrome on Windows • Baguio, Philippines</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#D1FAE5] text-[#10B981] text-xs font-lexend font-semibold">
                  Active
                </span>
              </div>

              {/* Mobile App Session */}
              <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl">
                <div>
                  <p className="font-lexend font-medium text-sm text-[#1F2937]">Mobile App</p>
                  <p className="text-xs text-[#6B7280] font-lexend mt-1">iOS • 2 hours ago</p>
                </div>
                <button className="px-3 py-1 rounded-lg text-[#EF4444] text-xs font-lexend font-semibold hover:bg-[#FEF2F2] transition-colors">
                  Revoke
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white border-2 border-[#FEE2E2] rounded-2xl p-6">
            <h3 className="font-lexend font-semibold text-[#EF4444] mb-1">Danger Zone</h3>
            <p className="text-sm text-[#6B7280] font-lexend mb-4">Irreversible actions</p>

            <button className="w-full h-12 rounded-lg border-2 border-[#EF4444] bg-white text-[#EF4444] text-sm font-lexend font-semibold hover:bg-[#FEF2F2] transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Delete Account
            </button>
          </div>
        </div>
      )}

      {/* Preferences Tab Content */}
      {activeTab === "preferences" && (
        <div className="space-y-6">
          {/* Language & Region */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h3 className="font-lexend font-semibold text-[#1F2937] mb-1">Language & Region</h3>
            <p className="text-sm text-[#6B7280] font-lexend mb-6">Set your language and regional preferences</p>

            <div className="space-y-4">
              {/* Language */}
              <div className="space-y-2">
                <label className="block text-sm font-lexend text-[#374151]">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors appearance-none cursor-pointer"
                >
                  <option>English</option>
                  <option>Filipino</option>
                  <option>Spanish</option>
                </select>
              </div>

              {/* Timezone */}
              <div className="space-y-2">
                <label className="block text-sm font-lexend text-[#374151]">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors appearance-none cursor-pointer"
                >
                  <option>Asia/Manila (PHT)</option>
                  <option>Asia/Tokyo (JST)</option>
                  <option>America/New_York (EST)</option>
                  <option>Europe/London (GMT)</option>
                </select>
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <label className="block text-sm font-lexend text-[#374151]">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors appearance-none cursor-pointer"
                >
                  <option>PHP (₱)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>JPY (¥)</option>
                </select>
              </div>
            </div>

            {/* Save Preferences Button */}
            <div className="mt-6">
              <button className="h-10 px-6 rounded-lg bg-[#1078CF] text-white text-sm font-lexend font-medium hover:bg-[#0e6dbb] transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Save Preferences
              </button>
            </div>
          </div>

          {/* Default Listing Settings */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h3 className="font-lexend font-semibold text-[#1F2937] mb-1">Default Listing Settings</h3>
            <p className="text-sm text-[#6B7280] font-lexend mb-6">Set default values for new listings</p>

            <div className="space-y-4">
              {/* Default Check-in Time */}
              <div className="space-y-2">
                <label className="block text-sm font-lexend text-[#374151]">Default Check-in Time</label>
                <select
                  value={defaultCheckIn}
                  onChange={(e) => setDefaultCheckIn(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors appearance-none cursor-pointer"
                >
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>

              {/* Default Check-out Time */}
              <div className="space-y-2">
                <label className="block text-sm font-lexend text-[#374151]">Default Check-out Time</label>
                <select
                  value={defaultCheckOut}
                  onChange={(e) => setDefaultCheckOut(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors appearance-none cursor-pointer"
                >
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                </select>
              </div>

              {/* Default Cancellation Policy */}
              <div className="space-y-2">
                <label className="block text-sm font-lexend text-[#374151]">Default Cancellation Policy</label>
                <select
                  value={defaultCancellationPolicy}
                  onChange={(e) => setDefaultCancellationPolicy(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-lexend text-[#1F2937] outline-none focus:border-[#1078CF] focus:bg-white transition-colors appearance-none cursor-pointer"
                >
                  <option>Flexible</option>
                  <option>Moderate</option>
                  <option>Strict</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h3 className="font-lexend font-semibold text-[#1F2937] mb-1">Data & Privacy</h3>
            <p className="text-sm text-[#6B7280] font-lexend mb-6">Manage your data preferences</p>

            <div className="space-y-3">
              {/* Download My Data */}
              <button className="w-full flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl hover:bg-[#F3F4F6] transition-colors text-left">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#6B7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-lexend font-medium text-sm text-[#1F2937]">Download My Data</span>
                </div>
                <svg className="w-5 h-5 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Privacy Policy */}
              <button className="w-full flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl hover:bg-[#F3F4F6] transition-colors text-left">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#6B7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-lexend font-medium text-sm text-[#1F2937]">Privacy Policy</span>
                </div>
                <svg className="w-5 h-5 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Terms of Service */}
              <button className="w-full flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl hover:bg-[#F3F4F6] transition-colors text-left">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#6B7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-lexend font-medium text-sm text-[#1F2937]">Terms of Service</span>
                </div>
                <svg className="w-5 h-5 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
}
