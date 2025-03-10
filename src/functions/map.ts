export async function handler(event, context) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key is not available" }),
    };
  }

  const mapConfig = {
    center: { lat: 41.1814, lng: 29.0385 },
    zoom: 14,
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mapConfig: mapConfig,
      apiKey: apiKey,
    }),
  };
}
