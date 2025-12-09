import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Loader2, Trophy, Zap, Target, Award } from "lucide-react";

export default function Progress() {
  const { isAuthenticated } = useAuth();
  const statsQuery = trpc.progress.getStats.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const achievementsQuery = trpc.achievements.getUserAchievements.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-primary">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <p className="text-muted-foreground">
            You need to be logged in to view your progress.
          </p>
        </Card>
      </div>
    );
  }

  if (statsQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-primary">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
      </div>
    );
  }

  const stats = statsQuery.data;

  return (
    <div className="min-h-screen gradient-primary p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Your Progress</h1>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Questions */}
          <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Questions Answered</h3>
              <Target className="w-6 h-6 opacity-80" />
            </div>
            <p className="text-4xl font-bold">{stats?.totalQuestions || 0}</p>
            <p className="text-white/80 text-sm mt-2">Total questions completed</p>
          </Card>

          {/* Correct Answers */}
          <Card className="p-6 bg-gradient-to-br from-success to-success/80 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Correct Answers</h3>
              <Trophy className="w-6 h-6 opacity-80" />
            </div>
            <p className="text-4xl font-bold">{stats?.correctAnswers || 0}</p>
            <p className="text-white/80 text-sm mt-2">Successfully answered</p>
          </Card>

          {/* Accuracy Rate */}
          <Card className="p-6 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Accuracy</h3>
              <Zap className="w-6 h-6 opacity-80" />
            </div>
            <p className="text-4xl font-bold">{stats?.accuracyRate || 0}%</p>
            <p className="text-accent-foreground/80 text-sm mt-2">Success rate</p>
          </Card>

          {/* Level */}
          <Card className="p-6 bg-gradient-to-br from-secondary to-secondary/80 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Level</h3>
              <Award className="w-6 h-6 opacity-80" />
            </div>
            <p className="text-4xl font-bold">{stats?.level || 1}</p>
            <p className="text-white/80 text-sm mt-2">Current level</p>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Streak Stats */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Streak Statistics</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Current Streak</span>
                  <span className="text-primary font-bold">{stats?.currentStreak || 0}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-500"
                    style={{ width: `${Math.min((stats?.currentStreak || 0) * 10, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Best Streak</span>
                  <span className="text-secondary font-bold">{stats?.bestStreak || 0}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-secondary h-full transition-all duration-500"
                    style={{ width: `${Math.min((stats?.bestStreak || 0) * 10, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Experience Points */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Experience</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total XP</span>
                  <span className="text-accent font-bold">{stats?.experiencePoints || 0}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-accent h-full transition-all duration-500"
                    style={{ width: `${Math.min(((stats?.experiencePoints || 0) % 100) / 100 * 100, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {(stats?.experiencePoints || 0) % 100} / 100 to next level
                </p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Last played: {stats?.lastPlayedAt ? new Date(stats.lastPlayedAt).toLocaleDateString() : "Never"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Achievements</h2>
          {achievementsQuery.isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin w-8 h-8 text-primary" />
            </div>
          ) : achievementsQuery.data && achievementsQuery.data.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {achievementsQuery.data.map((achievement) => (
                <div
                  key={achievement.id}
                  className="p-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl border-2 border-accent/50 text-center"
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <h3 className="font-bold text-sm mb-1">{achievement.name}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No achievements unlocked yet.</p>
              <p className="text-sm text-muted-foreground">Keep practicing to unlock achievements!</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
