import { SentimentAnalysis, Song, SentimentType } from "../../client/src/lib/types";
import { getSentimentReason } from "../../client/src/lib/sentiment";

// YouTube video map - contains actual YouTube video IDs for each song
const youtubeVideoMap: Record<string, string> = {
  // Bullish songs
  "Higher|The Score": "ZwJdYBGOjHE",
  "The Only Way Is Up|Yazz": "vjD3EVC1-zU",
  "Good Feeling|Flo Rida": "3OnnDqH6Wj8",
  "On Top of the World|Imagine Dragons": "w5tWYmIOWGk",
  "Unstoppable|Sia": "cOQDsmEqVt8",
  "Can't Hold Us|Macklemore & Ryan Lewis": "8SGycAYsXOw",
  "Uptown Funk|Mark Ronson ft. Bruno Mars": "OPf0YbXqDm0",
  "All Star|Smash Mouth": "L_jWHffIx5E",
  "Eye of the Tiger|Survivor": "btPJPFnesV4",
  "Hall of Fame|The Script ft. will.i.am": "mk48xRzuNvA",
  "Roar|Katy Perry": "CevxZvSJLk8",
  "Rise Up|Andra Day": "kNKu1uNBVkU",
  
  // Slightly bullish songs
  "Walking on Sunshine|Katrina & The Waves": "iPUmE-tne5U",
  "Good Day|Twenty One Pilots": "Vd6AW8fT2Wc",
  "Better Days|OneRepublic": "gpFtPf-Du3o",
  "Beautiful Day|U2": "hjpF8ukSrvk",
  "Happy|Pharrell Williams": "ZbZSe6N_BXs",
  "I Gotta Feeling|Black Eyed Peas": "uSD4vsh1zDA",
  "Here Comes the Sun|The Beatles": "GKdl-GCsNJ0",
  "Lovely Day|Bill Withers": "bEeaS6fuUoA",
  "Three Little Birds|Bob Marley": "LanCLS_hIo4",
  "Good Vibrations|The Beach Boys": "Eab_beh07HU",
  "Best Day of My Life|American Authors": "0fTUj9mfnUk",
  
  // Neutral songs
  "Everyday|Logic & Marshmello": "fUjxaZ6cQgU",
  "Middle|DJ Snake": "mOKqNxN4jWM",
  "Stay|The Kid LAROI & Justin Bieber": "yWHrYNP6j4k",
  "Paradise|Coldplay": "1G4isv_Fylg",
  "Levitating|Dua Lipa": "TUVcZfQe-Kw",
  "Dreams|Fleetwood Mac": "mrZRURcb1cM",
  "Counting Stars|OneRepublic": "hT_nvWreIhg",
  "Viva La Vida|Coldplay": "dvgZkm1xWPE",
  "Californication|Red Hot Chili Peppers": "YlUKcNNmywk",
  "Watermelon Sugar|Harry Styles": "E07s5ZYygMg",
  "Circles|Post Malone": "wXhTHyIgQ_U",
  "Vienna|Billy Joel": "wccRif2DaGs",
  
  // Slightly bearish songs
  "Broken|lovelytheband": "qr1-WpWOUk8",
  "Comfortably Numb|Pink Floyd": "IXdNnw99-Ic",
  "Waiting for the End|Linkin Park": "5qF_qbaWt3Q",
  "Gravity|John Mayer": "7VBex8zbDRs",
  "Breathe Me|Sia": "wmhLV5UHq4I",
  "Fix You|Coldplay": "5anLPw0Efmo",
  "Someone Like You|Adele": "hLQl3WQQoQ0",
  "The Scientist|Coldplay": "RB-RcX5DS5A",
  "Skinny Love|Bon Iver": "ZQeq_T_2VE8",
  "Landslide|Fleetwood Mac": "r00ikilDxW4",
  "Everybody Hurts|R.E.M.": "ijZRCIrTgQc",
  "Back to Black|Amy Winehouse": "TJAfLE39ZZ8",
  
  // Bearish songs
  "Boulevard of Broken Dreams|Green Day": "Soa3gO7tL-c",
  "Falling Down|Lil Peep & XXXTENTACION": "OGzVYyV_Jsg",
  "Mad World|Gary Jules": "4N3N1MlvVc4",
  "When the Party's Over|Billie Eilish": "b6WNdcZpDhQ",
  "Hurt|Johnny Cash": "8AHCfZTRGiI",
  "Creep|Radiohead": "XFkzRNyygfk",
  "Nothing Compares 2 U|Sinéad O'Connor": "0-EF60neguk",
  "Hallelujah|Jeff Buckley": "y8AWFf7EAc4",
  "Angels|XX": "2asZbzPPE-8",
  "How to Disappear Completely|Radiohead": "nZq_jeYsbTs",
  "Everybody's Changing|Keane": "Zx4Hjq6KwO0",
  "Breathe Me (Bearish)|Sia": "SFGvmrJ5rjM"
};

