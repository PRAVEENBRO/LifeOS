import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { AppError } from '../errors/appError'
import { configEnv } from '../shared'

type JwtPayload = {
  sub: string
  email?: string
  firebaseUid?: string
}

export interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string
    email?: string
    firebaseUid?: string
  }
}

export const requireAuth = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization

  if (!authorization?.startsWith('Bearer ')) {
    return next(new AppError('Missing bearer token', 401))
  }

  const token = authorization.replace('Bearer ', '').trim()

  try {
    const decoded = jwt.verify(token, configEnv.jwt.secret) as JwtPayload

    req.auth = {
      userId: decoded.sub,
      email: decoded.email,
      firebaseUid: decoded.firebaseUid,
    }

    return next()
  } catch {
    return next(new AppError('Invalid token', 401))
  }
}
