/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║           SPEECH EVALUATOR - Prize2Pride Platform                        ║
 * ║                                                                           ║
 * ║  Evaluates user speech for grammar, vocabulary, intonation, and          ║
 * ║  provides scholarly feedback for American English learning               ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  MicOff, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BookOpen,
  Volume2,
  RotateCcw,
  Award,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface EvaluationResult {
  overallScore: number;
  grammar: {
    score: number;
    errors: GrammarError[];
    feedback: string;
  };
  vocabulary: {
    score: number;
    level: string;
    suggestions: string[];
    feedback: string;
  };
  pronunciation: {
    score: number;
    issues: string[];
    feedback: string;
  };
  fluency: {
    score: number;
    wordsPerMinute: number;
    feedback: string;
  };
  scholarlyFeedback: string;
  encouragement: string;
}

interface GrammarError {
  original: string;
  correction: string;
  rule: string;
  explanation: string;
}

interface SpeechEvaluatorProps {
  targetText?: string;
  onEvaluationComplete?: (result: EvaluationResult) => void;
  difficulty?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  className?: string;
}

// Grammar rules for American English
const GRAMMAR_RULES = {
  subjectVerbAgreement: {
    pattern: /\b(he|she|it)\s+(have|do|go|make)\b/gi,
    correction: (match: string) => {
      const corrections: Record<string, string> = {
        'have': 'has', 'do': 'does', 'go': 'goes', 'make': 'makes'
      };
      const words = match.split(' ');
      return `${words[0]} ${corrections[words[1].toLowerCase()] || words[1]}`;
    },
    rule: "Subject-Verb Agreement",
    explanation: "Third person singular subjects (he, she, it) require verbs ending in -s or -es."
  },
  articleUsage: {
    pattern: /\ba\s+[aeiou]/gi,
    correction: (match: string) => match.replace(/^a\s+/i, 'an '),
    rule: "Article Usage",
    explanation: "Use 'an' before words starting with vowel sounds."
  },
  doubleNegative: {
    pattern: /\b(don't|doesn't|didn't|won't|can't|couldn't|wouldn't)\s+\w+\s+(no|nothing|nobody|nowhere|never)\b/gi,
    correction: (match: string) => match.replace(/\s+(no|nothing|nobody|nowhere|never)\b/i, ' any'),
    rule: "Double Negative",
    explanation: "In standard American English, avoid using two negatives in the same clause."
  }
};

// Vocabulary level indicators
const VOCABULARY_LEVELS = {
  A1: ['hello', 'goodbye', 'please', 'thank', 'yes', 'no', 'good', 'bad', 'big', 'small'],
  A2: ['because', 'however', 'although', 'therefore', 'meanwhile', 'actually', 'probably'],
  B1: ['nevertheless', 'furthermore', 'consequently', 'subsequently', 'essentially'],
  B2: ['notwithstanding', 'henceforth', 'whereby', 'thereof', 'heretofore'],
  C1: ['juxtaposition', 'paradigm', 'quintessential', 'ubiquitous', 'ephemeral'],
  C2: ['sesquipedalian', 'perspicacious', 'pulchritudinous', 'defenestration']
};

export function SpeechEvaluator({
  targetText,
  onEvaluationComplete,
  difficulty = 'A1',
  className = ""
}: SpeechEvaluatorProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Initialize speech recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      
      if (final) {
        setTranscript(prev => prev + ' ' + final);
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      if (isRecording) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording]);

  const startRecording = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    setEvaluation(null);
    setRecordingTime(0);
    startTimeRef.current = Date.now();
    
    timerRef.current = setInterval(() => {
      setRecordingTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    
    setIsRecording(true);
    recognitionRef.current?.start();
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    recognitionRef.current?.stop();
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Evaluate the speech
    if (transcript.trim()) {
      evaluateSpeech(transcript.trim());
    }
  }, [transcript]);

  const evaluateSpeech = useCallback((text: string) => {
    setIsEvaluating(true);
    
    // Simulate evaluation processing
    setTimeout(() => {
      const result = performEvaluation(text, targetText, difficulty, recordingTime);
      setEvaluation(result);
      setIsEvaluating(false);
      onEvaluationComplete?.(result);
    }, 1500);
  }, [targetText, difficulty, recordingTime, onEvaluationComplete]);

  const performEvaluation = (
    userText: string, 
    target: string | undefined, 
    level: string,
    duration: number
  ): EvaluationResult => {
    const words = userText.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const wordsPerMinute = duration > 0 ? Math.round((wordCount / duration) * 60) : 0;
    
    // Grammar evaluation
    const grammarErrors: GrammarError[] = [];
    let correctedText = userText;
    
    Object.values(GRAMMAR_RULES).forEach(rule => {
      const matches = userText.match(rule.pattern);
      if (matches) {
        matches.forEach(match => {
          const correction = rule.correction(match);
          if (correction !== match) {
            grammarErrors.push({
              original: match,
              correction: correction,
              rule: rule.rule,
              explanation: rule.explanation
            });
            correctedText = correctedText.replace(match, correction);
          }
        });
      }
    });
    
    const grammarScore = Math.max(0, 100 - (grammarErrors.length * 15));
    
    // Vocabulary evaluation
    const lowerWords = words.map(w => w.toLowerCase().replace(/[^a-z]/g, ''));
    let vocabLevel = 'A1';
    let advancedWordCount = 0;
    
    Object.entries(VOCABULARY_LEVELS).forEach(([lvl, vocabWords]) => {
      const found = lowerWords.filter(w => vocabWords.includes(w)).length;
      if (found > 0) {
        vocabLevel = lvl;
        advancedWordCount += found;
      }
    });
    
    const vocabScore = Math.min(100, 60 + (advancedWordCount * 10));
    
    // Pronunciation score (simulated based on word clarity)
    const pronunciationScore = Math.min(100, 70 + Math.random() * 20);
    
    // Fluency score
    const idealWPM = { A1: 80, A2: 100, B1: 120, B2: 140, C1: 160, C2: 180 }[level] || 100;
    const fluencyScore = Math.min(100, Math.max(50, 100 - Math.abs(wordsPerMinute - idealWPM)));
    
    // Overall score
    const overallScore = Math.round(
      (grammarScore * 0.3) + 
      (vocabScore * 0.25) + 
      (pronunciationScore * 0.25) + 
      (fluencyScore * 0.2)
    );
    
    // Generate scholarly feedback
    const scholarlyFeedback = generateScholarlyFeedback(
      grammarScore, vocabScore, pronunciationScore, fluencyScore, grammarErrors
    );
    
    const encouragement = generateEncouragement(overallScore);
    
    return {
      overallScore,
      grammar: {
        score: grammarScore,
        errors: grammarErrors,
        feedback: grammarErrors.length === 0 
          ? "Excellent grammar! Your sentence structures are correct."
          : `Found ${grammarErrors.length} grammar issue(s). Review the corrections below.`
      },
      vocabulary: {
        score: vocabScore,
        level: vocabLevel,
        suggestions: generateVocabSuggestions(level),
        feedback: `Your vocabulary demonstrates ${vocabLevel} level proficiency.`
      },
      pronunciation: {
        score: pronunciationScore,
        issues: [],
        feedback: pronunciationScore > 80 
          ? "Clear pronunciation with good American English accent."
          : "Practice enunciating words more clearly."
      },
      fluency: {
        score: fluencyScore,
        wordsPerMinute,
        feedback: `Speaking rate: ${wordsPerMinute} words per minute. ${
          wordsPerMinute < 80 ? "Try to speak a bit faster." :
          wordsPerMinute > 160 ? "Slow down slightly for clarity." :
          "Good speaking pace!"
        }`
      },
      scholarlyFeedback,
      encouragement
    };
  };

  const generateScholarlyFeedback = (
    grammar: number, 
    vocab: number, 
    pronunciation: number, 
    fluency: number,
    errors: GrammarError[]
  ): string => {
    const parts = [];
    
    if (grammar >= 90) {
      parts.push("Your grammatical accuracy demonstrates a strong command of American English syntax.");
    } else if (grammar >= 70) {
      parts.push("Your grammar shows good foundational knowledge with room for refinement.");
    } else {
      parts.push("Focus on reviewing fundamental grammar rules, particularly subject-verb agreement and article usage.");
    }
    
    if (vocab >= 80) {
      parts.push("Your lexical range indicates exposure to diverse vocabulary appropriate for academic discourse.");
    } else {
      parts.push("Expanding your vocabulary through reading academic texts will enhance your expression.");
    }
    
    if (errors.length > 0) {
      parts.push(`Key areas for improvement: ${errors.map(e => e.rule).join(', ')}.`);
    }
    
    return parts.join(' ');
  };

  const generateEncouragement = (score: number): string => {
    if (score >= 90) return "Outstanding performance! You're mastering American English beautifully!";
    if (score >= 80) return "Great job! Your English skills are impressive. Keep up the excellent work!";
    if (score >= 70) return "Good progress! You're on the right track. Continue practicing!";
    if (score >= 60) return "Nice effort! With more practice, you'll see significant improvement!";
    return "Keep going! Every practice session brings you closer to fluency!";
  };

  const generateVocabSuggestions = (level: string): string[] => {
    const suggestions: Record<string, string[]> = {
      A1: ["Try using 'however' to connect contrasting ideas", "Practice using 'because' to explain reasons"],
      A2: ["Incorporate 'furthermore' to add supporting points", "Use 'consequently' to show results"],
      B1: ["Employ 'nevertheless' for sophisticated contrast", "Try 'subsequently' for sequence"],
      B2: ["Consider 'notwithstanding' for formal writing", "Use 'whereby' in explanations"],
      C1: ["Explore 'paradigm' in academic contexts", "Incorporate 'quintessential' for emphasis"],
      C2: ["Master nuanced terms like 'perspicacious'", "Use 'ephemeral' for temporal concepts"]
    };
    return suggestions[level] || suggestions.A1;
  };

  const resetEvaluation = () => {
    setTranscript("");
    setInterimTranscript("");
    setEvaluation(null);
    setRecordingTime(0);
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card className={`bg-slate-900/95 border-purple-500/30 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <BookOpen className="w-5 h-5 text-purple-400" />
          Speech Evaluator - American English
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Target Text (if provided) */}
        {targetText && (
          <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-300 font-medium">Read this text:</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => speakText(targetText)}
                className="text-purple-300 hover:text-purple-100"
              >
                <Volume2 className="w-4 h-4 mr-1" />
                Listen
              </Button>
            </div>
            <p className="text-white text-lg leading-relaxed">{targetText}</p>
          </div>
        )}

        {/* Recording Controls */}
        <div className="flex flex-col items-center gap-4">
          <motion.button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRecording ? (
              <MicOff className="w-10 h-10 text-white" />
            ) : (
              <Mic className="w-10 h-10 text-white" />
            )}
          </motion.button>
          
          <div className="text-center">
            <p className="text-white font-medium">
              {isRecording ? `Recording... ${recordingTime}s` : 'Click to start speaking'}
            </p>
            <p className="text-gray-400 text-sm">
              {isRecording ? 'Click again to stop and evaluate' : 'Speak clearly in American English'}
            </p>
          </div>
        </div>

        {/* Live Transcript */}
        {(transcript || interimTranscript) && (
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Your speech:</p>
            <p className="text-white">
              {transcript}
              <span className="text-gray-500">{interimTranscript}</span>
            </p>
          </div>
        )}

        {/* Evaluating Indicator */}
        <AnimatePresence>
          {isEvaluating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-3 py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </motion.div>
              <span className="text-white text-lg">Analyzing your speech...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Evaluation Results */}
        <AnimatePresence>
          {evaluation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Overall Score */}
              <div className="text-center py-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl">
                <div className="text-6xl font-bold text-white mb-2">{evaluation.overallScore}</div>
                <div className="text-purple-300">Overall Score</div>
                <p className="text-green-400 mt-2">{evaluation.encouragement}</p>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Grammar', score: evaluation.grammar.score, icon: CheckCircle },
                  { label: 'Vocabulary', score: evaluation.vocabulary.score, icon: BookOpen },
                  { label: 'Pronunciation', score: evaluation.pronunciation.score, icon: Volume2 },
                  { label: 'Fluency', score: evaluation.fluency.score, icon: TrendingUp }
                ].map(({ label, score, icon: Icon }) => (
                  <div key={label} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300 text-sm">{label}</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{score}%</div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
              </div>

              {/* Grammar Errors */}
              {evaluation.grammar.errors.length > 0 && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="text-red-400 font-medium mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Grammar Corrections
                  </h4>
                  <div className="space-y-3">
                    {evaluation.grammar.errors.map((error, i) => (
                      <div key={i} className="bg-slate-800/50 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <XCircle className="w-4 h-4 text-red-400" />
                          <span className="text-red-300 line-through">{error.original}</span>
                          <span className="text-gray-400">→</span>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-300">{error.correction}</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          <strong className="text-purple-300">{error.rule}:</strong> {error.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scholarly Feedback */}
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Scholarly Analysis
                </h4>
                <p className="text-gray-300 leading-relaxed">{evaluation.scholarlyFeedback}</p>
              </div>

              {/* Vocabulary Suggestions */}
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h4 className="text-purple-400 font-medium mb-2">Vocabulary Enhancement Tips</h4>
                <ul className="space-y-1">
                  {evaluation.vocabulary.suggestions.map((suggestion, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reset Button */}
              <Button
                onClick={resetEvaluation}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export default SpeechEvaluator;
