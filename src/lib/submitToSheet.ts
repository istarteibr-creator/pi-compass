// Replace this URL with your deployed Google Apps Script Web App URL
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyweav_8ff9xig4EpCIReafeyO75MbD57t9xwaiYgXJpiHJWp0HOLsjAgyAjSVNYDjA/exec";

interface ReportData {
  overallScore: number;
  maturityLevel: string;
  sensingScore: number;
  seizingScore: number;
  transformingScore: number;
  recommendations: { priority: string; title: string; description: string; action: string }[];
  profileSummary: { porte: string; setor: string; tempo: string };
}

const answerFieldMap = [
  ["q1", "q1_porte"],
  ["q2", "q2_setor"],
  ["q3", "q3_tempo"],
  ["q4", "q4_conhecimento"],
  ["q5", "q5_junta_vs_inpi"],
  ["q6", "q6_busca_info"],
  ["q7", "q7_marca_inpi"],
  ["q8", "q8_segredo"],
  ["q9", "q9_nda"],
  ["q10", "q10_inovacao"],
  ["q11", "q11_pesquisa_previa"],
  ["q12", "q12_planejamento"],
  ["q13", "q13_valor"],
] as const;

function buildSheetPayload(answers: Record<string, string>, report: ReportData) {
  const recommendationText = report.recommendations
    .map((recommendation) => `[${recommendation.priority}] ${recommendation.title}: ${recommendation.action}`)
    .join(" | ");

  const answerPayload = Object.fromEntries(
    answerFieldMap.map(([sheetKey, answerKey]) => [sheetKey, answers[answerKey] || ""])
  );

  return {
    timestamp: new Date().toISOString(),
    ...answerPayload,
    overallScore: report.overallScore,
    maturityLevel: report.maturityLevel,
    sensingScore: report.sensingScore,
    seizingScore: report.seizingScore,
    transformingScore: report.transformingScore,
    recommendations: recommendationText,
    porteLabel: report.profileSummary.porte,
    setorLabel: report.profileSummary.setor,
    tempoLabel: report.profileSummary.tempo,
  };
}

export async function submitToSheet(
  answers: Record<string, string>,
  report: ReportData
): Promise<boolean> {
  if (!APPS_SCRIPT_URL) {
    console.warn("Google Apps Script URL not configured. Skipping submission.");
    return false;
  }

  try {
    const payload = buildSheetPayload(answers, report);

    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    console.info("Sheet submission dispatched", payload);
    return true;
  } catch (error) {
    console.error("Sheet submission error:", error);
    return false;
  }
}
