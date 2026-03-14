import { Button } from "@/components/ui/button";

interface StepNavProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
}

export function StepNav({ onBack, onNext, nextLabel = "Continuar" }: StepNavProps) {
  return (
    <div className="flex gap-3 pt-2">
      {onBack && (
        <Button variant="outline" className="flex-1 cursor-target cursor-none" onClick={onBack}>
          Voltar
        </Button>
      )}
      {onNext && (
        <Button className="flex-1 cursor-target cursor-none" onClick={onNext}>
          {nextLabel}
        </Button>
      )}
    </div>
  );
}
