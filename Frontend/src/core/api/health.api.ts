import { httpRequest } from '@/src/core/api/http-client'

type HealthResponse = {
  status: string
  service: string
  timestamp: string
}

export function checkBackendHealth() {
  return httpRequest<HealthResponse>('/health', { method: 'GET', timeoutMs: 5000 })
}

