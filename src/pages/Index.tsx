import { useState, useEffect } from "react";
import { Plus, Settings, Home, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChecklistItem } from "@/components/ChecklistItem";
import { StatsCard } from "@/components/StatsCard";
import { CelebrationModal } from "@/components/CelebrationModal";
import { useToast } from "@/hooks/use-toast";
import heroCat from "@/assets/hero-cat.jpg";

interface ChecklistItemType {
  id: string;
  text: string;
  completed: boolean;
}

const defaultChecklist: ChecklistItemType[] = [
  { id: "1", text: "Did I close all windows?", completed: false },
  { id: "2", text: "Did I lock the front door?", completed: false },
  { id: "3", text: "Did I turn off the stove?", completed: false },
  { id: "4", text: "Did I check the pet food/water?", completed: false },
  { id: "5", text: "Did I secure the kitchen door?", completed: false },
  { id: "6", text: "Did I put away any harmful items?", completed: false }
];

const Index = () => {
  const [checklist, setChecklist] = useState<ChecklistItemType[]>(defaultChecklist);
  const [showCelebration, setShowCelebration] = useState(false);
  const [dailyStreak, setDailyStreak] = useState(7);
  const { toast } = useToast();

  const completedCount = checklist.filter(item => item.completed).length;
  const totalCount = checklist.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggleItem = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleResetChecklist = () => {
    setChecklist(prev => prev.map(item => ({ ...item, completed: false })));
    toast({
      title: "Checklist reset! 🔄",
      description: "Ready for your next safety check.",
    });
  };

  const handleCompleteAll = () => {
    setChecklist(prev => prev.map(item => ({ ...item, completed: true })));
    setShowCelebration(true);
  };

  // Show celebration when all items are completed
  useEffect(() => {
    if (completedCount === totalCount && totalCount > 0 && completedCount > 0) {
      const timer = setTimeout(() => setShowCelebration(true), 500);
      return () => clearTimeout(timer);
    }
  }, [completedCount, totalCount]);

  return (
    <div className="min-h-screen bg-gradient-cozy">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Home className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Pet-Safe Home</h1>
                <p className="text-xs text-muted-foreground">Safety first! 🐾</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-md mx-auto px-4 pb-8">
        {/* Hero Section */}
        <div className="relative mb-8 mt-6">
          <div className="text-center">
            <img 
              src={heroCat} 
              alt="Peaceful cat illustration" 
              className="w-32 h-18 mx-auto mb-4 rounded-2xl shadow-gentle animate-float"
            />
            <h2 className="text-2xl font-bold mb-2">Ready to leave home?</h2>
            <p className="text-muted-foreground">Let's make sure everything is safe for your furry friends!</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatsCard 
            title="Completed"
            value={`${completedCount}/${totalCount}`}
            animated={completedCount > 0}
          />
          <StatsCard 
            title="Progress"
            value={`${completionPercentage}%`}
            animated={completionPercentage > 0}
          />
          <StatsCard 
            title="Daily Streak"
            value={dailyStreak}
            subtitle="days"
            animated
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Safety Progress</span>
            <span>{completedCount}/{totalCount}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full gradient-cat transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Safety Checklist</h3>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {checklist.map((item) => (
            <ChecklistItem
              key={item.id}
              id={item.id}
              text={item.text}
              completed={item.completed}
              onToggle={handleToggleItem}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={handleResetChecklist}
            variant="outline"
            size="lg"
            className="rounded-full font-semibold transition-bouncy"
          >
            Reset List
          </Button>
          <Button 
            onClick={handleCompleteAll}
            size="lg"
            className="rounded-full font-semibold gradient-cat border-0 transition-bouncy hover:opacity-90"
          >
            Check All ✨
          </Button>
        </div>

        {/* Bottom Navigation Placeholder */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border/50 p-4">
          <div className="container max-w-md mx-auto">
            <div className="flex justify-center items-center gap-8">
              <Button variant="ghost" size="sm" className="flex flex-col gap-1 rounded-full">
                <Home className="w-5 h-5" />
                <span className="text-xs">Home</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col gap-1 rounded-full opacity-50">
                <Calendar className="w-5 h-5" />
                <span className="text-xs">Journal</span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        completedCount={completedCount}
        totalCount={totalCount}
      />
    </div>
  );
};

export default Index;
