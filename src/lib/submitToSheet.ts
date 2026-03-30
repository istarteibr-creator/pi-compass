// Replace this URL with your deployed Google Apps Script Web App URL
const APPS_SCRIPT_URL = "";

export async function submitToSheet(
  answers: Record<string, string>,
  overallScore: number,
  maturityLevel: string
): Promise<boolean> {
  if (!APPS_SCRIPT_URL) {
    console.warn("Google Apps Script URL not configured. Skipping submission.");
    return false;
  }

  try {
    const payload = JSON.stringify({
      ...answers,
      overallScore,
      maturityLevel,
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
