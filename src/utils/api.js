export const API_URL = (
  import.meta.env.VITE_API_URL !== undefined && import.meta.env.VITE_API_URL !== ''
    ? String(import.meta.env.VITE_API_URL)
    : import.meta.env.PROD
      ? String(import.meta.env.BASE_URL || '/')
      : 'http://127.0.0.1:8000'
).replace(/\/$/, '')

export function apiHeaders(token) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function apiRequest(path, { method = 'GET', token, body } = {}) {
  let response

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: apiHeaders(token),
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    const error = new Error(
      'Cannot reach the server. Keep MAMP MySQL and php artisan serve running, then try again.',
    )
    error.status = 0
    throw error
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const firstError = data.errors ? Object.values(data.errors).flat()[0] : null
    const error = new Error(
      firstError || data.message || (response.status === 429
        ? 'Too many attempts. Wait a minute and try again.'
        : 'Something went wrong.'),
    )
    error.status = response.status
    throw error
  }

  return data
}
