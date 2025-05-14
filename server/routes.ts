import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // For the Spam Call Bingo game, we don't need any API routes
  // as all game logic is handled in the frontend

  // This route can be used to serve the application status
  app.get('/api/status', (_req, res) => {
    res.json({ status: 'ok', message: 'Spam Call Bingo server is running' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
