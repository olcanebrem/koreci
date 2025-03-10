exports.handler = async () => {
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
    mapId: process.env.GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID",
  };

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mapConfig,
      mapScript: `<script async src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap"></script>`,
    }),
  };
};
