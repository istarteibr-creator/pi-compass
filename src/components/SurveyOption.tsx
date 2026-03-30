import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface SurveyOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const SurveyOption = ({ label, selected, onClick }: SurveyOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200",
        "flex items-center gap-3 group",
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary/40 hover:bg-survey-card-hover"
      )}
    >
      <span
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
          selected
            ? "border-primary bg-primary"
            : "border-muted-foreground/30 group-hover:border-primary/50"
        )}
      >
        {selected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
      </span>
      <span className={cn("text-sm font-medium", selected ? "text-foreground" : "text-muted-foreground")}>
        {label}
      </span>
    </button>
  );
};

export default SurveyOption;
