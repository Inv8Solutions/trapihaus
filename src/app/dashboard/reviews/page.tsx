"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faMagnifyingGlass,
  faEllipsisVertical,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

function Stat({ icon, label, value, tint, valueColor }: { icon: any; label: string; value: string; tint: string; valueColor: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white border border-[#E5E7EB] h-[92px] px-5">
      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tint}`} aria-hidden>
        <FontAwesomeIcon icon={icon} className="text-[18px]" />
      </div>
      <div>
        <div className={`text-[18px] md:text-[20px] font-lexend font-bold ${valueColor}`}>{value}</div>
        <div className="text-sm text-[#6B7280] font-lexend">{label}</div>
      </div>
    </div>
  );
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const stars = Array.from({ length: 5 }).map((_, i) => (
    <FontAwesomeIcon key={i} icon={faStar} className={`${i < full ? "text-[#F59E0B]" : "text-[#E5E7EB]"} w-3.5 h-3.5`} />
  ));
  return <div className="flex items-center gap-1">{stars}</div>;
}

type Aspect = "Cleanliness" | "Accuracy" | "Communication" | "Location" | "Check-in" | "Value";

function AspectGrid({ scores }: { scores: Record<Aspect, number> }) {
  const entries = Object.entries(scores) as [Aspect, number][];
  return (
    <div className="grid grid-cols-3 gap-y-4 gap-x-6">
      {entries.map(([k, v]) => (
        <div key={k} className="text-[12px]">
          <div className="text-[#6B7280] font-lexend">{k}</div>
          <div className="flex items-center gap-1">
            <Stars value={v} />
            <span className="text-[#6B7280]">{v}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewCard({
  name,
  reviewsCount,
  date,
  property,
  text,
  scores,
  helpfulCount,
  bookingId,
  withResponse,
}: {
  name: string;
  reviewsCount: number;
  date: string;
  property: string;
  text: string;
  scores: Record<Aspect, number>;
  helpfulCount: number;
  bookingId: string;
  withResponse?: boolean;
}) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[13px] font-lexend text-[#111827] font-semibold">{name} <span className="ml-1 text-[#6B7280] font-normal">{reviewsCount} reviews</span></div>
          <div className="flex items-center gap-2 text-[12px] text-[#6B7280] font-lexend">
            <Stars value={5} />
            <span>•</span>
            <span>{date}</span>
          </div>
          <div className="text-[11px] text-[#6B7280] font-lexend">{property}</div>
        </div>
        <button className="h-8 w-8 rounded-full text-[#6B7280] hover:bg-[#F3F4F6]"><FontAwesomeIcon icon={faEllipsisVertical} /></button>
      </div>

      <p className="mt-3 text-[13px] text-[#111827]">
        {text}
      </p>

      <div className="mt-4">
        <AspectGrid scores={scores} />
      </div>

      {!withResponse ? (
        <div className="mt-4">
          <div className="relative">
            <div className="h-8 rounded-md border border-[#E5E7EB]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="h-8 px-4 rounded-md border border-[#CCE0FF] text-[#1078CF] bg-[#F5FAFF] text-[12px] font-lexend">Respond to Review</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-[#BFDBFE] bg-[#F5FAFF] p-3 text-[12px] text-[#111827]">
          <div className="text-[#1078CF] font-lexend">Your Response • Oct 13, 2024</div>
          <div className="mt-1">Thank you for your feedback, John! We’re glad you enjoyed your stay. We’re working on upgrading our WiFi speed. Hope to host you again!</div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-[11px] text-[#6B7280] font-lexend">
        <div className="flex items-center gap-1"><FontAwesomeIcon icon={faThumbsUp} /> {helpfulCount} found this helpful</div>
        <div>Booking ID: {bookingId}</div>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  const [query, setQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-[22px] md:text-[24px] font-lexend font-semibold text-[#111827]">Reviews</h1>
        <p className="text-[#6B7280] text-sm mt-1 font-lexend">Track your revenue and manage payouts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat icon={faStar} label="Average Rating" value="4.8" tint="bg-[#FFFBEB] text-[#F59E0B]" valueColor="text-[#F59E0B]" />
        <Stat icon={faMagnifyingGlass} label="Total Reviews" value="₱4,600" tint="bg-[#EFF6FF] text-[#1D4ED8]" valueColor="text-[#1D4ED8]" />
        <Stat icon={faMagnifyingGlass} label="Response Rate" value="₱3,200" tint="bg-[#FFF7ED] text-[#A16207]" valueColor="text-[#A16207]" />
        <Stat icon={faMagnifyingGlass} label="Awaiting Response" value="82%" tint="bg-[#F5F3FF] text-[#6D28D9]" valueColor="text-[#6D28D9]" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-12 rounded-full bg-white border border-[#E5E7EB] px-4 flex items-center gap-3">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#6B7280]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm font-lexend"
            placeholder="Search Reviews"
          />
        </div>
        <select
          className="h-12 px-4 rounded-xl bg-white border border-[#E5E7EB] text-sm font-lexend"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option>All Ratings</option>
          <option>5 Stars</option>
          <option>4 Stars</option>
          <option>3 Stars</option>
          <option>2 Stars</option>
          <option>1 Star</option>
        </select>
      </div>

      {/* Review list */}
      <div className="space-y-4">
        <ReviewCard
          name="Maria Dela Cruz"
          reviewsCount={12}
          date="Oct 14, 2024"
          property="Loakan Heights Residences"
          text="Amazing place! The view was spectacular and the amenities were top-notch. Host was very responsive and helpful. Would definitely recommend to anyone visiting Baguio!"
          scores={{ Cleanliness: 5, Accuracy: 5, Communication: 5, Location: 5, "Check-in": 5, Value: 5 }}
          helpfulCount={8}
          bookingId="RES-2024-001"
        />

        <ReviewCard
          name="John Rodriguez"
          reviewsCount={8}
          date="Oct 12, 2024"
          property="Pinecrest Transient"
          text="Good value for money. The room was clean and comfortable. WiFi could be faster, but overall a pleasant stay."
          scores={{ Cleanliness: 5, Accuracy: 4, Communication: 4, Location: 4, "Check-in": 4, Value: 5 }}
          helpfulCount={3}
          bookingId="RES-2024-002"
          withResponse
        />
      </div>
    </div>
  );
}
