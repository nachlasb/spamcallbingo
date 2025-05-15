import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeSentiment } from "./services/sentiment";
import { generatePlaylist } from "./services/music";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Analyze stock and generate playlist
  app.post("/api/analyze-stock", async (req, res) => {
    try {
      // Validate request body
      const schema = z.object({
        symbol: z.string().min(1).max(10),
      });
      
      const validatedData = schema.parse(req.body);
      const { symbol } = validatedData;
      
      // Analyze sentiment
      const sentiment = await analyzeSentiment(symbol);
      
      // Generate playlist based on sentiment
      const playlist = await generatePlaylist(sentiment);
      
      // Return sentiment and playlist
      res.json({
        sentiment,
        playlist,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
