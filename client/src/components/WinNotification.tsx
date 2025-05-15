import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useContext, useEffect, useState } from "react";
import { BingoContext } from "@/context/BingoContext";

export default function WinNotification() {
  const { hasWon } = useContext(BingoContext);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    if (hasWon) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [hasWon]);

  return (
    <Alert 
      className={`mb-6 bg-gray-100 border-l-4 border-black text-gray-800 p-4 rounded-sm shadow-sm ${animate ? 'animate-pulse-subtle' : ''}`}
    >
      <div className="flex">
        <div className="py-1">
          <CheckCircle className="h-6 w-6 text-black mr-4" />
        </div>
        <div>
          <AlertTitle className="font-bold font-heading tracking-tight">BINGO</AlertTitle>
          <AlertDescription className="text-sm">
            You've completed a line. Press 'New Card' to play again.
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
