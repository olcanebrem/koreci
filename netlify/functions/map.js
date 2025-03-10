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
    center: { lat: 41.1814, lng: 29.0385 },
    zoom: 14,
  };

  const mapScript = `
    <script type="module" async src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=beta"></script>
  `;

  console.log("Returning map config and script:", { mapConfig, mapScript });
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