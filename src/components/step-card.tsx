import { forwardRef } from "react";

interface StepCardProps {
  stepNumber: number;
  currentStep: number;
  title: string;
  children: React.ReactNode;
}

export const StepCard = forwardRef<HTMLDivElement, StepCardProps>(
  ({ stepNumber, currentStep, title, children }, ref) => {
    const isActive = currentStep === stepNumber;
    const isDone = currentStep > stepNumber;

    return (
      <div
        ref={ref}
        className={`flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300
          ${isActive ? "border-primary/40 bg-card shadow-md" : ""}
          ${isDone ? "border-border bg-muted/20 opacity-60" : ""}
          ${!isActive && !isDone ? "border-border bg-muted/10 opacity-30 pointer-events-none select-none" : ""}
        `}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors
              ${isActive ? "bg-primary text-primary-foreground" : ""}
              ${isDone ? "bg-muted text-muted-foreground" : ""}
              ${!isActive && !isDone ? "bg-muted/50 text-muted-foreground/50" : ""}
            `}
          >
            {isDone ? "✓" : stepNumber}
          </div>
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
        </div>
        {(isActive || isDone) && <>{children}</>}
      </div>
    );
  }
);

StepCard.displayName = "StepCard";
