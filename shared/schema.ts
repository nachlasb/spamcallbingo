import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Stocks table to store stock information
export const stocks = pgTable("stocks", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull().unique(),
  name: text("name"),
  lastAnalyzed: timestamp("last_analyzed"),
});

export const insertStockSchema = createInsertSchema(stocks).pick({
  symbol: true,
  name: true,
});

export type InsertStock = z.infer<typeof insertStockSchema>;
export type Stock = typeof stocks.$inferSelect;

// Sentiment table to store sentiment analysis results
export const sentiments = pgTable("sentiments", {
  id: serial("id").primaryKey(),
  stockId: integer("stock_id").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  sentiment: text("sentiment").notNull(), // bullish, bearish, neutral, etc.
  confidence: integer("confidence"), // 0-100
  patterns: jsonb("patterns"), // detected chart patterns
});

export const insertSentimentSchema = createInsertSchema(sentiments).pick({
  stockId: true,
  sentiment: true,
  confidence: true,
  patterns: true,
});

export type InsertSentiment = z.infer<typeof insertSentimentSchema>;
export type Sentiment = typeof sentiments.$inferSelect;

// Songs table to store song information
export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  duration: text("duration").notNull(),
  mood: text("mood").notNull(), // maps to sentiment
  albumArt: text("album_art"), // URL to album art
});

export const insertSongSchema = createInsertSchema(songs).pick({
  title: true,
  artist: true,
  duration: true,
  mood: true,
  albumArt: true,
});

export type InsertSong = z.infer<typeof insertSongSchema>;
export type Song = typeof songs.$inferSelect;

// Playlist table to store playlist information
export const playlists = pgTable("playlists", {
  id: serial("id").primaryKey(),
  stockId: integer("stock_id").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  songIds: jsonb("song_ids").notNull(), // array of song IDs
});

export const insertPlaylistSchema = createInsertSchema(playlists).pick({
  stockId: true,
  songIds: true,
});

export type InsertPlaylist = z.infer<typeof insertPlaylistSchema>;
export type Playlist = typeof playlists.$inferSelect;
