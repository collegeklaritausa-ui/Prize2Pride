import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Trophy, BarChart3, Zap, Users, Award } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent">
      {/* Navigation Bar */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">A1 English Quiz</h1>
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-white font-semibold">Welcome, {user?.name || "Learner"}!</span>
                <Link href="/progress">
                  <Button className="btn-accent">My Progress</Button>
                </Link>
              </div>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="btn-primary">Log In</Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center text-white">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Master English Grammar
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          Learn A1 level English through interactive quizzes with instant feedback and engaging avatars
        </p>
        {isAuthenticated ? (
          <Link href="/quiz">
            <Button className="btn-accent btn-lg">Start Quiz Now</Button>
          </Link>
        ) : (
          <a href={getLoginUrl()}>
            <Button className="btn-accent btn-lg">Get Started</Button>
          </a>
        )}
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-12">
            Why Choose Our Platform?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
              <BookOpen className="w-12 h-12 text-accent mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">30+ Grammar Questions</h4>
              <p className="text-white/80">
                Comprehensive A1 level questions covering pronouns, verbs, articles, prepositions, and vocabulary
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
              <Zap className="w-12 h-12 text-secondary mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Interactive Avatars</h4>
              <p className="text-white/80">
                10 unique animated characters that provide encouraging or playful feedback based on your answers
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
              <BarChart3 className="w-12 h-12 text-primary mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Track Progress</h4>
              <p className="text-white/80">
                Monitor your performance with detailed statistics, streaks, levels, and experience points
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
              <Users className="w-12 h-12 text-accent mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Leaderboard</h4>
              <p className="text-white/80">
                Compete with other learners and see where you rank on the global leaderboard
              </p>
            </Card>

            {/* Feature 5 */}
            <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
              <Award className="w-12 h-12 text-secondary mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Achievements</h4>
              <p className="text-white/80">
                Unlock badges and rewards for reaching milestones and mastering different grammar topics
              </p>
            </Card>

            {/* Feature 6 */}
            <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
              <Trophy className="w-12 h-12 text-primary mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Bilingual Support</h4>
              <p className="text-white/80">
                Questions and explanations in English with Arabic as the primary explanatory language
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {isAuthenticated && (
        <section className="py-16 px-4 bg-white/10 backdrop-blur-md">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Start Learning?</h3>
            <p className="text-white/80 mb-8 text-lg">
              Begin your journey to mastering A1 English grammar with our interactive quiz platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz">
                <Button className="btn-accent btn-lg">Start Quiz</Button>
              </Link>
              <Link href="/leaderboard">
                <Button className="btn-primary btn-lg">View Leaderboard</Button>
              </Link>
              <Link href="/progress">
                <Button className="btn-secondary btn-lg">My Progress</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/20 py-8 px-4 text-center text-white/80">
        <p>© 2025 A1 English Quiz Platform. Designed for Tunisian learners mastering English grammar.</p>
      </footer>
    </div>
  );
}
