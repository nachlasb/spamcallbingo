import { useEffect, useState, useRef } from "react";

interface AudioVisualizerProps {
  active: boolean;
  barCount?: number;
}

export default function AudioVisualizer({ active, barCount = 20 }: AudioVisualizerProps) {
  const [heights, setHeights] = useState<number[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize with random heights
    setHeights(Array.from({ length: barCount }, () => Math.floor(Math.random() * 25) + 5));
    
    const updateVisualizer = () => {
      if (!active) {
        setHeights((prev) => prev.map(() => 5));
        return;
      }
      
      setHeights((prev) => 
        prev.map(() => Math.floor(Math.random() * 30) + 5)
      );
      
      animationRef.current = requestAnimationFrame(updateVisualizer);
    };
    
    if (active) {
      animationRef.current = requestAnimationFrame(updateVisualizer);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active, barCount]);

  return (
    <div className="audio-visualizer">
      {heights.map((height, index) => (
        <div 
          key={index} 
          className="audio-bar"
          style={{ height: `${height}px` }}
        ></div>
      ))}
    </div>
  );
}