// Song database organized by sentiment
const songDatabase: Record<SentimentType, Song[]> = {
  "bullish": [
    { id: 1, title: "Higher", artist: "The Score", duration: "3:21", mood: "bullish" },
    { id: 2, title: "The Only Way Is Up", artist: "Yazz", duration: "3:58", mood: "bullish" },
    { id: 3, title: "Good Feeling", artist: "Flo Rida", duration: "4:08", mood: "bullish" },
    { id: 4, title: "On Top of the World", artist: "Imagine Dragons", duration: "3:12", mood: "bullish" },
    { id: 5, title: "Unstoppable", artist: "Sia", duration: "3:41", mood: "bullish" },
    { id: 6, title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", duration: "4:18", mood: "bullish" },
    { id: 7, title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", duration: "4:30", mood: "bullish" },
    { id: 8, title: "All Star", artist: "Smash Mouth", duration: "3:15", mood: "bullish" },
    { id: 9, title: "Eye of the Tiger", artist: "Survivor", duration: "4:05", mood: "bullish" },
    { id: 10, title: "Hall of Fame", artist: "The Script ft. will.i.am", duration: "3:22", mood: "bullish" },
    { id: 11, title: "Roar", artist: "Katy Perry", duration: "3:43", mood: "bullish" },
    { id: 12, title: "Rise Up", artist: "Andra Day", duration: "4:13", mood: "bullish" }
  ],
  "slightly_bullish": [
    { id: 13, title: "Walking on Sunshine", artist: "Katrina & The Waves", duration: "3:58", mood: "slightly_bullish" },
    { id: 14, title: "Good Day", artist: "Twenty One Pilots", duration: "3:25", mood: "slightly_bullish" },
    { id: 15, title: "Better Days", artist: "OneRepublic", duration: "2:38", mood: "slightly_bullish" },
    { id: 16, title: "Rise Up", artist: "Andra Day", duration: "4:13", mood: "slightly_bullish" },
    { id: 17, title: "Beautiful Day", artist: "U2", duration: "4:06", mood: "slightly_bullish" },
    { id: 18, title: "Happy", artist: "Pharrell Williams", duration: "3:53", mood: "slightly_bullish" },
    { id: 19, title: "I Gotta Feeling", artist: "Black Eyed Peas", duration: "4:49", mood: "slightly_bullish" },
    { id: 20, title: "Here Comes the Sun", artist: "The Beatles", duration: "3:05", mood: "slightly_bullish" },
    { id: 21, title: "Lovely Day", artist: "Bill Withers", duration: "4:14", mood: "slightly_bullish" },
    { id: 22, title: "Three Little Birds", artist: "Bob Marley", duration: "3:00", mood: "slightly_bullish" },
    { id: 23, title: "Good Vibrations", artist: "The Beach Boys", duration: "3:39", mood: "slightly_bullish" },
    { id: 24, title: "Best Day of My Life", artist: "American Authors", duration: "3:14", mood: "slightly_bullish" }
  ],
  "neutral": [
    { id: 25, title: "Everyday", artist: "Logic & Marshmello", duration: "3:33", mood: "neutral" },
    { id: 26, title: "Middle", artist: "DJ Snake", duration: "3:40", mood: "neutral" },
    { id: 27, title: "Stay", artist: "The Kid LAROI & Justin Bieber", duration: "2:21", mood: "neutral" },
    { id: 28, title: "Paradise", artist: "Coldplay", duration: "4:38", mood: "neutral" },
    { id: 29, title: "Levitating", artist: "Dua Lipa", duration: "3:23", mood: "neutral" },
    { id: 30, title: "Dreams", artist: "Fleetwood Mac", duration: "4:14", mood: "neutral" },
    { id: 31, title: "Counting Stars", artist: "OneRepublic", duration: "4:17", mood: "neutral" },
    { id: 32, title: "Viva La Vida", artist: "Coldplay", duration: "4:01", mood: "neutral" },
    { id: 33, title: "Californication", artist: "Red Hot Chili Peppers", duration: "5:21", mood: "neutral" },
    { id: 34, title: "Watermelon Sugar", artist: "Harry Styles", duration: "2:54", mood: "neutral" },
    { id: 35, title: "Circles", artist: "Post Malone", duration: "3:35", mood: "neutral" },
    { id: 36, title: "Vienna", artist: "Billy Joel", duration: "3:34", mood: "neutral" }
  ],
  "slightly_bearish": [
    { id: 37, title: "Broken", artist: "lovelytheband", duration: "3:15", mood: "slightly_bearish" },
    { id: 38, title: "Comfortably Numb", artist: "Pink Floyd", duration: "6:23", mood: "slightly_bearish" },
    { id: 39, title: "Waiting for the End", artist: "Linkin Park", duration: "3:51", mood: "slightly_bearish" },
    { id: 40, title: "Gravity", artist: "John Mayer", duration: "4:05", mood: "slightly_bearish" },
    { id: 41, title: "Breathe Me", artist: "Sia", duration: "4:34", mood: "slightly_bearish" },
    { id: 42, title: "Fix You", artist: "Coldplay", duration: "4:55", mood: "slightly_bearish" },
    { id: 43, title: "Someone Like You", artist: "Adele", duration: "4:45", mood: "slightly_bearish" },
    { id: 44, title: "The Scientist", artist: "Coldplay", duration: "5:09", mood: "slightly_bearish" },
    { id: 45, title: "Skinny Love", artist: "Bon Iver", duration: "3:58", mood: "slightly_bearish" },
    { id: 46, title: "Landslide", artist: "Fleetwood Mac", duration: "3:19", mood: "slightly_bearish" },
    { id: 47, title: "Everybody Hurts", artist: "R.E.M.", duration: "5:17", mood: "slightly_bearish" },
    { id: 48, title: "Back to Black", artist: "Amy Winehouse", duration: "4:01", mood: "slightly_bearish" }
  ],
  "bearish": [
    { id: 49, title: "Boulevard of Broken Dreams", artist: "Green Day", duration: "4:22", mood: "bearish" },
    { id: 50, title: "Falling Down", artist: "Lil Peep & XXXTENTACION", duration: "2:38", mood: "bearish" },
    { id: 51, title: "Mad World", artist: "Gary Jules", duration: "3:09", mood: "bearish" },
    { id: 52, title: "When the Party's Over", artist: "Billie Eilish", duration: "3:16", mood: "bearish" },
    { id: 53, title: "Hurt", artist: "Johnny Cash", duration: "3:38", mood: "bearish" },
    { id: 54, title: "Creep", artist: "Radiohead", duration: "3:56", mood: "bearish" },
    { id: 55, title: "Nothing Compares 2 U", artist: "Sinéad O'Connor", duration: "5:07", mood: "bearish" },
    { id: 56, title: "Hallelujah", artist: "Jeff Buckley", duration: "6:53", mood: "bearish" },
    { id: 57, title: "Angels", artist: "XX", duration: "2:51", mood: "bearish" },
    { id: 58, title: "How to Disappear Completely", artist: "Radiohead", duration: "5:56", mood: "bearish" },
    { id: 59, title: "Everybody's Changing", artist: "Keane", duration: "3:35", mood: "bearish" },
    { id: 60, title: "Breathe Me", artist: "Sia", duration: "4:34", mood: "bearish" }
  ]
};

/**
 * Get YouTube video ID for a song
 * @param song The song to find a YouTube video ID for
 * @returns String containing YouTube video ID
 */
export function getYouTubeVideoId(song: Song): string {
  const songKey = `${song.title}|${song.artist}`;
  
  // Try to find the exact song in our YouTube map
  if (youtubeVideoMap[songKey]) {
    return youtubeVideoMap[songKey];
  }
  
  // Fallback to mood-based video selection if the exact song isn't mapped
  // This ensures we always return a real YouTube video
  const moodSongs = Object.keys(youtubeVideoMap).filter(key => key.includes(song.mood));
  if (moodSongs.length > 0) {
    // Get a consistent video based on song title hash
    const hashCode = song.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hashCode % moodSongs.length;
    return youtubeVideoMap[moodSongs[index]];
  }
  
  // Return a default video if nothing else works
  return "dQw4w9WgXcQ"; // Never Gonna Give You Up as absolute fallback
}

/**
 * Generate a playlist based on stock sentiment analysis
 * @param sentiment The sentiment analysis result
 * @returns Array of songs that match the sentiment
 */
export async function generatePlaylist(sentiment: SentimentAnalysis): Promise<Song[]> {
  // Get the appropriate mood songs
  const moodSongs = songDatabase[sentiment.sentiment] || songDatabase.neutral;
  
  // Fisher-Yates shuffle algorithm to randomize song order
  const shuffledSongs = [...moodSongs];
  for (let i = shuffledSongs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledSongs[i], shuffledSongs[j]] = [shuffledSongs[j], shuffledSongs[i]];
  }
  
  // Take the first 10 songs for the playlist
  const playlist = shuffledSongs.slice(0, 10);
  
  // Add sentiment reason and YouTube video ID to each song
  playlist.forEach(song => {
    song.sentimentReason = getSentimentReason(sentiment.sentiment, sentiment.patterns);
    const videoId = getYouTubeVideoId(song);
    song.youtubeId = videoId;
  });
  
  return playlist;
}
