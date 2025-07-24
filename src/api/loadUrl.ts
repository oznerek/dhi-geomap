import { USER_AGENT_HEADER } from "./openStreetMap";

export async function loadUrl(url: string) {
  try {
    const response = await fetch(url, USER_AGENT_HEADER);
    if (!response.ok) throw new Error("Something went wrong please try again");

    const data = await response.json();
    return data || null;
  } catch (error) {
    throw error;
  }
}
