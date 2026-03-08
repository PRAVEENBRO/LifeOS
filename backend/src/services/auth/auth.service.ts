import { createRemoteJWKSet, jwtVerify } from 'jose'
import jwt from 'jsonwebtoken'

import { AppError } from '../../errors/appError'
import { configEnv } from '../../shared'
import * as userModel from '../../models/user/user.model'

type FirebaseGoogleTokenPayload = {
  user_id: string
  email?: string
  name?: string
}

const firebaseJwks = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
)

async function verifyFirebaseIdToken(idToken: string): Promise<FirebaseGoogleTokenPayload> {
  const projectId = configEnv.firebase.projectId

  if (!projectId) {
    throw new AppError('Missing FIREBASE_PROJECT_ID in backend environment', 500)
  }

  try {
    const { payload } = await jwtVerify(idToken, firebaseJwks, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    })

    if (!payload.user_id || typeof payload.user_id !== 'string') {
      throw new AppError('Invalid Firebase token payload', 401)
    }

    return {
      user_id: payload.user_id,
      email: typeof payload.email === 'string' ? payload.email : undefined,
      name: typeof payload.name === 'string' ? payload.name : undefined,
    }
  } catch {
    throw new AppError('Invalid or expired Firebase token', 401)
  }
}

export const loginWithGoogle = async (idToken: string) => {
  const decoded = await verifyFirebaseIdToken(idToken)

  const existingUser = await userModel.findUserByFirebaseUid(decoded.user_id)

  const user = existingUser
    ? await userModel.updateUser(existingUser.id, {
        email: decoded.email,
        name: decoded.name,
      })
    : await userModel.createUser({
        firebaseUid: decoded.user_id,
        email: decoded.email ?? '',
        name: decoded.name ?? 'Google User',
      })

  const accessToken = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      firebaseUid: user.firebaseUid,
    },
    configEnv.jwt.secret,
    { expiresIn: configEnv.jwt.expiresIn }
  )

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      firebaseUid: user.firebaseUid,
    },
  }
}
