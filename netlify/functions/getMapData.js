// netlify/functions/map.ts
exports.handler = async (event, context) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("API key is not available in environment");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key is not available" }),
    };
  }

  const mapConfig = {
    center: { lat: 41.1814, lng: 29.0385 }, // Harita merkezini belirleyin
    zoom: 14, // Zoom seviyesi
    mapId: process.env.GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID", // Map ID eklenebilir
  };

  const mapScript = `
    <script type="module" async src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&v=beta"></script>
  `;

  console.log("Returning map config and script");
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mapConfig: mapConfig,
      mapScript: mapScript,
    }),
  };
};
