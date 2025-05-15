import { SentimentType } from "@/lib/types";
import { sentimentToText, sentimentToColor } from "@/lib/sentiment";

interface SentimentIndicatorProps {
  sentiment: SentimentType | undefined;
}

export default function SentimentIndicator({ sentiment }: SentimentIndicatorProps) {
  if (!sentiment) {
    return (
      <div className="flex items-center bg-card rounded-full px-3 py-1">
        <div className="w-3 h-3 rounded-full bg-accent animate-pulse mr-2"></div>
        <span className="text-sm font-medium">Neutral - Waiting for analysis</span>
      </div>
    );
  }

  return (
    <div className="flex items-center bg-card rounded-full px-3 py-1">
      <div className={`w-3 h-3 rounded-full ${sentimentToColor(sentiment)} mr-2`}></div>
      <span className="text-sm font-medium">{sentimentToText(sentiment)}</span>
    </div>
  );
}
