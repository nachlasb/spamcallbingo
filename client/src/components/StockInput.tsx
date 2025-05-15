import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, BarChart2 } from "lucide-react";
import SentimentIndicator from "./SentimentIndicator";
import { SentimentType } from "@/lib/types";

interface StockInputProps {
  onAnalyze: (symbol: string) => void;
  isLoading: boolean;
  sentiment: SentimentType | undefined;
}

export default function StockInput({ onAnalyze, isLoading, sentiment }: StockInputProps) {
  const [symbol, setSymbol] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(symbol.trim().toUpperCase());
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-stretch">
        <div className="flex-grow gradient-border">
          <div className="p-0.5 bg-muted">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter stock ticker symbol (e.g., AAPL, MSFT, TSLA)"
                className="w-full py-6 pl-10 pr-4 bg-muted text-foreground border-none focus:outline-none focus:ring-1 focus:ring-primary rounded-lg"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 h-auto bg-gradient-to-r from-primary to-secondary rounded-lg font-medium shadow-lg hover:opacity-90 transition-opacity"
        >
          <span className="flex items-center justify-center">
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <BarChart2 className="mr-2" />
            )}
            Analyze
          </span>
        </Button>
      </form>
      
      {/* Stock sentiment indicator */}
      <div className="flex items-center justify-center mt-4 gap-4">
        <div className="text-sm text-muted-foreground">Current Sentiment:</div>
        <SentimentIndicator sentiment={sentiment} />
      </div>
    </div>
  );
}
