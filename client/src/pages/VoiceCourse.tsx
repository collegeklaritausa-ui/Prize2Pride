/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║           INTERACTIVE VOICE COURSE - Prize2Pride Platform                ║
 * ║                                                                           ║
 * ║  Autonomous AI-powered voice learning with animated avatars              ║
 * ║  Real-time speech evaluation for American English mastery                ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Mic, 
  Volume2, 
  ChevronRight, 
  ChevronLeft,
  Award,
  Star,
  Zap,
  Target,
  GraduationCap,
  MessageCircle,
  Play,
  Pause,
  SkipForward
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AutonomousAvatar, AVATARS, AvatarId } from "@/components/AutonomousAvatar";
import { SpeechEvaluator } from "@/components/SpeechEvaluator";

// Course modules with American English content
const COURSE_MODULES = [
  {
    id: 1,
    title: "Greetings & Introductions",
    level: "A1",
    avatar: "sophia" as AvatarId,
    lessons: [
      {
        id: 1,
        title: "Saying Hello",
        targetText: "Hello! My name is John. Nice to meet you. How are you doing today?",
        vocabulary: ["hello", "nice", "meet", "today"],
        grammarFocus: "Present tense greetings",
        culturalNote: "Americans often say 'How are you?' as a greeting, not expecting a detailed answer."
      },
      {
        id: 2,
        title: "Introducing Yourself",
        targetText: "Hi there! I'm from New York. I work as a teacher. What do you do for a living?",
        vocabulary: ["from", "work", "teacher", "living"],
        grammarFocus: "Present simple for occupations",
        culturalNote: "It's common in America to ask about someone's job when first meeting them."
      },
      {
        id: 3,
        title: "Casual Greetings",
        targetText: "Hey! What's up? Long time no see! We should grab coffee sometime.",
        vocabulary: ["hey", "what's up", "long time", "grab coffee"],
        grammarFocus: "Informal expressions",
        culturalNote: "'What's up?' is a casual greeting among friends, similar to 'How are you?'"
      }
    ]
  },
  {
    id: 2,
    title: "Daily Conversations",
    level: "A2",
    avatar: "aymena" as AvatarId,
    lessons: [
      {
        id: 1,
        title: "At the Coffee Shop",
        targetText: "I'd like a large coffee with cream and sugar, please. Could I also get a blueberry muffin?",
        vocabulary: ["large", "cream", "sugar", "muffin"],
        grammarFocus: "Polite requests with 'would like' and 'could'",
        culturalNote: "Americans typically tip 15-20% at coffee shops with table service."
      },
      {
        id: 2,
        title: "Making Plans",
        targetText: "Are you free this weekend? I was thinking we could go to the movies or maybe try that new restaurant downtown.",
        vocabulary: ["free", "weekend", "movies", "downtown"],
        grammarFocus: "Future plans with 'could' and suggestions",
        culturalNote: "Americans often make plans a few days in advance rather than spontaneously."
      },
      {
        id: 3,
        title: "Phone Conversations",
        targetText: "Hi, this is Sarah calling. Is this a good time to talk? I wanted to discuss the project deadline.",
        vocabulary: ["calling", "good time", "discuss", "deadline"],
        grammarFocus: "Phone etiquette expressions",
        culturalNote: "It's polite to ask if it's a good time before starting a conversation."
      }
    ]
  },
  {
    id: 3,
    title: "Professional English",
    level: "B1",
    avatar: "elena" as AvatarId,
    lessons: [
      {
        id: 1,
        title: "Job Interview",
        targetText: "I have five years of experience in marketing. My greatest strength is my ability to work well under pressure.",
        vocabulary: ["experience", "marketing", "strength", "pressure"],
        grammarFocus: "Present perfect for experience",
        culturalNote: "American interviews often include behavioral questions about past experiences."
      },
      {
        id: 2,
        title: "Business Meeting",
        targetText: "Let's go over the quarterly results. Sales have increased by fifteen percent compared to last year.",
        vocabulary: ["quarterly", "results", "increased", "percent"],
        grammarFocus: "Present perfect for recent results",
        culturalNote: "American business meetings typically start with small talk before getting to business."
      },
      {
        id: 3,
        title: "Email Communication",
        targetText: "I hope this email finds you well. I'm writing to follow up on our previous conversation regarding the proposal.",
        vocabulary: ["hope", "follow up", "previous", "proposal"],
        grammarFocus: "Formal email expressions",
        culturalNote: "American business emails tend to be more direct than in some other cultures."
      }
    ]
  },
  {
    id: 4,
    title: "Advanced Vocabulary",
    level: "B2",
    avatar: "puchasy" as AvatarId,
    lessons: [
      {
        id: 1,
        title: "Expressing Opinions",
        targetText: "In my opinion, the new policy will significantly impact our productivity. Nevertheless, I believe we should give it a fair chance.",
        vocabulary: ["opinion", "significantly", "nevertheless", "fair chance"],
        grammarFocus: "Expressing and qualifying opinions",
        culturalNote: "Americans value direct expression of opinions but appreciate diplomatic phrasing."
      },
      {
        id: 2,
        title: "Academic Discussion",
        targetText: "The research findings suggest a correlation between sleep quality and cognitive performance. Furthermore, the data indicates long-term benefits.",
        vocabulary: ["findings", "correlation", "cognitive", "furthermore"],
        grammarFocus: "Academic language and hedging",
        culturalNote: "American academic writing often uses hedging language to qualify claims."
      },
      {
        id: 3,
        title: "Idioms & Expressions",
        targetText: "Let's not beat around the bush. We need to think outside the box and hit the ground running on this project.",
        vocabulary: ["beat around the bush", "think outside the box", "hit the ground running"],
        grammarFocus: "Common American idioms",
        culturalNote: "Business English in America frequently uses sports and action metaphors."
      }
    ]
  }
];

