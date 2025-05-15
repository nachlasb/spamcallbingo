export type SentimentType = 
  | "bullish" 
  | "slightly_bullish" 
  | "neutral" 
  | "slightly_bearish" 
  | "bearish";

export interface SentimentAnalysis {
  sentiment: SentimentType;
  confidence: number;
  patterns: string[];
  stockSymbol: string;
  timestamp: string;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  mood: SentimentType;
  albumArt?: string;
  sentimentReason?: string;
  youtubeId?: string;
}

export interface Playlist {
  id: number;
  stockId: number;
  timestamp: string;
  songs: Song[];
}

export interface StockAnalysisRequest {
  symbol: string;
}

export interface StockAnalysisResponse {
  sentiment: SentimentAnalysis;
  playlist: Song[];
}
