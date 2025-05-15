export default function HowItWorks() {
  return (
    <div className="max-w-3xl mx-auto bg-card rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">How It Works</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2 text-accent">Market Mood Analysis</h3>
          <p className="text-muted-foreground text-sm">
            Our system watches stock charts in real-time and identifies how the market is feeling. 
            We look at the price movements, trading volume, and pattern shapes to determine if the 
            market mood is positive, negative, or somewhere in between.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2 text-accent">Music That Matches the Market</h3>
          <p className="text-muted-foreground text-sm">
            Based on the market's mood, we choose music that fits the feeling:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground text-sm">
            <li>Rising markets play upbeat, energetic songs</li>
            <li>Falling markets play more thoughtful, mellow tracks</li>
            <li>Choppy markets match with dynamic, varied music</li>
            <li>Steady markets pair with balanced, consistent tunes</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-2 text-accent">Always Up-to-Date</h3>
          <p className="text-muted-foreground text-sm">
            As the market changes, so does your playlist. The system updates every minute to match 
            the current market conditions. The next song stays hidden until the current one is 
            almost finished, making sure your music always matches what's happening right now.
          </p>
        </div>
      </div>
    </div>
  );
}
