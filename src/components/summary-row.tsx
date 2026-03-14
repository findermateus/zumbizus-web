interface SummaryRowProps {
  label: string;
  value?: string;
  swatch?: string;
}

export function SummaryRow({ label, value, swatch }: SummaryRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        {swatch && <div className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: swatch }} />}
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    </div>
  );
}
