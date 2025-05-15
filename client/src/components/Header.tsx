import { MoonIcon, Music2Icon } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-card shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <Music2Icon className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-semibold">StockRock</h1>
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
        </div>
      </div>
    </header>
  );
}
