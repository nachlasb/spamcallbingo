<<<<<<< HEAD
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StockInput from "@/components/StockInput";
import StockChart from "@/components/StockChart";
import MusicPlayer from "@/components/MusicPlayer";
import HowItWorks from "@/components/HowItWorks";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { StockAnalysisRequest, StockAnalysisResponse, SentimentAnalysis, Song } from "@/lib/types";
import { SentimentType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [stockSymbol, setStockSymbol] = useState<string>("");
  const [analyzed, setAnalyzed] = useState<boolean>(false);
  const [sentiment, setSentiment] = useState<SentimentAnalysis | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [recentSongs, setRecentSongs] = useState<Song[]>([]);
  const [nextSong, setNextSong] = useState<Song | null>(null);
  const [showNextSong, setShowNextSong] = useState<boolean>(false);
  const [currentPlayTime, setCurrentPlayTime] = useState<number>(0);
  const { toast } = useToast();

  // Stock analysis mutation
  const stockAnalysisMutation = useMutation({
    mutationFn: async (data: StockAnalysisRequest) => {
      const res = await apiRequest("POST", "/api/analyze-stock", data);
      return res.json() as Promise<StockAnalysisResponse>;
    },
    onSuccess: (data) => {
      setSentiment(data.sentiment);
      
      if (data.playlist.length > 0) {
        setCurrentSong(data.playlist[0]);
        
        if (data.playlist.length > 1) {
          setNextSong(data.playlist[1]);
        }
        
        if (data.playlist.length > 1) {
          setRecentSongs(data.playlist.slice(1, Math.min(11, data.playlist.length)));
        } else {
          setRecentSongs([]);
        }
      }
      
      setAnalyzed(true);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to analyze stock: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Function to handle stock analysis
  const handleAnalyzeStock = (symbol: string) => {
    if (!symbol) {
      toast({
        title: "Input Required",
        description: "Please enter a stock ticker symbol",
        variant: "destructive",
      });
      return;
    }
    
    setStockSymbol(symbol);
    stockAnalysisMutation.mutate({ symbol });
  };

  // Simulate playback progress (in a real app, this would be connected to an audio player)
  useEffect(() => {
    if (!currentSong) return;
    
    const timer = setInterval(() => {
      // Simulate song progress
      setCurrentPlayTime((prevTime) => {
        const [minutes, seconds] = currentSong.duration.split(':').map(Number);
        const totalDuration = minutes * 60 + seconds;
        
        if (prevTime >= totalDuration) {
          // Song ended, go to next song
          if (nextSong) {
            setCurrentSong(nextSong);
            setRecentSongs((prev) => {
              const newRecent = [currentSong, ...prev].slice(0, 10);
              return newRecent;
            });
            
            // Get a new next song
            if (recentSongs.length > 1) {
              setNextSong(recentSongs[1]);
            } else {
              setNextSong(null);
            }
            
            setShowNextSong(false);
            return 0;
          }
          return prevTime;
        }
        
        // Show next song 30 seconds before the end
        if (totalDuration - prevTime <= 30 && !showNextSong && nextSong) {
          setShowNextSong(true);
        }
        
        return prevTime + 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentSong, nextSong, recentSongs]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        {/* Stock Input Section */}
        <section className="mb-6">
          <StockInput 
            onAnalyze={handleAnalyzeStock} 
            isLoading={stockAnalysisMutation.isPending}
            sentiment={sentiment?.sentiment}
          />
        </section>
        
        {/* Stock Chart Section */}
        <section className="mb-6">
          <StockChart 
            symbol={stockSymbol} 
            analyzed={analyzed}
            sentiment={sentiment}
          />
        </section>
        
        {/* Music Player Section */}
        <section className="mb-6">
          <MusicPlayer 
            currentSong={currentSong}
            recentSongs={recentSongs}
            nextSong={nextSong}
            showNextSong={showNextSong}
            currentTime={currentPlayTime}
            sentiment={sentiment}
          />
        </section>
        
        {/* How It Works Section */}
        <section className="mb-6">
          <HowItWorks />
        </section>
      </main>
      
      <Footer />
=======
import SpamCallBingo from "@/components/SpamCallBingo";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      <SpamCallBingo />
>>>>>>> 103fe362265f463e56b7b450fd857647f03f6ea7
    </div>
  );
}
