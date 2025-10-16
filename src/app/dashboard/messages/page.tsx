"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPaperclip, faPaperPlane, faPhone, faVideo, faEllipsisVertical, faLocationDot } from "@fortawesome/free-solid-svg-icons";

type Message = { id: string; from: "me" | "them"; text: string; time: string };
type Thread = {
  id: string;
  name: string;
  property: string;
  avatarColor: string;
  preview: string;
  timeAgo: string;
  messages: Message[];
};

const sampleThreads: Thread[] = [
  {
    id: "t1",
    name: "Maria Dela Cruz",
    property: "Loakan Heights Residences",
    avatarColor: "bg-[#F59E0B]",
    preview: "Thank you! Looking forward to our stay.",
    timeAgo: "2 min ago",
    messages: [
      { id: "m1", from: "them", text: "Hi! I have a booking for Oct 20-23. Can I ask about parking availability?", time: "10:30 AM" },
      { id: "m2", from: "me", text: "Hello Maria! Yes, we have free parking available for guests. You can park right in front of the property.", time: "10:35 AM" },
      { id: "m3", from: "them", text: "That's great! Also, would it be possible to check in earlier, around 12 PM?", time: "10:38 AM" },
      { id: "m4", from: "me", text: "Let me check the availability for early check-in. I'll get back to you within the hour.", time: "10:40 AM" },
      { id: "m5", from: "me", text: "Good news! Early check-in at 12 PM is available for your dates. No additional charge.", time: "11:15 AM" },
      { id: "m6", from: "them", text: "Thank you! Looking forward to our stay.", time: "11:20 AM" },
    ],
  },
  {
    id: "t2",
    name: "John Rodriguez",
    property: "Pinecrest Transient",
    avatarColor: "bg-[#10B981]",
    preview: "Is wifi available?",
    timeAgo: "1 hour ago",
    messages: [],
  },
  {
    id: "t3",
    name: "Sarah Lim",
    property: "Burnham View Hotel",
    avatarColor: "bg-[#3B82F6]",
    preview: "Perfect! See you tomorrow.",
    timeAgo: "3 hours ago",
    messages: [],
  },
  {
    id: "t4",
    name: "Carlos Martinez",
    property: "Loakan Heights Residences",
    avatarColor: "bg-[#8B5CF6]",
    preview: "Thank you for the wonderful stay!",
    timeAgo: "2 days ago",
    messages: [],
  },
];

export default function MessagesPage() {
  const [threads] = useState<Thread[]>(sampleThreads);
  const [activeId, setActiveId] = useState<string>(threads[0]?.id ?? "");
  const active = useMemo(() => threads.find((t) => t.id === activeId)!, [threads, activeId]);
  const [input, setInput] = useState("");

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left: conversations */}
      <aside className="col-span-4 xl:col-span-3">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
          <div className="h-12 px-3 flex items-center gap-2 border-b border-[#E5E7EB]">
            <FontAwesomeIcon icon={faSearch} className="text-[#6B7280]" />
            <input className="flex-1 outline-none text-sm font-lexend" placeholder="Search conversations..." />
          </div>
          <div className="max-h-[520px] overflow-auto">
            {threads.map((t) => {
              const isActive = t.id === activeId;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveId(t.id)}
                  className={`w-full text-left px-3 py-3 flex items-start gap-3 border-b border-[#F3F4F6] ${
                    isActive ? "bg-[#F5FAFF] border-l-4 border-l-[#3B82F6]" : "hover:bg-[#F9FAFB]"
                  }`}
                >
                  <span className={`h-9 w-9 rounded-full ${t.avatarColor}`} aria-hidden />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-lexend text-[#111827] truncate">{t.name}</div>
                      <div className="text-[11px] text-[#9CA3AF] font-lexend">{t.timeAgo}</div>
                    </div>
                    <div className="text-[11px] text-[#6B7280] font-lexend truncate">{t.property}</div>
                    <div className="text-[11px] text-[#6B7280] font-lexend truncate">{t.preview}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Right: chat */}
      <section className="col-span-8 xl:col-span-9">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
          {/* Chat header */}
          <div className="px-4 py-3 border-b border-[#E5E7EB] flex items-center justify-between">
            <div>
              <div className="text-sm font-lexend text-[#111827] font-semibold">{active.name}</div>
              <div className="text-[11px] text-[#6B7280] font-lexend flex items-center gap-1">
                <FontAwesomeIcon icon={faLocationDot} className="text-[#1078CF]" />
                {active.property}
              </div>
            </div>
            <div className="flex items-center gap-3 text-[#6B7280]">
              <button className="h-9 w-9 rounded-full bg-[#F3F4F6] flex items-center justify-center"><FontAwesomeIcon icon={faPhone} /></button>
              <button className="h-9 w-9 rounded-full bg-[#F3F4F6] flex items-center justify-center"><FontAwesomeIcon icon={faVideo} /></button>
              <button className="h-9 w-9 rounded-full bg-[#F3F4F6] flex items-center justify-center"><FontAwesomeIcon icon={faEllipsisVertical} /></button>
            </div>
          </div>

          {/* Chat body */}
          <div className="px-4 py-4 space-y-3 max-h-[460px] overflow-auto">
            {active.messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] text-[12px] px-3 py-2 rounded-2xl ${
                  m.from === "me" ? "bg-[#3B82F6] text-white rounded-br-md" : "bg-[#F3F4F6] text-[#111827] rounded-bl-md"
                }`}>
                  <div>{m.text}</div>
                  <div className={`mt-1 text-[10px] ${m.from === "me" ? "text-white/80" : "text-[#6B7280]"}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="px-3 py-3 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-2 bg-white rounded-xl border border-[#E5E7EB] px-3 h-12">
              <button className="text-[#6B7280]"><FontAwesomeIcon icon={faPaperclip} /></button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 outline-none text-sm font-lexend"
                placeholder="Type a message..."
              />
              <button className="h-9 w-9 rounded-full bg-[#1078CF] text-white flex items-center justify-center"><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
            <div className="mt-2 text-[10px] text-[#9CA3AF] font-lexend">Press Enter to send, Shift+Enter for new line</div>
          </div>
        </div>
      </section>
    </div>
  );
}
