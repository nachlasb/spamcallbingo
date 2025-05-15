// Collection of spam call phrases
export const spamPhrases = [
  "Car warranty expired",
  "Social Security number suspended",
  "Calling about your student loans",
  "Claim your free cruise",
  "We've been trying to reach you",
  "Press 1 to be removed",
  "Calling from your bank",
  "You've won a prize",
  "Government grant approved",
  "Important tax information",
  "Lower your credit card interest",
  "Suspicious activity on account",
  "Solar panel installation offer",
  "First six digits of your number",
  "Left a voicemail",
  "Electric bill discount",
  "Free medical alert system",
  "Home security system offer",
  "Long pause before speaking",
  "Speaking with an accent",
  "Asking to confirm your identity",
  "Threatening legal action",
  "Claiming to be from Amazon",
  "Offering debt consolidation",
  "Robotic/recorded voice",
  "Offering health insurance",
  "Calling about a package delivery",
  "Asking for gift cards",
  "Claiming to be the IRS",
  "Offering business opportunity",
  "Threatening to cancel service",
  "Claiming to be from Microsoft",
  "Offering mortgage refinancing",
  "Unrecognizable company name",
  "Calling from overseas"
];

// Function to shuffle an array (Fisher-Yates algorithm)
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Generate a new bingo card
export function generateBingoCard(): string[] {
  // Shuffle and select phrases
  const shuffledPhrases = shuffleArray(spamPhrases);
  
  // Take 24 phrases (we'll add FREE in the middle)
  const card = shuffledPhrases.slice(0, 24);
  
  // Insert FREE in the middle (index 12)
  card.splice(12, 0, "FREE SPACE");
  
  return card;
}

export interface WinLine {
  type: 'row' | 'column' | 'diagonal-1' | 'diagonal-2';
  index: number;
}

// Check if there's a winning pattern
export function checkForWin(markedTiles: number[]): WinLine | null {
  // Check rows
  for (let row = 0; row < 5; row++) {
    const rowIndices = [0, 1, 2, 3, 4].map(col => row * 5 + col);
    if (rowIndices.every(index => markedTiles.includes(index))) {
      return { type: 'row', index: row };
    }
  }
  
  // Check columns
  for (let col = 0; col < 5; col++) {
    const colIndices = [0, 1, 2, 3, 4].map(row => row * 5 + col);
    if (colIndices.every(index => markedTiles.includes(index))) {
      return { type: 'column', index: col };
    }
  }
  
  // Check diagonal (top-left to bottom-right)
  const diagonal1 = [0, 6, 12, 18, 24];
  if (diagonal1.every(index => markedTiles.includes(index))) {
    return { type: 'diagonal-1', index: 0 };
  }
  
  // Check diagonal (top-right to bottom-left)
  const diagonal2 = [4, 8, 12, 16, 20];
  if (diagonal2.every(index => markedTiles.includes(index))) {
    return { type: 'diagonal-2', index: 0 };
  }
  
  return null;
}
