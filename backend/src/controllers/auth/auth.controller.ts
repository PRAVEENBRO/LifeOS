import { NextFunction, Request, Response } from 'express'

import * as authService from '../../services/auth/auth.service'
import { AppError } from '../../errors/appError'

export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idToken } = req.body as { idToken?: string }

    if (!idToken) {
      throw new AppError('Google idToken is required', 400)
    }

    const result = await authService.loginWithGoogle(idToken)

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
