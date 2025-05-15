import { useEffect, useRef, useState } from "react";
import { Clock, RadarIcon, SmileIcon } from "lucide-react";
import { loadTradingViewScript, createTradingViewWidget } from "@/lib/tradingview";
import { SentimentAnalysis } from "@/lib/types";

interface StockChartProps {
  symbol: string;
  analyzed: boolean;
  sentiment: SentimentAnalysis | null;
}

export default function StockChart({ symbol, analyzed, sentiment }: StockChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isChartLoaded, setIsChartLoaded] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<string>("Just now");

  // Load TradingView Widget script when component mounts
  useEffect(() => {
    loadTradingViewScript()
      .then(() => setIsChartLoaded(true))
      .catch((error) => console.error("Failed to load TradingView script:", error));
  }, []);

  // Create TradingView Widget when symbol changes and chart is loaded
  useEffect(() => {
    if (isChartLoaded && symbol && analyzed) {
      createTradingViewWidget({
        symbol,
        interval: "1",
        theme: "dark",
        container_id: "tradingview-widget",
      });
      
      // Update last update time
      const now = new Date();
      setLastUpdateTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    }
  }, [isChartLoaded, symbol, analyzed]);

  // Update time periodically
  useEffect(() => {
    if (!analyzed) return;
    
    const timer = setInterval(() => {
      const now = new Date();
      setLastUpdateTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(timer);
  }, [analyzed]);

  return (
    <div className="gradient-border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Real-Time Stock Chart</h2>
          <div className="flex items-center text-muted-foreground text-sm">
            <span className="font-mono">{symbol || "--"}</span>
            <span className="mx-2">•</span>
            <span className="bg-muted px-2 py-0.5 rounded">1min</span>
          </div>
        </div>
        
        {/* TradingView Chart Widget Container */}
        <div className="w-full rounded-lg overflow-hidden bg-muted relative" style={{ height: "400px" }}>
          {!analyzed ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card">
              <div className="absolute inset-0 bg-card opacity-40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
                <svg className="w-12 h-12 text-primary mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 15l3-3 2 2 4-4 2 2v3H7z" />
                </svg>
                <h3 className="text-xl font-semibold">Enter a stock ticker to begin</h3>
                <p className="text-muted-foreground max-w-md mt-2">
                  We'll analyze the chart patterns and generate a music playlist matching the stock's sentiment
                </p>
              </div>
            </div>
          ) : (
            <div id="tradingview-widget" className="w-full h-full"></div>
          )}
        </div>
        
        {/* Analysis status indicators */}
        <div className="flex items-center justify-between mt-3 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <RadarIcon className="text-accent w-4 h-4 mr-1" />
              <span>Pattern Recognition</span>
            </div>
            <div className="flex items-center">
              <SmileIcon className="text-accent w-4 h-4 mr-1" />
              <span>Sentiment Analysis</span>
            </div>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            <span>Updated {lastUpdateTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
