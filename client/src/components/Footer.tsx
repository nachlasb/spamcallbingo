import { Music2Icon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card mt-12 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Music2Icon className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium">StockRock</span>
          </div>
          <div className="text-muted-foreground text-sm">
            <p>Data provided by TradingView. Not financial advice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
