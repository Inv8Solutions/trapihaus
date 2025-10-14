interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-[#E5E7EB]">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-16">
        <div>
          <h1 className="font-lexend font-semibold text-[18px]">Host Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Notifications" className="h-9 w-9 rounded-full bg-[#F3F4F6] text-[#374151]">🔔</button>
          <button aria-label="Help" className="h-9 w-9 rounded-full bg-[#F3F4F6] text-[#374151]">❔</button>
          <div className="ml-2 h-9 px-3 rounded-full bg-[#1078CF] text-white flex items-center font-lexend text-sm">
            {userName}
          </div>
        </div>
      </div>
    </header>
  );
}
