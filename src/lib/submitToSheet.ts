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

export async function submitToSheet(
  answers: Record<string, string>,
  report: ReportData
): Promise<boolean> {
  if (!APPS_SCRIPT_URL) {
    console.warn("Google Apps Script URL not configured. Skipping submission.");
    return false;
  }

  try {
    const recsText = report.recommendations
      .map((r) => `[${r.priority}] ${r.title}: ${r.action}`)
      .join(" | ");

    const payload = JSON.stringify({
      sensingScore: report.sensingScore,
      seizingScore: report.seizingScore,
      transformingScore: report.transformingScore,
      recommendations: recsText,
    });

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: payload,
    });

    // With no-cors, response is opaque — we assume success if no error thrown
    return true;
  } catch (error) {
    console.error("Sheet submission error:", error);
    return false;
  }
}
