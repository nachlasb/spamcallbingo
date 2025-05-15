import { useEffect, useRef, useState } from "react";
import { Clock, RadarIcon, SmileIcon, TrendingUpIcon, TrendingDownIcon, ArrowRightIcon } from "lucide-react";
import { loadTradingViewScript, createTradingViewWidget } from "@/lib/tradingview";
import { SentimentAnalysis } from "@/lib/types";
import { sentimentToText, sentimentToColor } from "@/lib/sentiment";

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

  // Generate price targets based on sentiment
  const getPriceTargets = () => {
    if (!sentiment || !symbol) return { support: "N/A", resistance: "N/A", target: "N/A" };
    
    // This is a mock function that would be replaced with real analysis
    // In a real application, these would be calculated based on actual chart analysis
    const basePrice = symbol.length * 10 + 50; // Simple mock formula
    const sentimentMultiplier = {
      "bullish": 1.15,
      "slightly_bullish": 1.05,
      "neutral": 1.0,
      "slightly_bearish": 0.95,
      "bearish": 0.85
    }[sentiment.sentiment] || 1.0;
    
    const support = (basePrice * 0.95).toFixed(2);
    const resistance = (basePrice * 1.05).toFixed(2);
    const target = (basePrice * sentimentMultiplier).toFixed(2);
    
    return { support, resistance, target };
  };

  const { support, resistance, target } = getPriceTargets();

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
        <div className="w-full rounded-lg overflow-hidden bg-muted relative" style={{ height: "65vh", minHeight: "500px" }}>
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
      
      {/* Sentiment Analysis Box */}
      {analyzed && sentiment && (
        <div className="p-4 pt-0">
          <div className="bg-card rounded-lg p-4 mt-2 fade-in">
            <h3 className="font-medium text-lg mb-3">Sentiment Analysis & Financial Insights</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sentiment and Patterns */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-medium">Current Sentiment:</h4>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    sentiment.sentiment === "bullish" || sentiment.sentiment === "slightly_bullish" 
                      ? "bg-green-500/20 text-green-400"
                      : sentiment.sentiment === "neutral"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-red-500/20 text-red-400"
                  }`}>
                    {sentimentToText(sentiment.sentiment)}
                  </div>
                  <div className="ml-2 text-sm text-muted-foreground">
                    ({sentiment.confidence}% confidence)
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Detected Patterns:</h4>
                  <div className="flex flex-wrap gap-2">
                    {sentiment.patterns.map((pattern, index) => (
                      <span key={index} className="bg-muted px-2 py-1 rounded text-sm">
                        {pattern}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Analysis Summary:</h4>
                  <p className="text-muted-foreground text-sm">
                    {sentiment.sentiment === "bullish" 
                      ? `Strong upward trend detected for ${symbol} with increasing volume. Chart shows bullish momentum with potential for continued gains.`
                      : sentiment.sentiment === "slightly_bullish"
                        ? `${symbol} is forming an ascending pattern with positive, but cautious momentum. Watch for a potential breakout above resistance.`
                        : sentiment.sentiment === "neutral"
                          ? `${symbol} is in a consolidation phase with sideways movement. The market is undecided about future direction.`
                          : sentiment.sentiment === "slightly_bearish"
                            ? `Minor downtrend detected for ${symbol} with decreasing buying pressure. Exercise caution in the short term.`
                            : `Strong selling pressure detected for ${symbol} with bearish pattern formation. Technical indicators suggest continued downward movement.`
                    }
                  </p>
                </div>
              </div>
              
              {/* Price Targets and Metrics */}
              <div>
                <h4 className="font-medium mb-3">Key Price Levels</h4>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Support</div>
                    <div className="flex items-center">
                      <TrendingDownIcon className="w-4 h-4 text-red-400 mr-1" />
                      <span className="font-semibold">${support}</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Resistance</div>
                    <div className="flex items-center">
                      <TrendingUpIcon className="w-4 h-4 text-green-400 mr-1" />
                      <span className="font-semibold">${resistance}</span>
                    </div>
                  </div>
                  
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Price Target</div>
                    <div className="flex items-center">
                      <ArrowRightIcon className="w-4 h-4 text-primary mr-1" />
                      <span className="font-semibold">${target}</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-medium mb-3">Market Insights</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Volume Rating</div>
                    <div className="font-semibold">
                      {sentiment.sentiment === "bullish" ? "High" : 
                       sentiment.sentiment === "bearish" ? "High" : "Moderate"}
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Volatility</div>
                    <div className="font-semibold">
                      {sentiment.sentiment === "bullish" || sentiment.sentiment === "bearish" 
                        ? "High" : sentiment.sentiment === "neutral" ? "Low" : "Moderate"}
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Trend Strength</div>
                    <div className="font-semibold">
                      {sentiment.confidence > 75 ? "Strong" : 
                       sentiment.confidence > 50 ? "Moderate" : "Weak"}
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Suggested Action</div>
                    <div className="font-semibold">
                      {sentiment.sentiment === "bullish" ? "Buy" : 
                       sentiment.sentiment === "slightly_bullish" ? "Buy (Small)" : 
                       sentiment.sentiment === "neutral" ? "Hold" : 
                       sentiment.sentiment === "slightly_bearish" ? "Reduce" : "Sell"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
