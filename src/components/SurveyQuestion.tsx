import { SurveyQuestion as SurveyQuestionType } from "@/lib/surveyData";
import SurveyOption from "./SurveyOption";
import { Info } from "lucide-react";

interface Props {
  question: SurveyQuestionType;
  selectedValue: string | undefined;
  onSelect: (questionId: string, value: string) => void;
}

const SurveyQuestion = ({ question, selectedValue, onSelect }: Props) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h2 className="text-xl font-semibold text-foreground leading-tight">
          {question.question}
        </h2>
        {question.helpText && (
          <div className="flex items-start gap-2 mt-2 p-3 rounded-lg bg-accent/20 border border-accent/30">
            <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">{question.helpText}</p>
          </div>
        )}
      </div>
      <div className="space-y-3">
        {question.options.map((option) => (
          <SurveyOption
            key={option.value}
            label={option.label}
            selected={selectedValue === option.value}
            onClick={() => onSelect(question.id, option.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default SurveyQuestion;
