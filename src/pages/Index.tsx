import { useState, useMemo, useCallback } from "react";
import { surveyQuestions } from "@/lib/surveyData";
import { generateReport } from "@/lib/reportGenerator";
import SurveyQuestion from "@/components/SurveyQuestion";
import DiagnosticReport from "@/components/DiagnosticReport";
import ConsentModal from "@/components/ConsentModal";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Brain,
  Shield,
  Target,
  FileText,
} from "lucide-react";

const blockIcons: Record<number, React.ReactNode> = {
  1: <Building2 className="w-5 h-5" />,
  2: <Brain className="w-5 h-5" />,
  3: <Shield className="w-5 h-5" />,
  4: <Target className="w-5 h-5" />,
};

const Index = () => {
  const [consented, setConsented] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReport, setShowReport] = useState(false);

  // Filter visible questions based on conditional logic
  const visibleQuestions = useMemo(() => {
    return surveyQuestions.filter((q) => {
      if (!q.conditionalOn) return true;
      return q.conditionalOn.values.includes(answers[q.conditionalOn.questionId] || "");
    });
  }, [answers]);

  const currentQuestion = visibleQuestions[currentIndex];
  const totalQuestions = visibleQuestions.length;
  const progressPercent = totalQuestions > 0 ? ((currentIndex) / totalQuestions) * 100 : 0;
  const currentBlock = currentQuestion?.block || 1;

  const handleSelect = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowReport(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowReport(false);
  };

  const report = useMemo(() => {
    if (!showReport) return null;
    return generateReport(answers);
  }, [showReport, answers]);

  if (report && showReport) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <DiagnosticReport result={report} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ConsentModal open={!consented} onAccept={() => setConsented(true)} />

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">
                Diagnóstico de Maturidade em PI
              </h1>
              <p className="text-xs text-muted-foreground">
                PROFNIT · ACES · Santarém-PA
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <div className="flex items-center gap-2">
              {blockIcons[currentBlock]}
              <span className="font-medium text-foreground">
                Bloco {currentBlock}: {currentQuestion?.blockTitle}
              </span>
            </div>
            <span>{currentIndex + 1} de {totalQuestions}</span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>
      </div>

      {/* Question Area */}
      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {currentQuestion && (
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6 pb-6 space-y-6">
                <p className="text-xs text-muted-foreground">
                  {currentQuestion.blockDescription}
                </p>

                <SurveyQuestion
                  key={currentQuestion.id}
                  question={currentQuestion}
                  selectedValue={answers[currentQuestion.id]}
                  onSelect={handleSelect}
                />

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentIndex === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                  >
                    {currentIndex === totalQuestions - 1 ? "Ver Relatório" : "Próxima"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-3 text-center">
        <p className="text-xs text-muted-foreground">
          Ferramenta Digital de Diagnóstico — MVP · Mestrado PROFNIT
        </p>
      </footer>
    </div>
  );
};

export default Index;
