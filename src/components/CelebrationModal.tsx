import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedCount: number;
  totalCount: number;
}

export function CelebrationModal({ isOpen, onClose, completedCount, totalCount }: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const isAllComplete = completedCount === totalCount && totalCount > 0;

  useEffect(() => {
    if (isOpen && isAllComplete) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isAllComplete]);

  const getCelebrationMessage = () => {
    if (isAllComplete) {
      return {
        title: "Purr-fect! 🐾",
        message: "You've completed all your safety checks! Your furry friends are safe and sound.",
        emoji: "😻"
      };
    } else {
      return {
        title: "Great job! 🎉",
        message: `You've completed ${completedCount} out of ${totalCount} checks. Keep going!`,
        emoji: "😸"
      };
    }
  };

  const celebration = getCelebrationMessage();

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="w-[90%] max-w-md mx-auto rounded-3xl border-0 bg-gradient-sunset text-center p-8">
        <div className="relative">
          {showConfetti && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="text-4xl animate-bounce-gentle">🎉</div>
            </div>
          )}
          
          <div className="space-y-6">
            <div className="text-6xl animate-wiggle">{celebration.emoji}</div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-primary-foreground">
                {celebration.title}
              </h2>
              <p className="text-primary-foreground/90">
                {celebration.message}
              </p>
            </div>
            
            {isAllComplete && (
              <div className="text-sm text-primary-foreground/80 bg-white/20 rounded-full px-4 py-2 inline-block">
                Safe travels! 🏠✨
              </div>
            )}
            
            <Button 
              onClick={onClose}
              variant="secondary"
              size="lg"
              className="w-full rounded-full font-semibold shadow-gentle hover:shadow-warm transition-bouncy"
            >
              Thanks! 💜
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}