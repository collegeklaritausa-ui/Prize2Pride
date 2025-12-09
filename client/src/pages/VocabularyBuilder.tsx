import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Volume2, RotateCw, Check } from "lucide-react";

interface Word {
  id: number;
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  arabicTranslation: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

const VOCABULARY_WORDS: Word[] = [
  {
    id: 1,
    word: "Serendipity",
    pronunciation: "ser-uhn-dip-i-tee",
    partOfSpeech: "noun",
    definition: "The occurrence of events by chance in a happy or beneficial way",
    example: "Finding that book was pure serendipity.",
    arabicTranslation: "المصادفة السعيدة",
    category: "Advanced",
    difficulty: "hard",
  },
  {
    id: 2,
    word: "Eloquent",
    pronunciation: "el-uh-kwuhnt",
    partOfSpeech: "adjective",
    definition: "Fluent or persuasive in speaking or writing",
    example: "She gave an eloquent speech at the conference.",
    arabicTranslation: "فصيح، بليغ",
    category: "Advanced",
    difficulty: "medium",
  },
  {
    id: 3,
    word: "Ephemeral",
    pronunciation: "uh-fem-er-uhl",
    partOfSpeech: "adjective",
    definition: "Lasting for a very short time",
    example: "The beauty of cherry blossoms is ephemeral.",
    arabicTranslation: "قصير الأجل، زائل",
    category: "Advanced",
    difficulty: "hard",
  },
  {
    id: 4,
    word: "Benevolent",
    pronunciation: "buh-nev-uh-luhnt",
    partOfSpeech: "adjective",
    definition: "Kind and generous",
    example: "The benevolent donor funded the entire project.",
    arabicTranslation: "خيّر، محسن",
    category: "Intermediate",
    difficulty: "medium",
  },
  {
    id: 5,
    word: "Pragmatic",
    pronunciation: "prag-mat-ik",
    partOfSpeech: "adjective",
    definition: "Dealing with things in a practical, realistic way",
    example: "We need a pragmatic approach to solve this problem.",
    arabicTranslation: "عملي، واقعي",
    category: "Intermediate",
    difficulty: "medium",
  },
];

export default function VocabularyBuilder() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const currentWord = VOCABULARY_WORDS[currentWordIndex];
  const isLearned = learned.includes(currentWord.id);

  const categories = ["All", ...Array.from(new Set(VOCABULARY_WORDS.map((w) => w.category)))];

  const handleNext = () => {
    if (currentWordIndex < VOCABULARY_WORDS.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setFlipped(false);
    }
  };

  const handleMarkLearned = () => {
    if (isLearned) {
      setLearned(learned.filter((id) => id !== currentWord.id));
    } else {
      setLearned([...learned, currentWord.id]);
    }
  };

  const getDifficultyColor = (difficulty: "easy" | "medium" | "hard") => {
    switch (difficulty) {
      case "easy":
        return "bg-success/20 text-success";
      case "medium":
        return "bg-warning/20 text-warning";
      case "hard":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-primary/20 text-primary";
    }
  };

  return (
    <div className="min-h-screen gradient-primary p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            📚 Vocabulary Builder
          </h1>
          <p className="text-white/80">
            Expand your English vocabulary with interactive flashcards
          </p>
        </div>

        {/* Progress */}
        <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 mb-8">
          <div className="flex justify-between items-center mb-4">
            <p className="text-white font-semibold">
              Word {currentWordIndex + 1} of {VOCABULARY_WORDS.length}
            </p>
            <p className="text-accent font-bold">
              {learned.length} Learned
            </p>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-500"
              style={{ width: `${((currentWordIndex + 1) / VOCABULARY_WORDS.length) * 100}%` }}
            />
          </div>
        </Card>

        {/* Category Filter */}
        <div className="mb-8 flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-accent text-accent-foreground"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Flashcard */}
        <Card
          onClick={() => setFlipped(!flipped)}
          className="p-12 bg-gradient-to-br from-secondary to-secondary/80 text-white cursor-pointer transition-all transform hover:scale-105 mb-8 min-h-80 flex flex-col justify-center items-center"
        >
          <div className="text-center">
            {!flipped ? (
              <>
                <p className="text-sm opacity-75 mb-4">WORD</p>
                <h2 className="text-5xl md:text-6xl font-bold mb-4">{currentWord.word}</h2>
                <p className="text-lg opacity-90">{currentWord.pronunciation}</p>
                <p className={`mt-4 px-4 py-2 rounded-full inline-block ${getDifficultyColor(currentWord.difficulty)}`}>
                  {currentWord.difficulty.toUpperCase()}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm opacity-75 mb-4">DEFINITION</p>
                <p className="text-2xl mb-6">{currentWord.definition}</p>
                <div className="bg-white/20 p-4 rounded-lg mb-4">
                  <p className="text-sm opacity-75 mb-2">Example:</p>
                  <p className="italic">"{currentWord.example}"</p>
                </div>
                <div className="bg-accent/20 p-4 rounded-lg">
                  <p className="text-sm opacity-75 mb-2">Arabic:</p>
                  <p className="text-xl font-semibold">{currentWord.arabicTranslation}</p>
                </div>
              </>
            )}
            <p className="text-xs opacity-50 mt-8">Click to flip</p>
          </div>
        </Card>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            onClick={handlePrevious}
            disabled={currentWordIndex === 0}
            className="btn-primary py-3 disabled:opacity-50"
          >
            ← Previous
          </Button>

          <Button
            onClick={handleMarkLearned}
            className={`py-3 font-bold rounded-xl transition-all ${
              isLearned
                ? "bg-success text-white"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <Check className="w-5 h-5 mr-2" />
            {isLearned ? "Learned" : "Mark as Learned"}
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentWordIndex === VOCABULARY_WORDS.length - 1}
            className="btn-accent py-3 disabled:opacity-50"
          >
            Next →
          </Button>
        </div>

        {/* Word Details */}
        <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6">Word Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Part of Speech</p>
              <p className="text-white font-semibold text-lg">{currentWord.partOfSpeech}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Category</p>
              <p className="text-white font-semibold text-lg">{currentWord.category}</p>
            </div>
            <div className="flex gap-4">
              <Button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/80">
                <Volume2 className="w-5 h-5" />
                Hear Pronunciation
              </Button>
              <Button className="flex items-center gap-2 bg-secondary text-white hover:bg-secondary/80">
                <RotateCw className="w-5 h-5" />
                Shuffle Words
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
