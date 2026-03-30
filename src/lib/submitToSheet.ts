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
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        ...answers,
        overallScore,
        maturityLevel,
      }),
    });

    if (!response.ok) {
      console.error("Sheet submission failed:", response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Sheet submission error:", error);
    return false;
  }
}
