import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HowToPlay() {
  return (
    <Card className="bg-white rounded-lg shadow-md p-6 mb-8">
      <CardHeader className="pb-2 pt-0 px-0">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
          <Info className="h-6 w-6 mr-2 text-orange-500" />
          How to Play
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Each time you receive a spam call, check if any of the phrases on your card match the call.</li>
          <li>If you find a match, click the tile to mark it.</li>
          <li>Get 5 marks in a row (horizontally, vertically, or diagonally) to win.</li>
          <li>Click "New Card" to generate a fresh bingo card with different phrases.</li>
          <li>Click "Reset Current Card" to clear all marks from your current card.</li>
        </ol>
      </CardContent>
    </Card>
  );
}
