import { getApiBaseUrl } from '@/src/core/config/network'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type RequestOptions = {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: unknown
  timeoutMs?: number
}

export class ApiError extends Error {
  status?: number
  payload?: unknown
  path?: string

  constructor(message: string, params?: { status?: number; payload?: unknown; path?: string }) {
    super(message)
    this.name = 'ApiError'
    this.status = params?.status
    this.payload = params?.payload
    this.path = params?.path
  }
}

async function readResponsePayload(response: Response) {
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

export async function httpRequest<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const baseUrl = getApiBaseUrl()
  const url = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
  console.log('url-->', url);
  const controller = new AbortController()
  const timeoutMs = options.timeoutMs ?? 10000
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      method: options.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    })

    const payload = await readResponsePayload(response)

    if (!response.ok) {
      throw new ApiError(`Request failed with status ${response.status}`, {
        status: response.status,
        payload,
        path,
      })
    }

    return payload as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(`Request timed out after ${timeoutMs}ms`, { path })
    }

    throw new ApiError(
      `Unable to reach API at ${baseUrl}. Check EXPO_PUBLIC_API_URL and ensure backend is reachable from device.`,
      { path }
    )
  } finally {
    clearTimeout(timeoutId)
  }
}

