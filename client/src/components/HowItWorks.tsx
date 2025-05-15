export default function HowItWorks() {
  return (
    <div className="max-w-3xl mx-auto bg-card rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">How It Works</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2 text-accent">Stock Sentiment Analysis</h3>
          <p className="text-muted-foreground text-sm">
            Our AI system analyzes real-time TradingView charts by capturing and processing the visual 
            patterns. We detect candlestick formations, trend lines, volume patterns, and technical 
            indicators to determine the current market sentiment.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2 text-accent">Music Matching Algorithm</h3>
          <p className="text-muted-foreground text-sm">
            Based on the detected sentiment, our system maps financial patterns to musical attributes:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground text-sm">
            <li>Bullish trends trigger upbeat, energetic songs with higher tempos</li>
            <li>Bearish markets match with mellower, minor-key tracks</li>
            <li>Volatility corresponds to more complex rhythmic structures</li>
            <li>Volume spikes influence the intensity and dynamics of selected music</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-2 text-accent">Real-time Updates</h3>
          <p className="text-muted-foreground text-sm">
            As market conditions change, the system continuously reassesses sentiment every minute, 
            queuing up new songs that reflect the evolving market conditions. The next song remains 
            hidden until 30 seconds before playback to ensure it accurately reflects the most current 
            market sentiment.
          </p>
        </div>
      </div>
    </div>
  );
}
