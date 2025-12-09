import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Volume2, Globe } from "lucide-react";
import { toast } from "sonner";

type Language = "english" | "arabic" | "french" | "spanish" | "german" | "chinese";

export default function Quiz() {
  const { user, isAuthenticated } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [language, setLanguage] = useState<Language>("arabic");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const questionsQuery = trpc.quiz.getQuestions.useQuery({ limit: 10 });
  const submitAnswerMutation = trpc.quiz.submitAnswer.useMutation();

  const questions = questionsQuery.data || [];
  const currentQuestion = questions[currentQuestionIndex];

  const getQuestionText = () => {
    if (!currentQuestion) return "";
    switch (language) {
      case "arabic":
        return currentQuestion.questionArabic || currentQuestion.questionText;
      case "french":
        return currentQuestion.questionFrench || currentQuestion.questionText;
      case "spanish":
        return currentQuestion.questionSpanish || currentQuestion.questionText;
      case "german":
        return currentQuestion.questionGerman || currentQuestion.questionText;
      case "chinese":
        return currentQuestion.questionChinese || currentQuestion.questionText;
      default:
        return currentQuestion.questionText;
    }
  };

  const getExplanation = () => {
    if (!currentQuestion) return "";
    switch (language) {
      case "arabic":
        return currentQuestion.explanationArabic || currentQuestion.explanationEnglish;
      case "french":
        return currentQuestion.explanationFrench || currentQuestion.explanationEnglish;
      case "spanish":
        return currentQuestion.explanationSpanish || currentQuestion.explanationEnglish;
      case "german":
        return currentQuestion.explanationGerman || currentQuestion.explanationEnglish;
      case "chinese":
        return currentQuestion.explanationChinese || currentQuestion.explanationEnglish;
      default:
        return currentQuestion.explanationEnglish;
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (!showFeedback) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !currentQuestion || !isAuthenticated) return;

    try {
      const result = await submitAnswerMutation.mutateAsync({
        questionId: currentQuestion.id,
        userAnswer: selectedAnswer,
      });

      if (result.isCorrect) {
        setScore(score + 1);
        toast.success("Correct! Great job! 🎉");
      } else {
        toast.error(`Incorrect. The correct answer is: ${result.correctAnswer}`);
      }

      setAnswered(answered + 1);
      setShowFeedback(true);
    } catch (error) {
      toast.error("Error submitting answer");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      toast.success("Quiz completed! 🏆");
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-primary">
        <Card className="p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <p className="text-muted-foreground mb-6">
            You need to be logged in to take the quiz.
          </p>
          <Button className="w-full btn-primary">Log In</Button>
        </Card>
      </div>
    );
  }

  if (questionsQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-primary">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-primary">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
          <p className="text-muted-foreground">
            Please try again later.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-secondary p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Language Selector */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              A1 English Quiz
            </h1>
            <p className="text-white/80">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex gap-2 flex-wrap justify-end">
            {(["arabic", "english", "french", "spanish", "german", "chinese"] as Language[]).map(
              (lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-2 rounded-lg font-semibold transition-all text-sm md:text-base ${
                    language === lang
                      ? "bg-white text-primary shadow-lg scale-105"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <Globe className="inline w-4 h-4 mr-1" />
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-white mb-2">
            <span>Progress</span>
            <span>{answered}/{questions.length}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-accent to-primary h-full transition-all duration-500"
              style={{ width: `${(answered / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 mb-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              {getQuestionText()}
            </h2>
            <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <Volume2 className="w-5 h-5" />
              <span className="text-sm font-semibold">Hear Question</span>
            </button>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentQuestion.options.map((option: string) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
                className={`p-4 rounded-xl font-semibold transition-all text-lg ${
                  selectedAnswer === option
                    ? "bg-primary text-white scale-105 shadow-lg"
                    : showFeedback && option === currentQuestion.correctAnswer
                    ? "bg-success text-white"
                    : showFeedback && selectedAnswer === option && selectedAnswer !== currentQuestion.correctAnswer
                    ? "bg-destructive text-white"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Feedback Section */}
          {showFeedback && (
            <div className="mb-8 p-6 bg-accent/10 rounded-xl border-2 border-accent">
              <h3 className="font-bold text-lg mb-2">
                {selectedAnswer === currentQuestion.correctAnswer ? "✅ Correct!" : "❌ Incorrect"}
              </h3>
              <p className="text-foreground mb-4">{getExplanation()}</p>
              <p className="text-sm text-muted-foreground">
                Correct answer: <span className="font-bold text-primary">{currentQuestion.correctAnswer}</span>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!showFeedback ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer || submitAnswerMutation.isPending}
                className="btn-primary btn-lg flex-1"
              >
                {submitAnswerMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                    Checking...
                  </>
                ) : (
                  "Submit Answer"
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="btn-accent btn-lg flex-1"
              >
                {currentQuestionIndex === questions.length - 1 ? "Restart Quiz" : "Next Question"}
              </Button>
            )}
          </div>
        </Card>

        {/* Score Card */}
        <Card className="p-6 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-4xl font-bold">{score}</p>
              <p className="text-white/80">Correct</p>
            </div>
            <div>
              <p className="text-4xl font-bold">{answered - score}</p>
              <p className="text-white/80">Incorrect</p>
            </div>
            <div>
              <p className="text-4xl font-bold">
                {answered > 0 ? Math.round((score / answered) * 100) : 0}%
              </p>
              <p className="text-white/80">Accuracy</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
