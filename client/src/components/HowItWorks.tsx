import { TrendingUpIcon, BarChart2Icon, Music2Icon } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="max-w-3xl mx-auto bg-card rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-center">How StockRock Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-muted/30 rounded-lg p-5 border border-muted flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <BarChart2Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-medium mb-3 text-lg">Market Mood</h3>
          <p className="text-muted-foreground">
            We watch stock charts in real-time to feel the market's pulse. Price movements, volume, 
            and patterns tell us if the market is feeling up, down, or somewhere in-between.
          </p>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-5 border border-muted flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Music2Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-medium mb-3 text-lg">Matching Music</h3>
          <p className="text-muted-foreground">
            Your music matches the market mood - upbeat songs for rising markets, thoughtful tunes when 
            it's falling, and everything in between. Each song perfectly captures the market feeling.
          </p>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-5 border border-muted flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <TrendingUpIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-medium mb-3 text-lg">Real-Time Updates</h3>
          <p className="text-muted-foreground">
            As markets shift, so does your playlist. We update with each price change, keeping 
            your music in sync with the market. The next song stays a surprise until the current one 
            ends.
          </p>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-muted-foreground bg-card p-3 rounded-lg">
        <p>Enter any stock symbol to start your personalized market soundtrack</p>
      </div>
    </div>
  );
}
