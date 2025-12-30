/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║           AUGMENTED HOME - Prize2Pride Platform                          ║
 * ║                                                                           ║
 * ║  Super augmented landing page with autonomous AI avatars                 ║
 * ║  Interactive voice-based American English learning platform              ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Mic,
  Volume2,
  BookOpen,
  Trophy,
  Users,
  Zap,
  Star,
  Play,
  ArrowRight,
  GraduationCap,
  Globe,
  Brain,
  Target,
  Award,
  MessageCircle
} from "lucide-react";
import { AutonomousAvatar, AVATARS, AvatarId } from "@/components/AutonomousAvatar";

// Animated background particles
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

// Feature card component
function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-all h-full">
        <CardContent className="p-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function AugmentedHome() {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarId>("sophia");
  const [showAvatarDemo, setShowAvatarDemo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play welcome message on load
  useEffect(() => {
    const timer = setTimeout(() => {
      const welcomeMessage = "Welcome to Prize2Pride! The most advanced American English learning platform. Click on any avatar to start your journey!";
      const utterance = new SpeechSynthesisUtterance(welcomeMessage);
      utterance.rate = 0.9;
      utterance.lang = 'en-US';
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }, 1500);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, []);

  const avatarList = Object.values(AVATARS);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-purple-500/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Prize2Pride
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/voice-course">
              <a className="hover:text-purple-400 transition flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Voice Course
              </a>
            </Link>
            <Link href="/quiz">
              <a className="hover:text-purple-400 transition flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Quiz
              </a>
            </Link>
            <Link href="/leaderboard">
              <a className="hover:text-purple-400 transition flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Leaderboard
              </a>
            </Link>
          </div>

          <Link href="/voice-course">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30">
              Start Learning
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto relative z-10">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-6"
            >
              <Badge className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/50 text-purple-200">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Autonomous Learning Platform
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Master American English
              </span>
              <br />
              <span className="text-white">With AI Avatars</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Interactive voice courses with autonomous speaking avatars. 
              Real-time evaluation of your grammar, vocabulary, and pronunciation.
            </p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/voice-course">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Start Voice Course
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-purple-500/50 hover:bg-purple-500/10"
                onClick={() => setShowAvatarDemo(true)}
              >
                <Play className="w-5 h-5 mr-2" />
                Meet the Avatars
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: "4", label: "AI Avatars", icon: Users },
                { value: "100+", label: "Voice Lessons", icon: Mic },
                { value: "6", label: "Skill Levels", icon: Target },
                { value: "24/7", label: "Available", icon: Globe }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 backdrop-blur"
                >
                  <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Avatar Showcase */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Your <span className="text-purple-400">AI Teachers</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Each avatar specializes in different aspects of American English. 
              Click on an avatar to hear them speak!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {avatarList.map((avatar, idx) => (
              <motion.div
                key={avatar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onClick={() => {
                  setSelectedAvatar(avatar.id as AvatarId);
                  setShowAvatarDemo(true);
                }}
                className="cursor-pointer"
              >
                <Card className={`bg-gradient-to-br ${avatar.color} p-1 hover:shadow-xl hover:shadow-purple-500/20 transition-all`}>
                  <div className="bg-slate-900/95 rounded-lg p-6">
                    <div className="relative mb-4">
                      <img
                        src={avatar.image}
                        alt={avatar.name}
                        className="w-full aspect-square object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent rounded-xl" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <Badge className="bg-purple-600/80 backdrop-blur-sm">
                          {avatar.specialty}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{avatar.name}</h3>
                    <p className="text-purple-300 text-sm">{avatar.title}</p>
                    <p className="text-gray-400 text-xs mt-2">{avatar.personality}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-4 text-purple-300 hover:text-white hover:bg-purple-500/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        const utterance = new SpeechSynthesisUtterance(avatar.greeting);
                        utterance.rate = 0.9;
                        utterance.lang = 'en-US';
                        window.speechSynthesis.speak(utterance);
                      }}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Hear {avatar.name}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Augmented <span className="text-purple-400">Learning Features</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Advanced AI technology for the most effective American English learning experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Mic}
              title="Voice Recognition"
              description="Real-time speech recognition evaluates your pronunciation and fluency in American English."
              delay={0}
            />
            <FeatureCard
              icon={Brain}
              title="AI Evaluation"
              description="Intelligent analysis of grammar, vocabulary, and intonation with scholarly feedback."
              delay={0.1}
            />
            <FeatureCard
              icon={MessageCircle}
              title="Autonomous Avatars"
              description="AI avatars that speak autonomously, guide lessons, and respond to your progress."
              delay={0.2}
            />
            <FeatureCard
              icon={Target}
              title="Adaptive Learning"
              description="Personalized lessons that adapt to your skill level from A1 to C2."
              delay={0.3}
            />
            <FeatureCard
              icon={Award}
              title="Progress Tracking"
              description="Comprehensive statistics on your grammar, vocabulary, and speaking improvements."
              delay={0.4}
            />
            <FeatureCard
              icon={Globe}
              title="Cultural Context"
              description="Learn authentic American expressions, idioms, and cultural nuances."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-3xl p-12 border border-purple-500/30 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <GraduationCap className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Ready to Master American English?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Start your journey with our AI-powered voice courses. 
              Practice speaking, get instant feedback, and track your progress.
            </p>
            <Link href="/voice-course">
              <Button
                size="lg"
                className="h-14 px-10 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
              >
                Begin Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-purple-500/20 relative z-10">
        <div className="container mx-auto text-center text-gray-400">
          <p>© 2025 Prize2Pride - Augmenting Humanity Through Language Education</p>
          <p className="text-sm mt-2">Powered by Autonomous AI Technology</p>
        </div>
      </footer>

      {/* Avatar Demo Modal */}
      <AnimatePresence>
        {showAvatarDemo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAvatarDemo(false)}
          >
            <motion.div
              className="max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AutonomousAvatar
                avatarId={selectedAvatar}
                autoSpeak={true}
              />
              <Button
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowAvatarDemo(false)}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
