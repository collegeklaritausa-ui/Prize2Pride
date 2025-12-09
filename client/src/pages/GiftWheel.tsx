import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { Sparkles, Gift, Zap } from "lucide-react";
import { toast } from "sonner";

const WHEEL_SEGMENTS = [
  { label: "+50 XP", color: "from-primary to-primary/80", icon: "⭐" },
  { label: "+100 XP", color: "from-secondary to-secondary/80", icon: "🔥" },
  { label: "Streak Boost", color: "from-accent to-accent/80", icon: "💪" },
  { label: "+200 XP", color: "from-success to-success/80", icon: "🚀" },
  { label: "Mystery Badge", color: "from-purple-500 to-purple-600", icon: "🎁" },
  { label: "+75 XP", color: "from-pink-500 to-pink-600", icon: "💎" },
  { label: "Double Points", color: "from-indigo-500 to-indigo-600", icon: "🌟" },
  { label: "+150 XP", color: "from-cyan-500 to-cyan-600", icon: "✨" },
];

export default function GiftWheel() {
  const { isAuthenticated } = useAuth();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [spinsRemaining, setSpinsRemaining] = useState(3);
  const wheelRef = useRef<SVGSVGElement>(null);

  const handleSpin = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to spin the wheel");
      return;
    }

    if (spinsRemaining <= 0) {
      toast.error("No spins remaining. Come back tomorrow!");
      return;
    }

    if (isSpinning) return;

    setIsSpinning(true);
    const randomSegment = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const randomRotation = Math.random() * 360;
    const finalRotation = randomSegment * (360 / WHEEL_SEGMENTS.length) + randomRotation + 3600;

    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;
    }

    setTimeout(() => {
      setSelectedSegment(randomSegment);
      setSpinsRemaining(spinsRemaining - 1);
      setIsSpinning(false);

      const reward = WHEEL_SEGMENTS[randomSegment];
      toast.success(`🎉 You won: ${reward.label}!`);
    }, 5000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-primary">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <p className="text-muted-foreground mb-6">
            You need to be logged in to spin the MEGA WHEEL OF GIFTS!
          </p>
          <Button className="w-full btn-primary">Log In</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-secondary p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-10 h-10 text-accent animate-bounce" />
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              MEGA WHEEL OF GIFTS
            </h1>
            <Gift className="w-10 h-10 text-accent animate-bounce" />
          </div>
          <p className="text-xl text-white/80">
            Spin daily to win amazing rewards!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Panel - Info */}
          <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Daily Rewards</h2>
            <div className="space-y-4">
              {WHEEL_SEGMENTS.map((segment, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg transition-all ${
                    selectedSegment === idx
                      ? "bg-accent text-accent-foreground scale-105 shadow-lg"
                      : "bg-white/10 text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{segment.icon}</span>
                    <span className="font-semibold">{segment.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Center - Wheel */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-80 h-80 mb-8">
              {/* Wheel Container */}
              <div className="relative w-full h-full">
                {/* SVG Wheel */}
                <svg
                  ref={wheelRef as any}
                  className="w-full h-full transition-transform duration-[5000ms] ease-out"
                  viewBox="0 0 400 400"
                  style={{ transformOrigin: "center" }}
                >
                  {WHEEL_SEGMENTS.map((segment, idx) => {
                    const angle = (idx * 360) / WHEEL_SEGMENTS.length;
                    const nextAngle = angle + 360 / WHEEL_SEGMENTS.length;
                    const radius = 180;

                    const x1 = 200 + radius * Math.cos((angle * Math.PI) / 180);
                    const y1 = 200 + radius * Math.sin((angle * Math.PI) / 180);
                    const x2 = 200 + radius * Math.cos((nextAngle * Math.PI) / 180);
                    const y2 = 200 + radius * Math.sin((nextAngle * Math.PI) / 180);

                    const largeArc = 360 / WHEEL_SEGMENTS.length > 180 ? 1 : 0;

                    const pathData = `M 200 200 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

                    const colors = [
                      "#FF6B6B",
                      "#4ECDC4",
                      "#FFE66D",
                      "#95E1D3",
                      "#F38181",
                      "#AA96DA",
                      "#FCBAD3",
                      "#A8D8EA",
                    ];

                    return (
                      <path
                        key={idx}
                        d={pathData}
                        fill={colors[idx]}
                        stroke="white"
                        strokeWidth="3"
                      />
                    );
                  })}

                  {/* Center Circle */}
                  <circle cx="200" cy="200" r="40" fill="white" stroke="white" strokeWidth="2" />
                  <circle cx="200" cy="200" r="30" fill="#FFD700" />
                </svg>

                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                  <div className="w-0 h-0 border-l-6 border-r-6 border-t-12 border-l-transparent border-r-transparent border-t-accent"></div>
                </div>
              </div>

              {/* Spin Button */}
              <button
                onClick={handleSpin}
                disabled={isSpinning || spinsRemaining <= 0}
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 px-8 py-4 rounded-full font-bold text-lg transition-all ${
                  isSpinning || spinsRemaining <= 0
                    ? "bg-gray-400 cursor-not-allowed opacity-50"
                    : "bg-accent text-accent-foreground hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
                }`}
              >
                {isSpinning ? "SPINNING..." : "SPIN NOW!"}
              </button>
            </div>

            {/* Spins Remaining */}
            <Card className="p-4 bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <p className="text-white/80 text-sm mb-2">Spins Remaining Today</p>
              <div className="flex justify-center gap-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-full ${
                      idx < spinsRemaining ? "bg-accent" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <p className="text-white font-bold text-2xl mt-2">{spinsRemaining}</p>
            </Card>
          </div>

          {/* Right Panel - Stats */}
          <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Your Stats</h2>
            <div className="space-y-6">
              <div className="text-center">
                <Zap className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-white/80 text-sm">Total Spins</p>
                <p className="text-4xl font-bold text-accent">{9 - spinsRemaining}</p>
              </div>
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-white/80 text-sm">Rewards Won</p>
                <p className="text-4xl font-bold text-primary">
                  {selectedSegment !== null ? 1 : 0}
                </p>
              </div>
              <div className="text-center">
                <Gift className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="text-white/80 text-sm">Next Spin In</p>
                <p className="text-lg font-bold text-secondary">24 hours</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Last Reward */}
        {selectedSegment !== null && (
          <Card className="mt-8 p-6 bg-gradient-to-r from-accent to-secondary text-white text-center">
            <h3 className="text-2xl font-bold mb-2">🎉 Last Reward Won</h3>
            <p className="text-4xl font-bold">{WHEEL_SEGMENTS[selectedSegment].label}</p>
            <p className="text-white/80 mt-2">
              {WHEEL_SEGMENTS[selectedSegment].icon} Congratulations!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
