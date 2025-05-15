import { SentimentType, SentimentAnalysis, Song } from "./types";

// Function to map sentiment to color
export function sentimentToColor(sentiment: SentimentType): string {
  switch (sentiment) {
    case "bullish":
      return "bg-green-500";
    case "slightly_bullish":
      return "bg-blue-400";
    case "neutral":
      return "bg-neutral-400";
    case "slightly_bearish":
      return "bg-orange-500";
    case "bearish":
      return "bg-red-500";
    default:
      return "bg-neutral-400";
  }
}

// Function to map sentiment to human-readable text
export function sentimentToText(sentiment: SentimentType): string {
  switch (sentiment) {
    case "bullish":
      return "Bullish";
    case "slightly_bullish":
      return "Slightly Bullish";
    case "neutral":
      return "Neutral";
    case "slightly_bearish":
      return "Slightly Bearish";
    case "bearish":
      return "Bearish";
    default:
      return "Unknown";
  }
}

// Function to get a reason why a song was chosen for a stock sentiment
export function getSentimentReason(sentiment: SentimentType, patterns: string[]): string {
  const patternString = patterns.length > 0 ? `${patterns.join(", ")} pattern detected` : "Market pattern detected";
  
  switch (sentiment) {
    case "bullish":
      return `Strong upward trend with increasing volume - matched with energetic, optimistic track. ${patternString}.`;
    case "slightly_bullish":
      return `Forming an ascending pattern with positive momentum - paired with uplifting melody. ${patternString}.`;
    case "neutral":
      return `Consolidation pattern with sideways movement - matched with balanced, steady track. ${patternString}.`;
    case "slightly_bearish":
      return `Minor downtrend with decreasing buying pressure - paired with contemplative melody. ${patternString}.`;
    case "bearish":
      return `Strong selling pressure with bearish pattern formation - matched with somber, reflective track. ${patternString}.`;
    default:
      return "Songs will be matched to stock sentiment and performance patterns in real-time.";
  }
}

// Function to format time (e.g., "2:45" from 165 seconds)
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Function to parse duration string to seconds
export function parseDuration(duration: string): number {
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
}

// Get the next song to be played based on current time and song duration
export function shouldShowNextSong(currentTime: number, duration: number): boolean {
  const remainingTime = duration - currentTime;
  return remainingTime <= 30; // Show next song when there's 30 seconds or less remaining
}
