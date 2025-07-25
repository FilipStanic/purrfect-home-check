import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChecklistItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
}

export function ChecklistItem({ id, text, completed, onToggle }: ChecklistItemProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (!completed) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    onToggle(id);
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300",
        completed 
          ? "bg-success/10 border-success/30 shadow-gentle" 
          : "bg-card border-border hover:border-primary/30 hover:shadow-warm"
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        className={cn(
          "h-8 w-8 rounded-full p-0 transition-bouncy border-2",
          completed
            ? "bg-success border-success text-success-foreground hover:bg-success/90"
            : "border-border hover:border-primary hover:bg-primary/10",
          isAnimating && "animate-bounce-gentle"
        )}
      >
        {completed && <Check className="h-4 w-4" />}
      </Button>
      
      <span 
        className={cn(
          "flex-1 text-left transition-smooth",
          completed 
            ? "text-success line-through opacity-75" 
            : "text-foreground",
          isAnimating && "animate-purr-vibrate"
        )}
      >
        {text}
      </span>
    </div>
  );
}