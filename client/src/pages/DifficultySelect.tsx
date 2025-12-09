import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Zap, Target, Crown, BookOpen } from "lucide-react";

type Difficulty = "beginner" | "intermediate" | "advanced";

export default function DifficultySelect() {
  const [, setLocation] = useLocation();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const difficulties = [
    {
      id: "beginner" as Difficulty,
      name: "Beginner",
      icon: BookOpen,
      color: "from-primary to-primary/80",
      description: "Perfect for starting your English journey",
      topics: ["Basic greetings", "Simple verbs", "Common nouns", "Articles"],
      estimatedTime: "5-10 min",
      questions: 10,
    },
    {
      id: "intermediate" as Difficulty,
      name: "Intermediate",
      icon: Target,
      color: "from-secondary to-secondary/80",
      description: "Challenge yourself with more complex grammar",
      topics: ["Tenses", "Prepositions", "Adjectives", "Sentence structure"],
      estimatedTime: "10-15 min",
      questions: 15,
    },
    {
      id: "advanced" as Difficulty,
      name: "Advanced",
      icon: Crown,
      color: "from-accent to-accent/80",
      description: "Master advanced English grammar concepts",
      topics: ["Complex tenses", "Idioms", "Phrasal verbs", "Advanced syntax"],
      estimatedTime: "15-20 min",
      questions: 20,
    },
  ];

  const handleStartQuiz = (difficulty: Difficulty) => {
    setLocation(`/quiz?difficulty=${difficulty}`);
  };

  return (
    <div className="min-h-screen gradient-primary p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Choose Your Level
          </h1>
          <p className="text-xl text-white/80">
            Select a difficulty level to start learning English
          </p>
        </div>

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {difficulties.map((level) => {
            const IconComponent = level.icon;
            const isSelected = selectedDifficulty === level.id;

            return (
              <Card
                key={level.id}
                onClick={() => setSelectedDifficulty(level.id)}
                className={`p-8 cursor-pointer transition-all transform hover:scale-105 ${
                  isSelected
                    ? `bg-gradient-to-br ${level.color} text-white shadow-2xl scale-105`
                    : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <IconComponent className="w-12 h-12" />
                  {isSelected && <Zap className="w-8 h-8 animate-pulse" />}
                </div>

                <h2 className="text-3xl font-bold mb-2">{level.name}</h2>
                <p className="text-sm opacity-90 mb-6">{level.description}</p>

                {/* Stats */}
                <div className="space-y-3 mb-6 pb-6 border-b border-white/20">
                  <div className="flex justify-between text-sm">
                    <span>Questions:</span>
                    <span className="font-bold">{level.questions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Est. Time:</span>
                    <span className="font-bold">{level.estimatedTime}</span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-6">
                  <p className="text-xs font-semibold opacity-75 mb-2">TOPICS COVERED</p>
                  <div className="flex flex-wrap gap-2">
                    {level.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <Button
                  onClick={() => handleStartQuiz(level.id)}
                  className={`w-full font-bold py-3 rounded-xl transition-all ${
                    isSelected
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {isSelected ? "▶ Start Quiz" : "Select"}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-4">💡 How to Choose</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
            <div>
              <p className="font-semibold text-white mb-2">🟢 Beginner</p>
              <p className="text-sm">
                Start here if you're new to English or need to refresh basic concepts
              </p>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">🟡 Intermediate</p>
              <p className="text-sm">
                Choose this if you have basic English knowledge and want to improve
              </p>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">🔴 Advanced</p>
              <p className="text-sm">
                Pick this if you're confident with English and want to master complex grammar
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
