export default function Footer() {
  return (
    <footer className="bg-card mt-12 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 15l3-3 2 2 4-4 2 2v3H7z" />
            </svg>
            <span className="font-medium">StockBeats</span>
          </div>
          <div className="text-muted-foreground text-sm">
            <p>Data provided by TradingView. Not financial advice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
