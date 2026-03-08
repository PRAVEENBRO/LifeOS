import { Router } from 'express'

import { loginWithGoogle } from '../../controllers/auth/auth.controller'

const authRouter = Router()

authRouter.post('/google', loginWithGoogle)

export default authRouter
