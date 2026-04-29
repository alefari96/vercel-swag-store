const BASE_URL = process.env.SWAG_API_URL!
const TOKEN = process.env.SWAG_API_TOKEN!

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'x-vercel-protection-bypass': TOKEN,
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })
  if (!res.ok) throw new Error(`API error ${res.status} on ${path}`)
  return res.json()
}