import { useContext } from "react";
import { BingoContext } from "@/context/BingoContext";
import BingoTile from "@/components/BingoTile";

export default function BingoCard() {
  const { currentCard, winLines } = useContext(BingoContext);
  
  return (
    <div className="relative mx-auto mb-8 max-w-2xl bg-white rounded-md border border-gray-200 shadow-sm p-4 md:p-6">
      {/* Bingo Card Header */}
      <div className="grid grid-cols-5 gap-2 mb-2">
        {['B', 'I', 'N', 'G', 'O'].map((letter, index) => (
          <div 
            key={index} 
            className="bg-black text-white text-center font-bold py-2 rounded-sm text-xl md:text-2xl"
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Bingo Card Grid */}
      <div className="relative grid grid-cols-5 gap-2 aspect-square">
        {currentCard.map((phrase, index) => (
          <BingoTile 
            key={index} 
            phrase={phrase} 
            index={index}
          />
        ))}
      </div>

      {/* Win Lines Container */}
      <div className="absolute inset-0 pointer-events-none">
        {winLines.map((line, index) => (
          <div 
            key={index}
            className={`win-line ${line.type === 'row' ? 'horizontal' : line.type === 'column' ? 'vertical' : line.type === 'diagonal-1' ? 'diagonal-1' : 'diagonal-2'}`}
            style={
              line.type === 'row' 
                ? { top: `${line.index * 20 + 10}%` } 
                : line.type === 'column' 
                  ? { left: `${line.index * 20 + 10}%` } 
                  : {}
            }
          />
        ))}
      </div>
    </div>
  );
}
