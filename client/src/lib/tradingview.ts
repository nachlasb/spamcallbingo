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

  // First, make sure the container exists and has dimensions
  const container = document.getElementById(container_id);
  if (container) {
    // Set explicit height to ensure chart fills the container
    container.style.height = "100%";
    container.style.minHeight = "500px";
  }

  // Initialize the widget with enhanced settings
  new window.TradingView.widget({
    symbol,
    interval, // Use 1-minute candles
    width: "100%",
    height: "100%",
    timezone: "Etc/UTC",
    theme,
    style: "1", // Candlestick chart
    locale,
    toolbar_bg: "#1a1a1a", // Dark toolbar background
    enable_publishing: false,
    hide_side_toolbar: false,
    hide_legend: false,
    allow_symbol_change: true,
    container_id,
    autosize,
    studies: ["Volume@tv-basicstudies"],
    show_popup_button: true,
    popup_width: "1000",
    popup_height: "650",
    save_image: true,
    backgroundColor: "rgba(19, 23, 34, 0)", // Transparent background
    gridColor: "rgba(100, 100, 100, 0.2)", // Subtle grid
    overrides: {
      "mainSeriesProperties.candleStyle.upColor": "#26a69a", // Green candles
      "mainSeriesProperties.candleStyle.downColor": "#ef5350", // Red candles
      "mainSeriesProperties.candleStyle.wickUpColor": "#26a69a",
      "mainSeriesProperties.candleStyle.wickDownColor": "#ef5350"
    },
    loading_screen: { backgroundColor: "#131722" }, // Dark loading screen
    debug: true // Enable debug mode to see what's happening
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
