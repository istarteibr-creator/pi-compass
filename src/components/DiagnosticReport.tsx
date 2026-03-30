import { DiagnosticResult } from "@/lib/reportGenerator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Building2,
  Briefcase,
  Clock,
  Eye,
  Zap,
  RefreshCw,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  result: DiagnosticResult;
  onRestart: () => void;
}

const maturityColors: Record<string, string> = {
  Inicial: "text-survey-danger",
  Básico: "text-survey-warning",
  Intermediário: "text-primary",
  Avançado: "text-survey-success",
};

const maturityBg: Record<string, string> = {
  Inicial: "bg-survey-danger/10 border-survey-danger/30",
  Básico: "bg-survey-warning/10 border-survey-warning/30",
  Intermediário: "bg-primary/10 border-primary/30",
  Avançado: "bg-survey-success/10 border-survey-success/30",
};

const priorityConfig = {
  alta: { label: "Alta", icon: AlertTriangle, className: "bg-survey-danger/10 text-survey-danger border-survey-danger/30" },
  media: { label: "Média", icon: ArrowRight, className: "bg-survey-warning/10 text-survey-warning border-survey-warning/30" },
  baixa: { label: "Baixa", icon: CheckCircle2, className: "bg-survey-success/10 text-survey-success border-survey-success/30" },
};

const DiagnosticReport = ({ result, onRestart }: Props) => {
  const handlePrint = () => window.print();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Relatório de Diagnóstico
        </h1>
        <p className="text-muted-foreground">Maturidade em Propriedade Intelectual</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground text-xs">Porte</p>
                <p className="font-medium text-foreground">{result.profileSummary.porte}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground text-xs">Setor</p>
                <p className="font-medium text-foreground">{result.profileSummary.setor}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground text-xs">Tempo</p>
                <p className="font-medium text-foreground">{result.profileSummary.tempo}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Score */}
      <Card className={cn("border-2", maturityBg[result.maturityLevel])}>
        <CardContent className="pt-6 text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Nível de Maturidade em PI</p>
            <p className={cn("text-4xl font-bold", maturityColors[result.maturityLevel])}>
              {result.maturityLevel}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Pontuação Geral</span>
              <span className="font-semibold text-foreground">{result.overallScore}%</span>
            </div>
            <Progress value={result.overallScore} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Capacidades Dinâmicas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Capacidades Dinâmicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {[
            { label: "Sensing (Percepção)", score: result.sensingScore, icon: Eye, desc: "Capacidade de identificar oportunidades e monitorar o ambiente" },
            { label: "Seizing (Apropriação)", score: result.seizingScore, icon: Zap, desc: "Capacidade de capturar e proteger os ativos identificados" },
            { label: "Transforming (Gestão)", score: result.transformingScore, icon: RefreshCw, desc: "Capacidade de integrar a PI na gestão estratégica" },
          ].map((cap) => (
            <div key={cap.label} className="space-y-2">
              <div className="flex items-center gap-2">
                <cap.icon className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground text-sm">{cap.label}</span>
                <span className="ml-auto font-semibold text-foreground text-sm">{cap.score}%</span>
              </div>
              <Progress value={cap.score} className="h-2" />
              <p className="text-xs text-muted-foreground">{cap.desc}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Recomendações ({result.recommendations.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.recommendations.map((rec, i) => {
              const config = priorityConfig[rec.priority];
              const Icon = config.icon;
              return (
                <div key={i} className={cn("border rounded-xl p-4 space-y-2", config.className)}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Prioridade {config.label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{rec.title}</h3>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                  <p className="text-sm font-medium text-foreground">
                    📋 {rec.action}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3 justify-center pb-8">
        <Button variant="outline" onClick={onRestart}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Novo Diagnóstico
        </Button>
        <Button onClick={handlePrint}>
          <Download className="w-4 h-4 mr-2" />
          Salvar Relatório
        </Button>
      </div>
    </div>
  );
};

export default DiagnosticReport;
