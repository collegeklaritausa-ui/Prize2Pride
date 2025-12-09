import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Loader2, Medal, Crown, Flame, TrendingUp, Zap } from "lucide-react";

export default function SmartLeaderboard() {
  const leaderboardQuery = trpc.leaderboard.getTop.useQuery({ limit: 100 });
  const [displayedCount, setDisplayedCount] = useState(10);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      setDisplayedCount((prev) => {
        const max = (leaderboardQuery.data?.length || 10) + 1;
        return prev >= max ? 1 : prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [autoScroll, leaderboardQuery.data?.length]);

  if (leaderboardQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-primary">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
      </div>
    );
  }

  const leaderboard = leaderboardQuery.data || [];
  const displayedLeaderboard = leaderboard.slice(0, displayedCount);

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-400 animate-bounce" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Medal className="w-8 h-8 text-orange-600" />;
      default:
        return <span className="text-2xl font-bold text-primary">#{position}</span>;
    }
  };

  return (
    <div className="min-h-screen gradient-secondary p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
                🏆 GIANT SMART LEADERBOARD
              </h1>
              <p className="text-xl text-white/80">
                Real-time rankings of top performers
              </p>
            </div>
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                autoScroll
                  ? "bg-accent text-accent-foreground"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {autoScroll ? "⏸ Pause" : "▶ Auto-Scroll"}
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-white/10 backdrop-blur-md border border-white/20">
              <p className="text-white/80 text-sm mb-1">Total Players</p>
              <p className="text-3xl font-bold text-accent">{leaderboard.length}</p>
            </Card>
            <Card className="p-4 bg-white/10 backdrop-blur-md border border-white/20">
              <p className="text-white/80 text-sm mb-1">Top Score</p>
              <p className="text-3xl font-bold text-primary">
                {leaderboard[0]?.totalScore || 0}
              </p>
            </Card>
            <Card className="p-4 bg-white/10 backdrop-blur-md border border-white/20">
              <p className="text-white/80 text-sm mb-1">Avg Accuracy</p>
              <p className="text-3xl font-bold text-secondary">
                {leaderboard.length > 0
                  ? Math.round(
                      leaderboard.reduce((sum, p) => sum + p.accuracyRate, 0) /
                        leaderboard.length
                    )
                  : 0}
                %
              </p>
            </Card>
            <Card className="p-4 bg-white/10 backdrop-blur-md border border-white/20">
              <p className="text-white/80 text-sm mb-1">Best Streak</p>
              <p className="text-3xl font-bold text-accent">
                {Math.max(...leaderboard.map((p) => p.bestStreak), 0)}
              </p>
            </Card>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {displayedLeaderboard.length > 0 ? (
              <div className="space-y-3">
                {displayedLeaderboard.map((player, index) => {
                  const position = index + 1;
                  const isTopThree = position <= 3;

                  return (
                    <Card
                      key={player.userId}
                      className={`p-6 transition-all duration-500 ${
                        isTopThree
                          ? "bg-gradient-to-r from-accent/30 to-primary/30 border-2 border-accent/50 scale-105 shadow-2xl"
                          : "bg-white/5 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-6">
                        {/* Position */}
                        <div className="flex items-center gap-4 min-w-fit">
                          <div className="flex items-center justify-center w-16 h-16">
                            {getMedalIcon(position)}
                          </div>
                          <div>
                            <p className="text-white/60 text-sm">Position</p>
                            <p className="text-3xl font-bold text-white">#{position}</p>
                          </div>
                        </div>

                        {/* Player Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-white truncate">
                            Player #{player.userId}
                          </h3>
                          <div className="flex gap-4 text-sm text-white/60 mt-2">
                            <span className="flex items-center gap-1">
                              <Zap className="w-4 h-4 text-primary" />
                              Level {player.level}
                            </span>
                            <span className="flex items-center gap-1">
                              <Flame className="w-4 h-4 text-orange-500" />
                              {player.bestStreak} streak
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4 text-secondary" />
                              {player.correctAnswers}/{player.totalQuestions}
                            </span>
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-4 gap-4 min-w-fit">
                          <div className="text-center">
                            <p className="text-white/60 text-xs mb-1">Score</p>
                            <p className="text-2xl font-bold text-accent">
                              {player.totalScore}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-white/60 text-xs mb-1">Accuracy</p>
                            <p className="text-2xl font-bold text-primary">
                              {player.accuracyRate}%
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-white/60 text-xs mb-1">Correct</p>
                            <p className="text-2xl font-bold text-success">
                              {player.correctAnswers}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-white/60 text-xs mb-1">Current</p>
                            <p className="text-2xl font-bold text-secondary">
                              {player.currentStreak}
                            </p>
                          </div>
                        </div>

                        {/* Rank Badge */}
                        {isTopThree && (
                          <div className="text-right">
                            <div className="text-4xl mb-2">
                              {position === 1 ? "🥇" : position === 2 ? "🥈" : "🥉"}
                            </div>
                            <p className="text-xs text-white/60 font-semibold">
                              {position === 1 ? "CHAMPION" : position === 2 ? "2ND PLACE" : "3RD PLACE"}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between text-xs text-white/60 mb-2">
                          <span>Progress to Next Level</span>
                          <span>{(player.totalScore % 100) / 100 * 100 | 0}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-accent to-primary h-full transition-all duration-500"
                            style={{ width: `${(player.totalScore % 100) / 100 * 100}%` }}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="p-12 text-center bg-white/10 backdrop-blur-md border border-white/20">
                <p className="text-white/60 text-lg mb-4">No players on the leaderboard yet.</p>
                <p className="text-white/40 text-sm">Complete some quizzes to appear here!</p>
              </Card>
            )}
          </div>
        </div>

        {/* Footer Stats */}
        {leaderboard.length > displayedCount && (
          <div className="mt-8 text-center">
            <p className="text-white/60 mb-4">
              Showing {displayedCount} of {leaderboard.length} players
            </p>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="bg-accent h-full transition-all duration-500"
                style={{ width: `${(displayedCount / leaderboard.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
