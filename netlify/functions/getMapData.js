exports.handler = async (event, context) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key is not defined" }),
    };
  }

  const config = {
    locations: [
      {
        title: "Sarıyer",
        address1: "Sarıyer/İstanbul",
        address2: "Türkiye",
        coords: { lat: 41.17817959025185, lng: 29.041851081506355 },
        placeId: "ChIJ11KoMiLgn0ARxE4ae9DKhjo",
      },
    ],
    mapOptions: {
      center: { lat: 41.17817959025185, lng: 29.041851081506355 },
      fullscreenControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      zoom: 12,
      zoomControl: true,
      maxZoom: 17,
      mapId: "",
    },
    mapsApiKey: apiKey, // API anahtarını config’e ekle
    capabilities: {
      input: false,
      autocomplete: false,
      directions: false,
      distanceMatrix: false,
      details: false,
      actions: false,
    },
  };

  return {
    statusCode: 200,
    body: JSON.stringify(config),
  };
};