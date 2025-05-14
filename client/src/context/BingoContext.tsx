import { createContext, useState, ReactNode, useEffect } from "react";
import { generateBingoCard, checkForWin, WinLine } from "@/lib/bingoUtils";

interface BingoContextType {
  currentCard: string[];
  markedTiles: number[];
  hasWon: boolean;
  winLines: WinLine[];
  toggleTile: (index: number) => void;
  generateNewCard: () => void;
  resetCurrentCard: () => void;
}

export const BingoContext = createContext<BingoContextType>({
  currentCard: [],
  markedTiles: [],
  hasWon: false,
  winLines: [],
  toggleTile: () => {},
  generateNewCard: () => {},
  resetCurrentCard: () => {}
});

interface BingoProviderProps {
  children: ReactNode;
}

export function BingoProvider({ children }: BingoProviderProps) {
  const [currentCard, setCurrentCard] = useState<string[]>([]);
  const [markedTiles, setMarkedTiles] = useState<number[]>([]);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [winLines, setWinLines] = useState<WinLine[]>([]);

  // Initialize the game on first load
  useEffect(() => {
    generateNewCard();
  }, []);

  // Handle tile toggling
  const toggleTile = (index: number) => {
    if (hasWon) return; // Prevent further clicks if game is won

    setMarkedTiles(prev => {
      // If already marked, remove it
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      // Otherwise add it
      return [...prev, index];
    });
  };

  // Check for win when marked tiles change
  useEffect(() => {
    if (hasWon || markedTiles.length < 5) return;

    const winLine = checkForWin(markedTiles);
    if (winLine) {
      setHasWon(true);
      setWinLines([...winLines, winLine]);
    }
  }, [markedTiles, hasWon, winLines]);

  // Generate a new bingo card
  const generateNewCard = () => {
    const newCard = generateBingoCard();
    setCurrentCard(newCard);
    
    // Mark the FREE SPACE by default
    const freeIndex = newCard.indexOf("FREE SPACE");
    setMarkedTiles(freeIndex !== -1 ? [freeIndex] : []);
    
    setHasWon(false);
    setWinLines([]);
  };

  // Reset the current card (clear all marks except FREE)
  const resetCurrentCard = () => {
    const freeIndex = currentCard.indexOf("FREE SPACE");
    setMarkedTiles(freeIndex !== -1 ? [freeIndex] : []);
    setHasWon(false);
    setWinLines([]);
  };

  return (
    <BingoContext.Provider value={{
      currentCard,
      markedTiles,
      hasWon,
      winLines,
      toggleTile,
      generateNewCard,
      resetCurrentCard
    }}>
      {children}
    </BingoContext.Provider>
  );
}
