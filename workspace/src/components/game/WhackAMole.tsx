import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Types for difficulty levels
type Difficulty = 'easy' | 'medium' | 'hard';

// Settings for each difficulty level
const difficultySettings = {
  easy: {
    moleShowTime: 1500,
    moleHideTime: 1000,
    gameDuration: 60,
  },
  medium: {
    moleShowTime: 1200,
    moleHideTime: 800,
    gameDuration: 45,
  },
  hard: {
    moleShowTime: 800,
    moleHideTime: 600,
    gameDuration: 30,
  }
};

export default function WhackAMole() {
  // Game state
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMole, setActiveMole] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [highScore, setHighScore] = useState(0);

  // Handle whack
  const handleWhack = (index: number) => {
    if (!isPlaying || index !== activeMole) return;
    
    setScore(prevScore => prevScore + 1);
    setActiveMole(null);
  };

  // Reset game state for new game
  const resetGame = () => {
    setScore(0);
    setTimeLeft(difficultySettings[difficulty].gameDuration);
    setIsPlaying(true);
    setActiveMole(null);
    setGameOver(false);
  };

  // Start new game
  const startGame = () => {
    resetGame();
  };

  // Randomly show moles
  const showRandomMole = useCallback(() => {
    if (!isPlaying) return;
    
    const randomPosition = Math.floor(Math.random() * 9);
    setActiveMole(randomPosition);

    // Hide mole after a delay based on difficulty
    setTimeout(() => {
      if (isPlaying) setActiveMole(null);
    }, difficultySettings[difficulty].moleShowTime);

  }, [isPlaying, difficulty]);

  // Game timer
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          setGameOver(true);
          // Update high score if needed
          if (score > highScore) setHighScore(score);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  // Mole appearance cycle
  useEffect(() => {
    if (!isPlaying || activeMole !== null) return;

    const moleTimer = setTimeout(() => {
      showRandomMole();
    }, difficultySettings[difficulty].moleHideTime);

    return () => clearTimeout(moleTimer);
  }, [isPlaying, activeMole, showRandomMole, difficulty]);

  // Handle difficulty change
  const handleDifficultyChange = (value: string) => {
    setDifficulty(value as Difficulty);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">Whack-a-Mole</CardTitle>
            <CardDescription>Click on the moles to score points!</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-lg px-3 py-1">
              Score: {score}
            </Badge>
            <Badge variant={timeLeft <= 10 ? "destructive" : "secondary"} className="text-lg px-3 py-1">
              Time: {timeLeft}s
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {!isPlaying && !gameOver ? (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Difficulty:</span>
              <Select value={difficulty} onValueChange={handleDifficultyChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulty</SelectLabel>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button size="lg" onClick={startGame}>Start Game</Button>
          </div>
        ) : gameOver ? (
          <div className="flex flex-col items-center gap-6 py-10">
            <h2 className="text-3xl font-bold">Game Over!</h2>
            <p className="text-xl">Your score: {score}</p>
            <p className="text-md">High score: {highScore}</p>
            <Button size="lg" onClick={startGame}>Play Again</Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {Array(9).fill(null).map((_, index) => (
              <div 
                key={index} 
                className={`relative w-full pt-[100%] bg-green-700 rounded-full overflow-hidden cursor-pointer 
                  ${activeMole === index ? 'bg-green-600' : 'bg-green-700'}`}
                onClick={() => handleWhack(index)}
              >
                {activeMole === index && (
                  <div 
                    className="absolute top-1/4 left-0 w-full h-3/4 bg-brown-500 rounded-full animate-rise"
                    style={{
                      backgroundColor: '#8B4513',
                      borderTopLeftRadius: '50%', 
                      borderTopRightRadius: '50%',
                    }}
                  >
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-2/5 bg-black rounded-full flex items-center justify-center">
                      <div className="w-3/4 h-3/4 bg-white rounded-full flex items-center justify-center">
                        <div className="w-1/2 h-1/2 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {isPlaying && (
          <Button variant="outline" onClick={() => {
            setIsPlaying(false);
            setGameOver(true);
            if (score > highScore) setHighScore(score);
          }}>
            End Game
          </Button>
        )}
        <div className="ml-auto">
          <Badge variant="outline">High Score: {highScore}</Badge>
        </div>
      </CardFooter>
    </Card>
  );
}