import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

type AuthStep = "email" | "verification" | "success";

export default function GmailAuth() {
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const sendCodeMutation = trpc.auth.sendVerificationCode.useMutation();
  const verifyCodeMutation = trpc.auth.verifyCode.useMutation();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your Gmail address");
      return;
    }

    if (!email.includes("@gmail.com")) {
      toast.error("Please use a valid Gmail address");
      return;
    }

    setIsLoading(true);
    try {
      await sendCodeMutation.mutateAsync({ email });
      toast.success("Verification code sent to your Gmail!");
      setStep("verification");
    } catch (error) {
      toast.error("Failed to send verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificationCode || verificationCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      const result = await verifyCodeMutation.mutateAsync({
        email,
        code: verificationCode,
      });

      if (result.success) {
        toast.success("Welcome to A1 English Quiz!");
        setStep("success");
        setTimeout(() => {
          setLocation("/");
        }, 2000);
      }
    } catch (error) {
      toast.error("Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="w-10 h-10 text-accent" />
            <h1 className="text-3xl font-bold text-white">A1 English Quiz</h1>
          </div>
          <p className="text-white/80">Sign in with your Gmail</p>
        </div>

        {/* Email Step */}
        {step === "email" && (
          <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Enter Your Gmail</h2>
            <form onSubmit={handleSendCode} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Gmail Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
                <p className="text-white/60 text-sm mt-2">
                  We'll send a verification code to this address
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full btn-accent btn-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Code
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
              <p className="text-white text-sm">
                ✓ No password needed<br />
                ✓ Secure verification code<br />
                ✓ Quick and easy access
              </p>
            </div>
          </Card>
        )}

        {/* Verification Step */}
        {step === "verification" && (
          <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
            <p className="text-white/80 mb-6">
              Enter the 6-digit code sent to<br />
              <span className="font-semibold text-accent">{email}</span>
            </p>

            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) =>
                    setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-4 rounded-xl bg-white/20 border border-white/30 text-white text-center text-2xl font-bold placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all tracking-widest"
                />
                <p className="text-white/60 text-sm mt-2">
                  Check your Gmail inbox for the code
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading || verificationCode.length !== 6}
                className="w-full btn-accent btn-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify Code
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setVerificationCode("");
                }}
                className="w-full text-white/60 hover:text-white transition-colors text-sm font-semibold"
              >
                ← Back to Email
              </button>
            </form>

            {/* Code Info */}
            <div className="mt-6 p-4 bg-secondary/20 rounded-lg border border-secondary/50">
              <p className="text-white text-sm">
                💡 Code expires in 10 minutes<br />
                💡 Check spam folder if not found<br />
                💡 Can request new code anytime
              </p>
            </div>
          </Card>
        )}

        {/* Success Step */}
        {step === "success" && (
          <Card className="p-8 bg-gradient-to-br from-success to-success/80 text-white text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold mb-2">Welcome!</h2>
            <p className="text-white/90 mb-6">
              Your account is ready. Redirecting to the platform...
            </p>
            <div className="flex justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white animate-bounce" />
              <div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-white/60 text-sm">
          <p>A1 English Learning Platform</p>
          <p>Secure Gmail Authentication</p>
        </div>
      </div>
    </div>
  );
}
