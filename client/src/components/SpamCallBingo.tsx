import { useContext } from "react";
import BingoCard from "@/components/BingoCard";
import WinNotification from "@/components/WinNotification";
import HowToPlay from "@/components/HowToPlay";
import { BingoContext } from "@/context/BingoContext";
import { Button } from "@/components/ui/button";
import { RefreshCw, PhoneOff, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SpamCallBingo() {
  const { hasWon, generateNewCard, resetCurrentCard } = useContext(BingoContext);
  const { toast } = useToast();

  const handleShare = () => {
    // Base URL of the application
    const shareUrl = window.location.origin;
    
    // Copy to clipboard and show success message
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: "Link copied to clipboard",
        description: "Send the link to your friends to play Spam Call Bingo!",
        duration: 3000,
      });
    }).catch(() => {
      // Fallback if clipboard API fails
      toast({
        title: "Couldn't copy automatically",
        description: "Share this page's URL with your friends to play Spam Call Bingo!",
        duration: 3000,
      });
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-6xl font-heading text-black mb-3">
            SPAM CALL BINGO
          </h1>
          {/* Phone icon */}
          <div className="absolute -top-2 -right-6">
            <span className="inline-block p-2 bg-black rounded-md text-white">
              <PhoneOff className="h-5 w-5" />
            </span>
          </div>
        </div>
        <p className="text-gray-700 max-w-lg mx-auto font-medium">
          Mark a tile when you receive a spam call with that phrase. Get 5 in a row to win.
        </p>
      </header>

      {/* Bingo Win Notification */}
      {hasWon && <WinNotification />}

      {/* Bingo Card Section */}
      <BingoCard />

      {/* Game Controls */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <Button 
          onClick={generateNewCard}
          className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-md shadow-sm transition-colors duration-200 flex items-center justify-center"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          New Card
        </Button>
        <Button 
          onClick={resetCurrentCard}
          variant="secondary"
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-6 rounded-md shadow-sm transition-colors duration-200 flex items-center justify-center"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Reset Current Card
        </Button>
        <Button 
          onClick={handleShare}
          className="button-share"
        >
          <Share2 className="h-5 w-5 mr-2" />
          Send one to a friend
        </Button>
      </div>

      {/* How to Play Section */}
      <HowToPlay />

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm mt-10 border-t border-gray-200 pt-6">
        <p>© {new Date().getFullYear()} Spam Call Bingo</p>
      </footer>
    </div>
  );
}
