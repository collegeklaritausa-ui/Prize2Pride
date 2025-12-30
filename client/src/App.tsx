import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import AugmentedHome from "@/pages/AugmentedHome";
import VoiceCourse from "@/pages/VoiceCourse";
import Quiz from "@/pages/Quiz";
import Progress from "@/pages/Progress";
import Leaderboard from "@/pages/Leaderboard";
import SmartLeaderboard from "@/pages/SmartLeaderboard";
import GiftWheel from "@/pages/GiftWheel";
import GmailAuth from "@/pages/GmailAuth";
import DifficultySelect from "@/pages/DifficultySelect";
import PracticeMode from "@/pages/PracticeMode";
import VocabularyBuilder from "@/pages/VocabularyBuilder";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return (
    <Switch>
      {/* Augmented Platform Routes */}
      <Route path={"/"} component={AugmentedHome} />
      <Route path={"/voice-course"} component={VoiceCourse} />
      
      {/* Original Platform Routes */}
      <Route path={"/classic"} component={Home} />
      <Route path={"/auth"} component={GmailAuth} />
      <Route path={"/difficulty"} component={DifficultySelect} />
      <Route path={"/quiz"} component={Quiz} />
      <Route path={"/practice"} component={PracticeMode} />
      <Route path={"/vocabulary"} component={VocabularyBuilder} />
      <Route path={"/progress"} component={Progress} />
      <Route path={"/leaderboard"} component={Leaderboard} />
      <Route path={"/smart-leaderboard"} component={SmartLeaderboard} />
      <Route path={"/gift-wheel"} component={GiftWheel} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
