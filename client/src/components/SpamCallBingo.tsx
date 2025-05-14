import { useContext } from "react";
import BingoCard from "@/components/BingoCard";
import WinNotification from "@/components/WinNotification";
import HowToPlay from "@/components/HowToPlay";
import { BingoContext } from "@/context/BingoContext";
import { Button } from "@/components/ui/button";
import { RefreshCw, PhoneOff } from "lucide-react";

export default function SpamCallBingo() {
  const { hasWon, generateNewCard, resetCurrentCard } = useContext(BingoContext);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Section */}
      <header className="mb-6 text-center">
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-5xl font-marker text-red-600 mb-2 tracking-wider">
            Spam Call Bingo
          </h1>
          {/* Phone icon with ripple effect */}
          <div className="absolute -top-2 -right-6 animate-pulse">
            <span className="inline-block p-2 bg-red-500 rounded-full text-white">
              <PhoneOff className="h-5 w-5" />
            </span>
          </div>
        </div>
        <p className="text-gray-600 max-w-lg mx-auto">
          Mark a tile when you receive a spam call with that phrase. Get 5 in a row (horizontal, vertical, or diagonal) to win!
        </p>
      </header>

      {/* Bingo Win Notification */}
      {hasWon && <WinNotification />}

      {/* Bingo Card Section */}
      <BingoCard />

      {/* Game Controls */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <Button 
          onClick={generateNewCard}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          New Card
        </Button>
        <Button 
          onClick={resetCurrentCard}
          variant="secondary"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Reset Current Card
        </Button>
      </div>

      {/* How to Play Section */}
      <HowToPlay />

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm mt-8">
        <p>© {new Date().getFullYear()} Spam Call Bingo | May the odds be never in the spammers' favor</p>
      </footer>
    </div>
  );
}
