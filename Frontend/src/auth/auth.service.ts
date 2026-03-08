import { httpRequest } from '@/src/core/api/http-client'

type AuthUser = {
  id: string
  email?: string | null
  name?: string | null
  firebaseUid: string
}

type GoogleAuthApiResponse = {
  success: boolean
  data: {
    accessToken: string
    user: AuthUser
  }
}

export async function loginWithGoogleBackend(idToken: string) {
  const response = await httpRequest<GoogleAuthApiResponse>('/api/v0/auth/google', {
    method: 'POST',
    body: { idToken },
    timeoutMs: 10000,
  })

  return response.data
}
