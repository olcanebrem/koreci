export async function handler(event, context) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const { query } = event.queryStringParameters;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Query parametresi eksik" }),
    };
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Google Maps API isteği başarısız oldu." }),
    };
  }
}
