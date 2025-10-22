"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  userName: string;
}

interface Notification {
  id: string;
  type: "booking" | "message" | "review";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export default function Header({ userName }: HeaderProps) {
  const router = useRouter();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "booking",
      title: "New Booking Request",
      message: "Maria Dela Cruz requested to book Loakan Heights for Oct 20-23",
      time: "2 min ago",
      isRead: false,
    },
    {
      id: "2",
      type: "message",
      title: "New Message",
      message: 'John Rodriguez: "Is WiFi available at the property?"',
      time: "15 min ago",
      isRead: false,
    },
    {
      id: "3",
      type: "review",
      title: "New Review",
      message: "Sarah Lim left a 5-star review for Burnham View Hotel",
      time: "1 hour ago",
      isRead: false,
    },
  ]);

  const notificationRef = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const clearRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.isRead));
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    if (isNotificationsOpen || isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationsOpen, isUserMenuOpen]);

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-[#E5E7EB] mb-7">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-16">
        <div>
          <h1 className="font-lexend font-semibold text-[18px]">Host Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Notifications Button */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              aria-label="Notifications"
              className="relative h-9 w-9 rounded-full bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB] transition-colors"
            >
              🔔
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 px-1.5 min-w-[20px] rounded-full bg-[#F68109] text-white text-xs font-lexend font-semibold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-2xl shadow-xl border border-[#E5E7EB] overflow-hidden z-50">
                {/* Header */}
                <div className="px-5 py-4 border-b border-[#E5E7EB]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-lexend font-semibold text-[18px] text-[#1F2937]">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="px-3 py-1 rounded-full bg-[#F68109] text-white text-xs font-lexend font-semibold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={markAllAsRead}
                      className="flex-1 h-9 rounded-lg border border-[#E5E7EB] bg-white text-[#374151] text-sm font-lexend hover:bg-[#F9FAFB] transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Mark all read
                    </button>
                    <button
                      onClick={clearRead}
                      className="flex-1 h-9 rounded-lg border border-[#E5E7EB] bg-white text-[#374151] text-sm font-lexend hover:bg-[#F9FAFB] transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Clear read
                    </button>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-5 py-8 text-center text-[#9CA3AF] text-sm font-lexend">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-5 py-4 border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors cursor-pointer relative ${
                          !notification.isRead ? "bg-[#F0F9FF]" : ""
                        }`}
                      >
                        {!notification.isRead && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1078CF]" />
                        )}
                        <h4 className="font-lexend font-semibold text-[15px] text-[#1F2937] mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-[#6B7280] font-lexend mb-2 pr-4">
                          {notification.message}
                        </p>
                        <p className="text-xs text-[#9CA3AF] font-lexend">{notification.time}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-[#E5E7EB] bg-[#F9FAFB]">
                  <button className="w-full text-center text-sm font-lexend text-[#1078CF] hover:text-[#0e6dbb] transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Notification Settings
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => router.push("/dashboard/messages")}
            aria-label="Messages"
            className="h-9 w-9 rounded-full bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB] transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* User Menu */}
          <div className="relative ml-2" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="h-9 px-3 rounded-full bg-[#1078CF] text-white flex items-center gap-2 font-lexend text-sm hover:bg-[#0e6dbb] transition-colors"
            >
              {userName}
              <svg
                className={`w-4 h-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E5E7EB] overflow-hidden z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                  <p className="font-lexend font-semibold text-[15px] text-[#1F2937]">{userName}</p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      router.push("/dashboard/account");
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm font-lexend text-[#374151] hover:bg-[#F9FAFB] transition-colors flex items-center gap-3"
                  >
                    <svg className="w-5 h-5 text-[#6B7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Account
                  </button>
                  <button
                    onClick={() => {
                      router.push("/dashboard/settings");
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm font-lexend text-[#374151] hover:bg-[#F9FAFB] transition-colors flex items-center gap-3"
                  >
                    <svg className="w-5 h-5 text-[#6B7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Settings
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-[#E5E7EB]">
                  <button
                    onClick={() => {
                      // Add logout logic here
                      console.log("Logging out...");
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm font-lexend text-[#EF4444] hover:bg-[#FEF2F2] transition-colors flex items-center gap-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
