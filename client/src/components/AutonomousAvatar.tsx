/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║           AUTONOMOUS SPEAKING AVATAR - Prize2Pride Platform              ║
 * ║                                                                           ║
 * ║  AI-powered avatar that speaks autonomously, guides users through        ║
 * ║  lessons, and provides interactive voice-based learning experiences      ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Mic, MicOff, Play, Pause, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Avatar definitions with personalities and voices
export const AVATARS = {
  aymena: {
    id: "aymena",
    name: "Aymena",
    title: "Grammar Expert",
    personality: "Warm, patient, and scholarly",
    specialty: "Grammar & Academic English",
    voice: "nova",
    image: "/avatars/aymena_avatar.webp",
    greeting: "Welcome to Prize2Pride! I'm Aymena, your grammar expert. Let's master American English together!",
    color: "from-red-600 to-rose-700"
  },
  sophia: {
    id: "sophia",
    name: "Sophia",
    title: "Conversation Coach",
    personality: "Energetic, motivating, and fun",
    specialty: "Speaking & Pronunciation",
    voice: "shimmer",
    image: "/avatars/hostess_prize2pride_silver.webp",
    greeting: "Hey there! I'm Sophia, your speaking coach. Ready to practice your American English pronunciation?",
    color: "from-blue-600 to-indigo-700"
  },
  puchasy: {
    id: "puchasy",
    name: "Puchasy",
    title: "Vocabulary Master",
    personality: "Curious, adventurous, and encouraging",
    specialty: "Vocabulary & Idioms",
    voice: "alloy",
    image: "/avatars/puchasy_avatar.webp",
    greeting: "Hello! I'm Puchasy, your vocabulary guide. Let's expand your American English word power!",
    color: "from-amber-600 to-orange-700"
  },
  elena: {
    id: "elena",
    name: "Elena",
    title: "Cultural Guide",
    personality: "Calm, supportive, and insightful",
    specialty: "Cultural Learning & Business English",
    voice: "echo",
    image: "/avatars/hostess_prize2pride_gold.png",
    greeting: "Welcome! I'm Elena, your cultural guide. I'll help you understand American culture and business communication.",
    color: "from-yellow-500 to-amber-600"
  }
};

export type AvatarId = keyof typeof AVATARS;

interface AutonomousAvatarProps {
  avatarId: AvatarId;
  autoSpeak?: boolean;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onUserSpeechDetected?: (transcript: string) => void;
  initialMessage?: string;
  className?: string;
}

export function AutonomousAvatar({
  avatarId,
  autoSpeak = true,
  onSpeechStart,
  onSpeechEnd,
  onUserSpeechDetected,
  initialMessage,
  className = ""
}: AutonomousAvatarProps) {
  const avatar = AVATARS[avatarId];
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter effect for displayed text
  useEffect(() => {
    if (currentText && !isMuted) {
      setDisplayedText("");
      let index = 0;
      
      typewriterRef.current = setInterval(() => {
        if (index < currentText.length) {
          setDisplayedText(prev => prev + currentText[index]);
          index++;
        } else {
          if (typewriterRef.current) {
            clearInterval(typewriterRef.current);
          }
        }
      }, 30);

      return () => {
        if (typewriterRef.current) {
          clearInterval(typewriterRef.current);
        }
      };
    }
  }, [currentText, isMuted]);

  // Initialize speech synthesis
  const speak = useCallback((text: string) => {
    if (isMuted || !text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to use a natural American English voice
    const voices = window.speechSynthesis.getVoices();
    const americanVoice = voices.find(v => 
      v.lang.includes('en-US') && 
      (v.name.includes('Samantha') || v.name.includes('Alex') || v.name.includes('Google'))
    ) || voices.find(v => v.lang.includes('en-US'));
    
    if (americanVoice) {
      utterance.voice = americanVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsAnimating(true);
      onSpeechStart?.();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsAnimating(false);
      onSpeechEnd?.();
    };

    speechSynthRef.current = utterance;
    setCurrentText(text);
    window.speechSynthesis.speak(utterance);
  }, [isMuted, onSpeechStart, onSpeechEnd]);

  // Initialize speech recognition
  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      
      if (event.results[0].isFinal) {
        onUserSpeechDetected?.(transcript);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [onUserSpeechDetected]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  // Auto-speak greeting on mount
  useEffect(() => {
    if (autoSpeak) {
      const timer = setTimeout(() => {
        speak(initialMessage || avatar.greeting);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoSpeak, avatar.greeting, initialMessage, speak]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const toggleMute = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsAnimating(false);
    }
    setIsMuted(!isMuted);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br ${avatar.color} p-1 ${className}`}>
      <div className="bg-slate-900/95 rounded-lg p-4">
        {/* Avatar Image with Animation */}
        <div className="relative flex justify-center mb-4">
          <motion.div
            className="relative"
            animate={isAnimating ? {
              scale: [1, 1.02, 1],
              transition: { duration: 0.5, repeat: Infinity }
            } : {}}
          >
            {/* Glow effect when speaking */}
            <AnimatePresence>
              {isSpeaking && (
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${avatar.color} blur-xl opacity-50`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0.6 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                />
              )}
            </AnimatePresence>
            
            {/* Avatar Image */}
            <img
              src={avatar.image}
              alt={avatar.name}
              className="w-48 h-48 object-cover rounded-full border-4 border-white/20 shadow-2xl relative z-10"
            />
            
            {/* Speaking indicator */}
            {isSpeaking && (
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{
                      scaleY: [1, 2, 1],
                      transition: {
                        duration: 0.4,
                        repeat: Infinity,
                        delay: i * 0.1
                      }
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Avatar Info */}
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-white">{avatar.name}</h3>
          <p className="text-white/70 text-sm">{avatar.title}</p>
          <p className="text-white/50 text-xs mt-1">{avatar.specialty}</p>
        </div>

        {/* Speech Bubble */}
        <AnimatePresence mode="wait">
          {displayedText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 min-h-[80px]"
            >
              <p className="text-white text-sm leading-relaxed">{displayedText}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control Buttons */}
        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMute}
            className={`${isMuted ? 'bg-red-500/20 border-red-500' : 'bg-white/10 border-white/20'} hover:bg-white/20`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleListening}
            className={`${isListening ? 'bg-green-500/20 border-green-500 animate-pulse' : 'bg-white/10 border-white/20'} hover:bg-white/20`}
          >
            {isListening ? <Mic className="w-4 h-4 text-green-400" /> : <MicOff className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => speak(avatar.greeting)}
            className="bg-white/10 border-white/20 hover:bg-white/20"
          >
            <Play className="w-4 h-4" />
          </Button>
        </div>

        {/* Listening Indicator */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-green-400">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Mic className="w-5 h-5" />
                </motion.div>
                <span className="text-sm">Listening... Speak now!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}

// Export a method to make avatar speak programmatically
export function useAvatarSpeech() {
  const speak = useCallback((text: string, voice?: string) => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    const americanVoice = voices.find(v => v.lang.includes('en-US'));
    if (americanVoice) {
      utterance.voice = americanVoice;
    }
    
    window.speechSynthesis.speak(utterance);
    return utterance;
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  return { speak, stop };
}

export default AutonomousAvatar;
