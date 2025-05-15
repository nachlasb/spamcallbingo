// This file contains utility functions for interacting with the TradingView Widget API

export interface TradingViewWidgetProps {
  symbol: string;
  interval?: string;
  theme?: string;
  locale?: string;
  autosize?: boolean;
  container_id?: string;
}

// Load the TradingView Widget script
export function loadTradingViewScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById("tradingview-widget-script")) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.id = "tradingview-widget-script";
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    
    document.head.appendChild(script);
  });
}

// Create a new TradingView Widget
export function createTradingViewWidget(props: TradingViewWidgetProps): void {
  // Ensure TradingView is loaded
  if (!window.TradingView) {
    console.error("TradingView is not loaded. Call loadTradingViewScript first.");
    return;
  }

  const {
    symbol = "NASDAQ:AAPL",
    interval = "1",
    theme = "dark",
    locale = "en",
    autosize = true,
    container_id = "tradingview-widget"
  } = props;

  // Initialize the widget
  new window.TradingView.widget({
    symbol,
    interval, // Use 1-minute candles
    width: "100%",
    height: "100%",
    timezone: "Etc/UTC",
    theme,
    style: "1",
    locale,
    toolbar_bg: "#f1f3f6",
    enable_publishing: false,
    hide_side_toolbar: false,
    allow_symbol_change: true,
    container_id,
    autosize,
    studies: ["Volume@tv-basicstudies"],
    show_popup_button: true,
    popup_width: "1000",
    popup_height: "650",
  });
}

// Define the TradingView interface for TypeScript
declare global {
  interface Window {
    TradingView: {
      widget: any;
    };
  }
}
