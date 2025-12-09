import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Loader2, Medal, Crown, Flame } from "lucide-react";

export default function Leaderboard() {
  const leaderboardQuery = trpc.leaderboard.getTop.useQuery({ limit: 50 });

  if (leaderboardQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-primary">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
      </div>
    );
  }

  const leaderboard = leaderboardQuery.data || [];

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-lg font-bold text-primary">#{position}</span>;
    }
  };

  return (
    <div className="min-h-screen gradient-secondary p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-white/80">Top performers in the A1 English Quiz</p>
        </div>

        {leaderboard.length > 0 ? (
          <div className="space-y-3">
            {leaderboard.map((player, index) => (
              <Card
                key={player.userId}
                className={`p-6 flex items-center justify-between transition-all hover:shadow-lg ${
                  index < 3
                    ? "bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent/50"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12">
                    {getMedalIcon(index + 1)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Player #{player.userId}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                      <span>Level {player.level}</span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        {player.bestStreak} streak
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-right">
                  <div>
                    <p className="text-2xl font-bold text-primary">{player.totalScore}</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success">{player.accuracyRate}%</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">{player.correctAnswers}</p>
                    <p className="text-xs text-muted-foreground">Correct</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg mb-4">No players on the leaderboard yet.</p>
            <p className="text-sm text-muted-foreground">Complete some quizzes to appear here!</p>
          </Card>
        )}
      </div>
    </div>
  );
}
