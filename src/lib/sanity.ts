const PROJECT_ID = import.meta.env.SANITY_PROJECT_ID // Örnek: abc123
const DATASET = 'production'
const API_VERSION = import.meta.env.SANITY_API_VERSION;// ya da latest

export async function fetchSanity(query: string, params: Record<string, any> = {}) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(
    query
  )}`

  const res = await fetch(url)

  if (!res.ok) {
    console.error(`Sanity API Error: ${res.status} ${res.statusText}`)
    throw new Error('Sanity API çağrısı başarısız oldu.')
  }
  
  const result = await res.json()

  return result.result

  
}
