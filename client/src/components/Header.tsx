import { MoonIcon, UserIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-card shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 15l3-3 2 2 4-4 2 2v3H7z" />
          </svg>
          <h1 className="text-xl font-semibold">StockBeats</h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* Theme toggle button (disabled since we're using dark theme) */}
          <button 
            className="p-2 rounded-full bg-muted text-muted-foreground" 
            title="Dark mode enabled" 
            disabled
          >
            <MoonIcon className="w-4 h-4" />
          </button>
          
          {/* User menu */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <UserIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
