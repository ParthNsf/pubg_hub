import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeModal = ({ isOpen, onClose, username }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const welcomeSteps = [
    {
      title: "Welcome to PUBG Tournament Hub!",
      description: `Hey ${username}! Ready to dominate the battlegrounds? Let's get you started with the ultimate esports experience.`,
      icon: "Trophy",
      color: "text-primary"
    },
    {
      title: "Join Epic Tournaments",
      description: "Compete in daily, weekly, and seasonal tournaments with massive prize pools. From casual matches to pro-level competitions.",
      icon: "Swords",
      color: "text-secondary"
    },
    {
      title: "Track Your Progress",
      description: "Monitor your K/D ratio, win rate, and climb the leaderboards. See how you stack up against the best players.",
      icon: "TrendingUp",
      color: "text-accent"
    },
    {
      title: "Connect with Streamers",
      description: "Watch live streams, learn from pros, and discover new strategies to improve your gameplay.",
      icon: "Video",
      color: "text-warning"
    }
  ];

  const handleNext = () => {
    if (currentStep < welcomeSteps?.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  const currentStepData = welcomeSteps?.[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-card border border-border rounded-xl shadow-gaming-purple overflow-hidden">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-gaming"
          >
            <Icon name="X" size={20} />
          </button>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4`}>
              <Icon name={currentStepData?.icon} size={32} className={currentStepData?.color} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {currentStepData?.title}
            </h2>
            <p className="text-muted-foreground">
              {currentStepData?.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mb-6">
            {welcomeSteps?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-primary w-8'
                    : index < currentStep
                    ? 'bg-primary/60' :'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-muted-foreground"
            >
              Skip Tour
            </Button>

            <div className="flex space-x-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
              
              <Button
                variant="default"
                onClick={handleNext}
                iconName={currentStep === welcomeSteps?.length - 1 ? "CheckCircle" : "ArrowRight"}
                iconPosition="right"
              >
                {currentStep === welcomeSteps?.length - 1 ? "Get Started" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;