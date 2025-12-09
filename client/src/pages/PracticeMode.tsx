import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Pause, Play, RotateCcw } from "lucide-react";

export default function PracticeMode() {
  const [timeLimit, setTimeLimit] = useState(300); // 5 minutes
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [isRunning, setIsRunning] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleReset = () => {
    setTimeRemaining(timeLimit);
    setIsRunning(false);
    setQuestionsAnswered(0);
    setCorrectAnswers(0);
  };

  const getTimeColor = () => {
    const percentage = (timeRemaining / timeLimit) * 100;
    if (percentage > 50) return "text-success";
    if (percentage > 25) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen gradient-secondary p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Practice Mode
          </h1>
          <p className="text-white/80">
            Improve your skills with timed exercises
          </p>
        </div>

        {/* Timer Card */}
        <Card className="p-8 bg-gradient-to-br from-primary to-primary/80 text-white mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-white/80 text-sm mb-2">Time Remaining</p>
              <p className={`text-6xl font-bold font-mono ${getTimeColor()}`}>
                {formatTime(timeRemaining)}
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                className="bg-white text-primary hover:bg-white/90 rounded-full p-4"
              >
                {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              <Button
                onClick={handleReset}
                className="bg-white/20 text-white hover:bg-white/30 rounded-full p-4"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-500"
              style={{ width: `${(timeRemaining / timeLimit) * 100}%` }}
            />
          </div>
        </Card>

        {/* Time Options */}
        <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 mb-8">
          <h3 className="text-white font-bold mb-4">Select Time Limit</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "3 min", seconds: 180 },
              { label: "5 min", seconds: 300 },
              { label: "10 min", seconds: 600 },
              { label: "15 min", seconds: 900 },
            ].map((option) => (
              <Button
                key={option.seconds}
                onClick={() => {
                  setTimeLimit(option.seconds);
                  setTimeRemaining(option.seconds);
                  setIsRunning(false);
                }}
                className={`py-3 rounded-xl font-bold transition-all ${
                  timeLimit === option.seconds
                    ? "bg-accent text-accent-foreground"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20">
            <Clock className="w-8 h-8 text-primary mb-3" />
            <p className="text-white/80 text-sm mb-2">Status</p>
            <p className="text-3xl font-bold text-white">
              {isRunning ? "▶ Active" : "⏸ Paused"}
            </p>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20">
            <p className="text-white/80 text-sm mb-2">Questions Answered</p>
            <p className="text-3xl font-bold text-accent">{questionsAnswered}</p>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20">
            <p className="text-white/80 text-sm mb-2">Correct Answers</p>
            <p className="text-3xl font-bold text-success">{correctAnswers}</p>
          </Card>
        </div>

        {/* Practice Content */}
        <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6">📝 Practice Question</h3>
          <div className="space-y-6">
            <div>
              <p className="text-white/80 mb-4">
                Select the correct answer to the following question:
              </p>
              <p className="text-xl font-semibold text-white mb-6">
                Which is the correct form of the verb in present tense?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["He go to school", "He goes to school", "He going to school", "He gone to school"].map(
                (option, idx) => (
                  <Button
                    key={idx}
                    className="p-4 bg-white/20 text-white hover:bg-white/30 rounded-xl font-semibold text-left transition-all"
                  >
                    {option}
                  </Button>
                )
              )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20">
            <Button className="w-full btn-accent btn-lg">
              Submit Answer
            </Button>
          </div>
        </Card>

        {/* Tips */}
        <Card className="mt-8 p-6 bg-accent/20 border border-accent/50">
          <p className="text-white font-semibold mb-2">💡 Pro Tips:</p>
          <ul className="text-white/80 space-y-2 text-sm">
            <li>✓ Practice regularly to improve your speed and accuracy</li>
            <li>✓ Start with shorter time limits and gradually increase</li>
            <li>✓ Review your mistakes after each session</li>
            <li>✓ Focus on one grammar topic at a time</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
