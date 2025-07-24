export const USER_AGENT_HEADER = {
  headers: {
    "User-Agent": "dhi-geomap/1.0 (your@email.com)",
  },
};

export async function geocodeLocation(query: string) {
  try {
    const url = `https://corsproxy.io/?https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json`;

    const response = await fetch(url, USER_AGENT_HEADER);
    if (!response.ok) throw new Error("Search failed, please try again");

    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    throw error;
  }
}

export async function reverseGeocode(lat: number, lon: number) {
  try {
    const url = `https://corsproxy.io/?https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    const response = await fetch(url, USER_AGENT_HEADER);
    if (!response.ok) throw new Error("Reverse geocoding failed");

    const data = await response.json();
    return data || null;
  } catch (error) {
    throw error;
  }
}