export default function VoiceCourse() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showEvaluator, setShowEvaluator] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [totalScore, setTotalScore] = useState(0);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState("");

  const currentModule = COURSE_MODULES[currentModuleIndex];
  const currentLesson = currentModule.lessons[currentLessonIndex];
  const lessonKey = `${currentModule.id}-${currentLesson.id}`;

  const progress = (completedLessons.size / COURSE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0)) * 100;

  // Avatar speaks lesson introduction
  useEffect(() => {
    const intro = `Welcome to ${currentLesson.title}. Today we'll practice ${currentLesson.grammarFocus}. Listen carefully and then repeat after me.`;
    setAvatarMessage(intro);
  }, [currentLesson]);

  const handleEvaluationComplete = useCallback((result: any) => {
    if (result.overallScore >= 60) {
      setCompletedLessons(prev => new Set(Array.from(prev).concat([lessonKey])));
      setTotalScore(prev => prev + result.overallScore);
    }
  }, [lessonKey]);

  const nextLesson = () => {
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (currentModuleIndex < COURSE_MODULES.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentLessonIndex(0);
    }
    setShowEvaluator(false);
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentLessonIndex(COURSE_MODULES[currentModuleIndex - 1].lessons.length - 1);
    }
    setShowEvaluator(false);
  };

  const speakTargetText = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentLesson.targetText);
    utterance.rate = 0.85;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-purple-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Prize2Pride Voice Course</h1>
                <p className="text-purple-300 text-sm">Interactive American English Learning</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-white font-bold">{Math.round(progress)}% Complete</div>
                <Progress value={progress} className="w-32 h-2" />
              </div>
              <Badge className="bg-purple-600">
                <Star className="w-4 h-4 mr-1" />
                {totalScore} pts
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Avatar */}
          <div className="lg:col-span-1">
            <AutonomousAvatar
              avatarId={currentModule.avatar}
              autoSpeak={true}
              initialMessage={avatarMessage}
              onSpeechStart={() => setIsAvatarSpeaking(true)}
              onSpeechEnd={() => setIsAvatarSpeaking(false)}
              className="sticky top-24"
            />
            
            {/* Module Navigation */}
            <Card className="mt-6 bg-slate-900/80 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg">Course Modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {COURSE_MODULES.map((module, idx) => (
                  <button
                    key={module.id}
                    onClick={() => {
                      setCurrentModuleIndex(idx);
                      setCurrentLessonIndex(0);
                      setShowEvaluator(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      idx === currentModuleIndex
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{module.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {module.level}
                      </Badge>
                    </div>
                    <div className="text-xs mt-1 opacity-70">
                      {module.lessons.length} lessons
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Lesson Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Header */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Badge className="bg-purple-600 mb-2">{currentModule.level}</Badge>
                    <h2 className="text-2xl font-bold text-white">{currentLesson.title}</h2>
                    <p className="text-purple-300">{currentModule.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevLesson}
                      disabled={currentModuleIndex === 0 && currentLessonIndex === 0}
                      className="border-purple-500/50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextLesson}
                      disabled={
                        currentModuleIndex === COURSE_MODULES.length - 1 &&
                        currentLessonIndex === currentModule.lessons.length - 1
                      }
                      className="border-purple-500/50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Lesson Progress */}
                <div className="flex gap-2">
                  {currentModule.lessons.map((lesson, idx) => (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setCurrentLessonIndex(idx);
                        setShowEvaluator(false);
                      }}
                      className={`flex-1 h-2 rounded-full transition-all ${
                        idx === currentLessonIndex
                          ? 'bg-purple-500'
                          : completedLessons.has(`${currentModule.id}-${lesson.id}`)
                          ? 'bg-green-500'
                          : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Target Text */}
            <Card className="bg-slate-900/80 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  Practice Text
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/30 mb-4">
                  <p className="text-white text-xl leading-relaxed">{currentLesson.targetText}</p>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={speakTargetText}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Listen to Native Speaker
                  </Button>
                  <Button
                    onClick={() => setShowEvaluator(!showEvaluator)}
                    variant={showEvaluator ? "secondary" : "default"}
                    className={showEvaluator ? "" : "bg-green-600 hover:bg-green-700"}
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    {showEvaluator ? "Hide Evaluator" : "Start Speaking Practice"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Speech Evaluator */}
            <AnimatePresence>
              {showEvaluator && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <SpeechEvaluator
                    targetText={currentLesson.targetText}
                    difficulty={currentModule.level as any}
                    onEvaluationComplete={handleEvaluationComplete}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lesson Details */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Vocabulary */}
              <Card className="bg-slate-900/80 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    Key Vocabulary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {currentLesson.vocabulary.map((word, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-blue-300 border-blue-500/50 cursor-pointer hover:bg-blue-500/20"
                        onClick={() => {
                          const utterance = new SpeechSynthesisUtterance(word);
                          utterance.lang = 'en-US';
                          utterance.rate = 0.8;
                          window.speechSynthesis.speak(utterance);
                        }}
                      >
                        <Volume2 className="w-3 h-3 mr-1" />
                        {word}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Grammar Focus */}
              <Card className="bg-slate-900/80 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Grammar Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{currentLesson.grammarFocus}</p>
                </CardContent>
              </Card>
            </div>

            {/* Cultural Note */}
            <Card className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-2">Cultural Note</h4>
                    <p className="text-gray-300">{currentLesson.culturalNote}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Completion Status */}
            {completedLessons.has(lessonKey) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-900/30 border border-green-500/30 rounded-xl p-6 text-center"
              >
                <Award className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-green-400 text-xl font-bold mb-2">Lesson Completed!</h3>
                <p className="text-gray-300">Great job! You've mastered this lesson.</p>
                <Button
                  onClick={nextLesson}
                  className="mt-4 bg-green-600 hover:bg-green-700"
                >
                  Continue to Next Lesson
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
