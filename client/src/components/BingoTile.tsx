import { useContext } from "react";
import { BingoContext } from "@/context/BingoContext";
import { cn } from "@/lib/utils";

interface BingoTileProps {
  phrase: string;
  index: number;
}

export default function BingoTile({ phrase, index }: BingoTileProps) {
  const { markedTiles, toggleTile, hasWon } = useContext(BingoContext);
  const isFreeSpace = phrase === "FREE SPACE";
  const isMarked = markedTiles.includes(index);
  const row = Math.floor(index / 5);
  const col = index % 5;

  const handleClick = () => {
    if (hasWon) return; // Prevent clicks if game is won
    toggleTile(index);
  };

  return (
    <div
      data-index={index}
      data-row={row}
      data-col={col}
      className={cn(
        "bingo-tile",
        "bg-white",
        "border",
        "border-gray-300",
        "rounded-sm",
        "shadow-sm",
        "flex",
        "items-center",
        "justify-center",
        "relative",
        "transition-all",
        "duration-200",
        "hover:border-gray-500",
        "cursor-pointer",
        isMarked && "marked",
        isFreeSpace && "bg-gray-100"
      )}
      onClick={handleClick}
    >
      <div className="bingo-tile-content">
        {isFreeSpace ? (
          <span className="font-bold text-black">{phrase}</span>
        ) : (
          <span className="text-gray-800 font-medium">{phrase}</span>
        )}
      </div>
    </div>
  );
}
